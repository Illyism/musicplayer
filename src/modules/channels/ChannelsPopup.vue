<template>
  <FullscreenPopupWithScroll
    title="Select subreddits"
    :isMenuOpen="isMenuOpen"
    @onCloseMenuClicked="onCloseMenuClicked"
  >
    <div class="overflow-y-scroll scrollbar-blue h-full p-4">
      <SortToggle />

      <div class="mt-8 flex items-center text-sm">
        <div class="mx-2 flex flex-1">
          <Dropdown
            ref="dropdown"
            triggerClasses="border border-gray-800"
          >
            <template slot="label">
              <span v-if="filterGenre">{{ filterGenre }}</span>
              <span v-else-if="showActiveOnly">Active channels</span>
              <span v-else>All channels</span>
            </template>

            <DropdownSection class="text-sm">
              <DropdownItem @click.native="resetFilters">All channels</DropdownItem>
              <DropdownItem @click.native="setFilterToActiveChannels">Active channels</DropdownItem>
            </DropdownSection>

            <DropdownSection class="text-sm">
              <DropdownItem
                v-for="genre in genres"
                :key="genre"
                @click.native="setFilterToGenre(genre)"
              >
                {{ genre }}
              </DropdownItem>
            </DropdownSection>
          </Dropdown>
        </div>

        <div class="mx-2">
          <div class="w-full relative">
            <input
              v-model="subredditSearch"
              class="bg-gray-900 text-gray-200 pr-16 w-full rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-primary-500 focus:text-gray-100"
              placeholder="Search for subreddits..."
              type="text"
              autocomplete="off"
              autocorrect="off"
            >
            <div class="absolute right-0 inset-y-0 mr-4 text-gray-700 flex items-center justify-center pointer-events-none">
              <IconMagnify class="" />
            </div>
          </div>
        </div>
      </div>

      <GridLayout
        :list="filteredSubs"
        :is-animated="true"
      >
        <BottomCard
          slot-scope="{ item }"
          :title="item.Subreddit"
          :description="item.Genre"
          :is-active="activeSubsMap[item.Subreddit]"
          @onClick="toggleActiveSub(item)"
        />
      </GridLayout>
    </div>
  </FullscreenPopupWithScroll>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import GridLayout from '@/layouts/GridLayout.vue'
import LoadingCardGrid from '@/components/loading/LoadingCardGrid.vue'
import BottomCard from '@/components/BottomCard.vue'
import Dropdown from '@/components/input/Dropdown.vue'
import DropdownSection from '@/components/input/DropdownSection.vue'
import DropdownItem from '@/components/input/DropdownItem.vue'
import { Dictionary } from 'lodash';
import { State, Getter } from 'vuex-class'
import FullscreenPopupWithScroll from '@/components/modals/FullscreenPopupWithScroll.vue'
import SortToggle from '@/modules/channels/SortToggle.vue'

@Component({
  components: {
    GridLayout,
    LoadingCardGrid,
    BottomCard,
    FullscreenPopupWithScroll,
    SortToggle,
    Dropdown,
    DropdownSection,
    DropdownItem,
  },
})
export default class SubredditContainer extends Vue {
  @Prop({ default: false }) public isMenuOpen!: boolean

  @State public subsLoaded!: boolean
  @State public subs!: SubredditListItem[]
  @Getter public activeSubsMap!: Dictionary< SubredditListItem >
  @Getter public genres!: string[]

  public subredditSearch = ''
  public filterGenre = ''
  public showActiveOnly = false

  public onCloseMenuClicked() {
    this.$emit('onCloseMenuClicked')
  }

  public toggleActiveSub(sub: SubredditListItem) {
    this.$store.dispatch('TOGGLE_ACTIVE_SUB', sub)
  }

  public get filteredSubs() {
    return this.subs.filter((sub) => {
      if (this.subredditSearch) {
        if (sub.Subreddit.toLowerCase().indexOf(this.subredditSearch.toLowerCase()) === -1) {
          return false
        }
      }

      if (this.showActiveOnly) {
        return this.activeSubsMap[sub.Subreddit]
      }

      if (this.filterGenre) {
        return this.filterGenre === sub.Genre
      }

      return true
    })
  }

  public resetFilters() {
    if (this.$refs.dropdown) {
      (this.$refs.dropdown as any).doClose()
    }
    this.showActiveOnly = false
    this.filterGenre = ''
  }

  public setFilterToActiveChannels() {
    this.resetFilters()
    this.showActiveOnly = true
  }

  public setFilterToGenre(genre: string) {
    this.resetFilters()
    this.filterGenre = genre
  }
}
</script>
