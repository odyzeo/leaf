<template>
    <div>

        <div class="wrapper filters">
            <div class="container">
                <div class="flex flex--grid-mini">
                    <div class="flex-1 filters__title">
                        FILTER PONÚK
                    </div>
                    <div class="flex-1-2">
                        <div class="select-box" :class="{'select-box--active': activeSelectBox === 1}">
                            <div class="select-box__title" @click="setActiveSelectBox(1)">
                                <strong>Expertíza dobrovoľníka</strong>
                            </div>

                            <transition name="transition-drop">
                                <div class="select-box__options transition-drop" v-if="activeSelectBox === 1">

                                    <label v-for="e in expertise" class="select-box__option checkbox">
                                        <input type="checkbox"
                                               class="checkbox__input"
                                               v-model="checkedExpertise"
                                               :value="e.id">
                                        <span class="checkbox__box"></span>
                                        <span class="checkbox__label">{{ e.name }}</span>
                                    </label>

                                    <a href class="select-box__submit" @click.prevent="applySelectBox">
                                        Potvrdiť výber
                                    </a>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="flex-1-2">
                        <div class="select-box" :class="{'select-box--active': activeSelectBox === 2}">
                            <div class="select-box__title" @click="setActiveSelectBox(2)">
                                <strong>Lokalita</strong>
                            </div>

                            <transition name="transition-drop">
                                <div class="select-box__options transition-drop" v-if="activeSelectBox === 2">

                                    <label v-for="(e, key, i) in location" class="select-box__option checkbox">
                                        <input type="checkbox"
                                               class="checkbox__input"
                                               v-model="checkedLocation"
                                               :value="e.id">
                                        <span class="checkbox__box"></span>
                                        <strong class="checkbox__label" v-if="i === 0">{{ e.name }}</strong>
                                        <span class="checkbox__label" v-if="i > 0">{{ e.name }}</span>
                                    </label>

                                    <a href class="select-box__submit" @click.prevent="applySelectBox">
                                        Potvrdiť výber
                                    </a>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="flex-1-3">
                        <div class="select-box" :class="{'select-box--active': activeSelectBox === 3}">
                            <div class="select-box__title" @click="setActiveSelectBox(3)">
                                Zameranie organizácie
                            </div>

                            <transition name="transition-drop">
                                <div class="select-box__options transition-drop" v-if="activeSelectBox === 3">

                                    <label v-for="e in focus" class="select-box__option checkbox">
                                        <input type="checkbox"
                                               class="checkbox__input"
                                               v-model="checkedFocus"
                                               :value="e.id">
                                        <span class="checkbox__box"></span>
                                        <span class="checkbox__label">{{ e.name }}</span>
                                    </label>

                                    <a href class="select-box__submit" @click.prevent="applySelectBox">
                                        Potvrdiť výber
                                    </a>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div class="flex-1-3">
                        <div class="select-box" :class="{'select-box--active': activeSelectBox === 4}">
                            <div class="select-box__title" @click="setActiveSelectBox(4)">
                                Druh organizácie
                            </div>

                            <transition name="transition-drop">
                                <div class="select-box__options transition-drop" v-if="activeSelectBox === 4">

                                    <label v-for="e in kind" class="select-box__option checkbox">
                                        <input type="checkbox"
                                               class="checkbox__input"
                                               v-model="checkedKind"
                                               :value="e.id">
                                        <span class="checkbox__box"></span>
                                        <span class="checkbox__label">{{ e.name }}</span>
                                    </label>

                                    <a href class="select-box__submit" @click.prevent="applySelectBox">
                                        Potvrdiť výber
                                    </a>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div class="flex-1-3">
                        <div class="select-box" :class="{'select-box--active': activeSelectBox === 5}">
                            <div class="select-box__title" @click="setActiveSelectBox(5)">
                                Dĺžka projektu
                            </div>

                            <transition name="transition-drop">
                                <div class="select-box__options transition-drop" v-if="activeSelectBox === 5">

                                    <label v-for="e in period" class="select-box__option checkbox">
                                        <input type="checkbox"
                                               class="checkbox__input"
                                               v-model="checkedPeriod"
                                               :value="e.id">
                                        <span class="checkbox__box"></span>
                                        <span class="checkbox__label">{{ e.name }}</span>
                                    </label>

                                    <a href class="select-box__submit" @click.prevent="applySelectBox">
                                        Potvrdiť výber
                                    </a>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ped">

            <div class="page-content entry-content">

                <div class="ped__content">

                    <div class="ped__result-count">
                        Našli sme <span class="text-primary">{{ filteredPosts.length }}</span> {{ filteredPosts.length |
                        pluralize('ponuku', 'ponuky', 'ponúk')}}
                    </div>

                    <div class="flex flex--grid-mini">
                        <div class="flex-1-3" v-for="post in filteredPosts">
                            <div class="card card--ped">
                                <div class="card__header">
                                    <div class="card__title">
                                        {{ post.title }}
                                    </div>
                                    <div class="card__subtitle">
                                        <span v-for="e in post.ped_expertise">{{e.name}}</span>
                                    </div>
                                </div>

                                <div class="card__body">
                                    <div class="">
                                        <span v-for="e in post.ped_kind">{{e.name}}</span>
                                    </div>

                                    <div class="card__subtitle">
                                        <span v-for="e in post.ped_period">{{e.name}}</span>
                                    </div>

                                    <div class="card__excerpt">
                                        {{ post.ped_excerpt }}
                                    </div>

                                    <a :href="post.link" class="btn btn--block btn--blank">Toto chcem</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeSelectBox: 0,
                checkedExpertise: [],
                checkedLocation: [],
                checkedFocus: [],
                checkedKind: [],
                checkedPeriod: [],
                filteredPosts: this.posts,
            }
        },
        props: {
            expertise: {
                type: Object,
            },
            location: {
                type: Object,
            },
            focus: {
                type: Object,
            },
            kind: {
                type: Object,
            },
            period: {
                type: Object,
            },
            posts: {
                type: Array,
            },
        },
        methods: {
            setActiveSelectBox(id) {
                if (this.activeSelectBox === id) {
                    this.applySelectBox()
                } else {
                    this.activeSelectBox = id
                }
            },
            applySelectBox() {
                this.activeSelectBox = 0

                this.filteredPosts = this.posts.filter(p => {
                    if (this.checkedExpertise.length > 0
                        && p.ped_expertise.filter(x => this.checkedExpertise.indexOf(x.id) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedLocation.length > 0
                        && p.ped_location.filter(x => this.checkedLocation.indexOf(x.id) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedFocus.length > 0
                        && p.ped_focus.filter(x => this.checkedFocus.indexOf(x.id) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedKind.length > 0
                        && p.ped_kind.filter(x => this.checkedKind.indexOf(x.id) > -1).length === 0
                    ) {
                        return false
                    }

                    if (this.checkedPeriod.length > 0
                        && p.ped_period.filter(x => this.checkedPeriod.indexOf(x.id) > -1).length === 0
                    ) {
                        return false
                    }

                    return true
                })
            },
        },
    }
</script>
