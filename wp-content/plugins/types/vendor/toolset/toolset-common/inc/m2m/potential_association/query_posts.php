<?php

/**
 * When you have a relationship and a specific element in one role, this
 * query class will help you to find elements that can be associated with it.
 *
 * It takes into account all the aspects, like whether the relationship is distinct or not.
 *
 * This class works for querying posts (disregarding the domain of the element to connect to).
 *
 * Note that relationship cardinality limitation is not checked in get_results(). It is assumed that
 * they've been checked before even querying for posts to associate.
 *
 * @since m2m
 */
class Toolset_Potential_Association_Query_Posts implements IToolset_Potential_Association_Query {

	/** @var IToolset_Relationship_Definition */
	private $relationship;

	/** @var IToolset_Relationship_Role */
	private $target_role;

	/** @var IToolset_Element */
	private $for_element;

	/** @var array */
	private $args;

	/** @var int|null */
	private $found_results;

	/** @var Toolset_Relationship_Query_Factory */
	private $query_factory;


	/**
	 * Toolset_Potential_Association_Query constructor.
	 *
	 * @param IToolset_Relationship_Definition $relationship Relationship to query for.
	 * @param IToolset_Relationship_Role_Parent_Child $target_role Element role. Only parent or child are accepted.
	 * @param IToolset_Element $for_element Element that may be corrected with the result of the query.
	 * @param array $args Additional query arguments:
	 *     - search_string: string
	 *     - count_results: bool
	 *     - items_per_page: int
	 *     - page: int
	 *     - wp_query_override: array
	 * @param Toolset_Relationship_Query_Factory|null $query_factory_di
	 */
	public function __construct(
		IToolset_Relationship_Definition $relationship,
		IToolset_Relationship_Role_Parent_Child $target_role,
		IToolset_Element $for_element,
		$args,
		Toolset_Relationship_Query_Factory $query_factory_di = null
	) {
		$this->relationship = $relationship;
		$this->for_element = $for_element;
		$this->target_role = $target_role;
		$this->args = $args;

		if( ! $relationship->get_element_type( $target_role->other()->get_name() )->is_match( $for_element ) ) {
			throw new InvalidArgumentException( 'The element to connect with doesn\'t belong to the relationship definition provided.' );
		}

		$this->query_factory = ( null === $query_factory_di ? new Toolset_Relationship_Query_Factory() : $query_factory_di );
	}


	/**
	 * @return IToolset_Post[]
	 */
	public function get_results() {

		$query_args = array(

			// Performance ptimizations
			//
			//
			'ignore_sticky_posts' => true,
			'cache_results' => false,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
			'no_found_rows' => ! $this->needs_found_rows(),

			// Relevant query args
			//
			//
			'post_type' => $this->get_target_post_types(),
			'post_status' => 'publish',
			// just to make sure in case we mess with post_status in the future
			'perm' => 'readable',
			// the common use case is to get post titles and IDs
			'fields' => 'all',

			'posts_per_page' => $this->get_items_per_page(),
			'paged' => $this->get_page()
		);

		$search_string = $this->get_search_string();
		if( ! empty( $search_string ) ) {
			$query_args['s'] = $search_string;
		}

		$query_args = array_merge( $query_args, $this->get_additional_wp_query_args() );

		// For distinct relationships, we need to make sure that the returned posts
		// aren't already associated with $for_element.
		$augment_query_for_distinct_relationships = $this->query_factory->distinct_relationship_posts(
			$this->relationship,
			$this->target_role,
			$this->for_element->get_id()
		);

		$augment_query_for_distinct_relationships->before_query();

		$query = $this->query_factory->wp_query( $query_args );
		$results = $query->get_posts();

		$augment_query_for_distinct_relationships->after_query();

		$this->found_results = (int) $query->found_posts;

		return $this->transform_results( $results );
	}


	private function get_additional_wp_query_args() {
		return toolset_ensarr( toolset_getarr( $this->args, 'wp_query_override' ) );
	}


	private function get_target_post_types() {
		return $this->relationship->get_element_type( $this->target_role )->get_types();
	}

	private function needs_found_rows() {
		return (bool) toolset_getarr( $this->args, 'count_results', false );
	}


	private function get_search_string() {
		return toolset_getarr( $this->args, 'search_string' );
	}


	private function get_page() {
		return (int) toolset_getarr( $this->args, 'page' );
	}


	private function get_items_per_page() {
		$limit = (int) toolset_getarr( $this->args, 'items_per_page' );
		if( $limit < 1 ) {
			$limit = 10;
		}

		return $limit;
	}


	/**
	 * @param WP_Post[] $wp_posts
	 *
	 * @return IToolset_Post[]
	 */
	private function transform_results( $wp_posts ) {
		$results = array();
		foreach( $wp_posts as $wp_post ) {
			$results[] = Toolset_Element::get_instance(
				Toolset_Field_Utils::DOMAIN_POSTS,
				$wp_post
			);
		}

		return $results;
	}


	/**
	 * @return int
	 */
	public function get_found_elements() {
		if( ! $this->needs_found_rows() ) {
			throw new RuntimeException( 'The number of found elements is not available.' );
		}
		return $this->found_results;
	}


