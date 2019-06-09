<template>
    <div v-if="!subsLoaded" class="p-4">
        <div class="text-gray-100 font-light text-sm mx-2 mb-2">
            Loading subreddits...
        </div>
        <LoadingCardGrid :count="15" />
    </div>

    <div v-else class="p-4">
        <div v-if="activeSubs.length > 0">
            <div class="text-gray-100 font-light text-sm mx-2 mb-2">
                Subreddits in playlist
            </div>
            <GridLayout
                :list="activeSubs"
                class="mb-8"
            >
              <BottomCard
                slot-scope="{ item }"
                :title="item.Subreddit"
                :description="item.Genre"
                :isActive="true"
                @onClick="toggleActiveSub(item)"
              />
            </GridLayout>
        </div>

        <div class="text-gray-100 font-light text-sm mx-2 mb-2">
            All subreddits
        </div>

        <div class="mx-2 mb-2">
          <div class="w-full relative">
            <input v-model="subredditSearch"
              class="bg-gray-900 text-gray-200 pr-16 text-xs w-full rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-yellow-500 focus:text-gray-100"
              placeholder="Search for subreddits..."
              type="text" autocomplete="off" autocorrect="off">
            <div class="absolute right-0 inset-y-0 mr-4 text-gray-700 flex items-center justify-center pointer-events-none">
              <IconMagnify class="" />
            </div>
          </div>
        </div>

        <GridLayout
            :list="inactiveSubs"
        >
            <BottomCard
                slot-scope="{ item }"
                :title="item.Subreddit"
                :description="item.Genre"
                @onClick="toggleActiveSub(item)"
            />
        </GridLayout>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapGetters } from 'vuex'
import GridLayout from '@/layouts/GridLayout.vue'
import LoadingCardGrid from '@/components/loading/LoadingCardGrid.vue'
import BottomCard from '@/components/BottomCard.vue'
import { Dictionary } from 'lodash';

@Component({
  components: {
    GridLayout,
    LoadingCardGrid,
    BottomCard,
  },
  computed: {
    ...mapState(['subsLoaded', 'subs', 'activeSubs']),
    ...mapGetters(['activeSubsMap']),
  },
})
export default class SubredditContainer extends Vue {
  public subsLoaded!: boolean
  public subs!: SubredditListItem[]
  public activeSubs!: SubredditListItem[]
  public subredditSearch: string = ''
  public activeSubsMap!: Dictionary< SubredditListItem >

  private created() {
    this.$store.dispatch('FETCH_SUBS')
  }

  private isSubVisible(sub: SubredditListItem) {
    if (this.activeSubsMap[sub.Subreddit]) {
      return false // is active
    }

    if (this.subredditSearch && this.subredditSearch.length > 3) {
      if (sub.Subreddit.indexOf(this.subredditSearch) === -1) {
        return false // filtered by search
      }
    }

    return true
  }

  private get inactiveSubs() {
    return this.subs.filter(this.isSubVisible)
  }

  private toggleActiveSub(sub: SubredditListItem) {
    this.$store.dispatch('TOGGLE_ACTIVE_SUB', sub)
  }
}
</script>
