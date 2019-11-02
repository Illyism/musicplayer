<template>
  <div class="leading-tight">
    <div class="text-gray-100 font-light text-sm mx-2">
      Sort Reddit posts by
    </div>
    <div class="flex flex-wrap items-center w-full">
      <SortToggleItem
        v-for="toggle in toggles"
        :key="toggle.id"
        :image="toggle.image"
        :id="toggle.id"
        :color="toggle.color"
        :is-active="activeSort === toggle.id"
        @onClick="SET_ACTIVE_SORT(toggle)"
      />
    </div>

    <transition
      enter-class="opacity-0 scale-90"
      enter-active-class="ease-out transition-fastest"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-active-class="ease-in transition-fastest"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        v-if="activeSort === 'top'"
        class="px-1 w-full flex flex-wrap items-center justify-stretch"
      >
        <TopSortToggleItem
          v-for="toggle in topToggles"
          :key="toggle.id"
          :id="toggle.id[0]"
          :title="toggle.title"
          :color="toggle.color"
          :is-active="activeTopSort === toggle.id"
          @onClick="SET_ACTIVE_TOP_SORT(toggle)"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SortToggleItem from '@/modules/channels/SortToggleItem.vue'
import TopSortToggleItem from '@/modules/channels/TopSortToggleItem.vue'
import { mapState, mapActions } from 'vuex'

@Component({
  components: {
    SortToggleItem,
    TopSortToggleItem,
  },
  computed: {
    ...mapState(['activeSort', 'activeTopSort']),
  },
  methods: {
    ...mapActions(['SET_ACTIVE_SORT', 'SET_ACTIVE_TOP_SORT']),
  },
})
export default class SortToggle extends Vue {
    public activeSort!: string
    public activeTopSort!: string

    public toggles: SortMethod[] = [
      { id: 'hot', image: 'fire', color: 'red' },
      { id: 'top', image: '1st-place-medal', color: 'yellow' },
      { id: 'new', image: 'front-facing-baby-chick', color: 'green' },
    ]

    public topToggles: TopSortMethod[] = [
      { id: 'hour', title: 'Hour', color: 'primary-500' },
      { id: 'day', title: 'Today', color: 'primary-500' },
      { id: 'week', title: 'Week', color: 'primary-500' },
      { id: 'month', title: 'Month', color: 'primary-500' },
      { id: 'year', title: 'Year', color: 'primary-500' },
      { id: 'all', title: 'All', color: 'primary-500' },
    ]
}
</script>
