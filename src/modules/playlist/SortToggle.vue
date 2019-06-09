<template>
    <div class="p-4 flex items-center leading-tight">
      <SortToggleItem
        v-for="toggle in toggles"
        :key="toggle.id"
        :image="toggle.image"
        :id="toggle.id"
        :color="toggle.color"
        :isActive="activeSort === toggle.id"
        @onClick="SET_ACTIVE_SORT(toggle)"
      />

      <div v-if="activeSort === 'top'" class="flex w-24 h-16 flex-wrap">
        <TopSortToggleItem
          v-for="toggle in topToggles"
          :key="toggle.id"
          :id="toggle.id[0]"
          :title="toggle.title"
          :color="toggle.color"
          :isActive="activeTopSort === toggle.id"
          @onClick="SET_ACTIVE_TOP_SORT(toggle)"
        />
      </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SortToggleItem from '@/modules/playlist/SortToggleItem.vue'
import TopSortToggleItem from '@/modules/playlist/TopSortToggleItem.vue'
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
      { id: 'hour', title: 'Last hour', color: 'yellow-100' },
      { id: 'day', title: 'Today', color: 'yellow-200' },
      { id: 'week', title: 'This week', color: 'yellow-300' },
      { id: 'month', title: 'This month', color: 'yellow-400' },
      { id: 'year', title: 'This year', color: 'yellow-500' },
      { id: 'all', title: 'All time', color: 'yellow-600' },
    ]
}
</script>
