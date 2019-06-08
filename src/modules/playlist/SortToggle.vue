<template>
    <div class="p-4 flex items-center leading-tight">
      <SortToggleItem
        v-for="toggle in toggles"
        :key="toggle.id"
        :image="toggle.image"
        :id="toggle.id"
        :color="toggle.color"
        :isActive="activeSort === toggle.id"
        @onClick="setActiveSort(toggle)"
      />

      <div v-if="activeSort === 'top'" class="flex flex-col h-16 flex-wrap">
        <TopSortToggleItem
          v-for="toggle in topToggles"
          :key="toggle.id"
          :id="toggle.id"
          :title="toggle.title"
          :color="toggle.color"
          :isActive="activeTopSort === toggle.id"
          @onClick="setActiveTopSort(toggle)"
        />
      </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SortToggleItem from '@/modules/playlist/SortToggleItem.vue'
import TopSortToggleItem from '@/modules/playlist/TopSortToggleItem.vue'
import { mapState } from 'vuex'

@Component({
  components: {
    SortToggleItem,
    TopSortToggleItem,
  },
  computed: {
    ...mapState(['activeSort', 'activeTopSort']),
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
      { id: 'h', title: 'Hour', color: 'yellow-500' },
      { id: 'd', title: 'day', color: 'yellow-400' },
      { id: 'm', title: 'Month', color: 'yellow-300' },
      { id: 'y', title: 'Year', color: 'yellow-200' },
      { id: 'a', title: 'All time', color: 'yellow-100' },
    ]

    private setActiveSort(sort: SortMethod) {
      this.$store.dispatch('SET_ACTIVE_SORT', sort)
    }

    private setActiveTopSort(sort: TopSortMethod) {
      this.$store.dispatch('SET_ACTIVE_TOP_SORT', sort)
    }
}
</script>
