<template>
    <div>
        <div class="flex flex--grid-mini">
            <div class="flex-1-2">
                <div v-for="e in expertise">
                    <label>
                        <input type="checkbox" v-model="checkedExpertise" :value="e.id">
                        <span>{{ e.name }}</span>
                    </label>
                </div>
            </div>

            <div class="flex-1-2">
                <div v-for="e in location">
                    <label>
                        <input type="checkbox" v-model="checkedLocation" :value="e.id">
                        <span>{{ e.name }}</span>
                    </label>
                </div>
            </div>

            <div class="flex-1-3">
                <div v-for="e in focus">
                    <label>
                        <input type="checkbox" v-model="checkedFocus" :value="e.id">
                        <span>{{ e.name }}</span>
                    </label>
                </div>
            </div>
            <div class="flex-1-3">
                <div v-for="e in kind">
                    <label>
                        <input type="checkbox" v-model="checkedKind" :value="e.id">
                        <span>{{ e.name }}</span>
                    </label>
                </div>
            </div>
            <div class="flex-1-3">
                <div v-for="e in period">
                    <label>
                        <input type="checkbox" v-model="checkedPeriod" :value="e.id">
                        <span>{{ e.name }}</span>
                    </label>
                </div>
            </div>
            <div class="flex-1-2">

            </div>
        </div>

        Našli sme {{ filteredPosts.length }} {{ filteredPosts.length | pluralize('ponuku,', 'ponuky', 'ponúk')}}

        <div class="flex flex--grid-mini">
            <div class="flex-1-3" v-for="post in filteredPosts">
                <div class="card">
                    {{ post.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checkedExpertise: [],
                checkedLocation: [],
                checkedFocus: [],
                checkedKind: [],
                checkedPeriod: [],
            }
        },
        props: {
            expertise: {
                type: Array,
            },
            location: {
                type: Array,
            },
            focus: {
                type: Array,
            },
            kind: {
                type: Array,
            },
            period: {
                type: Array,
            },
            posts: {
                type: Array,
            },
        },
        computed: {
            filteredPosts() {
                return this.posts.filter(p => {
                    if (this.checkedExpertise.length > 0
                        && p.ped_expertise.filter(x => this.checkedExpertise.indexOf(x) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedLocation.length > 0
                        && p.ped_location.filter(x => this.checkedLocation.indexOf(x) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedFocus.length > 0
                        && p.ped_focus.filter(x => this.checkedFocus.indexOf(x) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedKind.length > 0
                        && p.ped_kind.filter(x => this.checkedKind.indexOf(x) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedPeriod.length > 0
                        && p.ped_period.filter(x => this.checkedPeriod.indexOf(x) > -1).length === 0
                    ) {
                        return false
                    }

                    return true
                })
            },
        },
        mounted() {

        },
    }
</script>