	/**
	 * Check whether a specific single element can be associated.
	 *
	 * The relationship, target role and the other element are those provided in the constructor.
	 *
	 * @param IToolset_Element $association_candidate Element that wants to be associated.
	 * @return Toolset_Result Result with an user-friendly message in case the association is denied.
	 * @since 2.5.6
	 */
	public function check_single_element( IToolset_Element $association_candidate ) {

		if( ! $this->relationship->get_element_type( $this->target_role )->is_match( $association_candidate ) ) {
			return new Toolset_Result( false, __( 'The element has a wrong type or a domain for this relationship.', 'wpcf' ) );
		}

		if( $this->relationship->is_distinct() && $this->is_element_already_associated( $association_candidate ) ) {
			return new Toolset_Result( false,
				__( 'These two elements are already associated and the relationship doesn\'t allow non-distinct associations.', 'wpcf' )
			);
		}

		$cardinality_check_result = $this->check_cardinality_for_role( $this->for_element, $this->target_role->other() );
		if( $cardinality_check_result->is_error() ) {
			return $cardinality_check_result;
		}

		$cardinality_check_result = $this->check_cardinality_for_role( $association_candidate, $this->target_role );
		if( $cardinality_check_result->is_error() ) {
			return $cardinality_check_result;
		}

		// We also need to check $this->relationship->has_scope() when/if the scope support is implemented.

		/** @var IToolset_Element[] $parent_and_child */
		$parent_and_child = Toolset_Relationship_Role::sort_elements( $association_candidate, $this->for_element, $this->target_role );

		/**
		 * toolset_can_create_association
		 *
		 * Allows for forbidding an association between two elements to be created.
		 * Note that it cannot be used to force-allow an association. The filter will be applied only if all
		 * conditions defined by the relationship are met.
		 *
		 * @param bool $result
		 * @param int $parent_id
		 * @param int $child_id
		 * @param string $relationship_slug
		 * @since m2m
		 */
		$filtered_result = apply_filters(
			'toolset_can_create_association',
			true,
			$parent_and_child[0]->get_id(),
			$parent_and_child[1]->get_id(),
			$this->relationship->get_slug()
		);

		if( true !== $filtered_result ) {
			if( is_string( $filtered_result ) ) {
				$message = esc_html( $filtered_result );
			} else {
				$message = __( 'The association was disabled by a third-party filter.', 'wpcf' );
			}
			return new Toolset_Result( false, $message );
		}

		return new Toolset_Result( true );
	}


	private function is_element_already_associated( IToolset_Element $element ) {

		/** @var IToolset_Element[] $parent_and_child */
		$parent_and_child = Toolset_Relationship_Role::sort_elements( $element, $this->for_element, $this->target_role );

		$query = $this->query_factory->associations( array(
			Toolset_Association_Query::QUERY_RELATIONSHIP_SLUG => $this->relationship->get_slug(),
			Toolset_Association_Query::QUERY_PARENT_ID => $parent_and_child[0]->get_id(),
			Toolset_Association_Query::QUERY_CHILD_ID => $parent_and_child[1]->get_id(),
			Toolset_Association_Query::QUERY_LIMIT => 1,
		) );

		$results = $query->get_results();

		return ( count( $results ) > 0 );
	}


	/**
	 * @param IToolset_Element $element Element to check.
	 * @param IToolset_Relationship_Role_Parent_Child $role Provided element's role in the relationship.
	 *
	 * @return Toolset_Result
	 */
	private function check_cardinality_for_role( IToolset_Element $element, IToolset_Relationship_Role_Parent_Child $role ) {
		$maximum_limit = $this->relationship->get_cardinality()->get_limit( $role->other()->get_name(), Toolset_Relationship_Cardinality::MAX );

		if( $maximum_limit !== Toolset_Relationship_Cardinality::INFINITY ) {
			$association_count = $this->get_number_of_already_associated_elements( $role, $element );
			if( $association_count >= $maximum_limit ) {
				$message = sprintf(
					__( 'The element %s has already the maximum allowed amount of associations (%d) as %s in the relationship %s.', 'wpcf' ),
					$element->get_title(),
					$maximum_limit, // this will be always a meaningful number - for INFINITY, this block is skipped entirely.
					$this->relationship->get_role_name( $role ),
					$this->relationship->get_display_name()
				);
				return new Toolset_Result( false, esc_html( $message  ) );
			}
		}

		return new Toolset_Result( true );
	}


	private function get_number_of_already_associated_elements(
		IToolset_Relationship_Role_Parent_Child $role, IToolset_Element $element
	) {
		$for_element_role_query = (
			$role instanceof Toolset_Relationship_Role_Parent
				? Toolset_Association_Query::QUERY_PARENT_ID
				: Toolset_Association_Query::QUERY_CHILD_ID
		);

		$query = $this->query_factory->associations( array(
			Toolset_Association_Query::QUERY_RELATIONSHIP_SLUG => $this->relationship->get_slug(),
			$for_element_role_query => $element->get_id()
		) );

		$results = $query->get_results();

		return count( $results );
	}

	/**
	 * Check whether the element provided in the constructor can accept any new association whatsoever.
	 *
	 * @return Toolset_Result Result with an user-friendly message in case the association is denied.
	 * @since 2.5.6
	 */
	public function can_connect_another_element() {
		$cardinality_check_result = $this->check_cardinality_for_role( $this->for_element, $this->target_role->other() );
		if( $cardinality_check_result->is_error() ) {
			return $cardinality_check_result;
		}

		return new Toolset_Result( true );
	}
}