<template>
    <div v-if="!subsLoaded" class="p-4">
        <div class="text-gray-100 font-light text-sm mx-2 mb-2">
            Loading channels...
        </div>
        <LoadingCardGrid :count="15" />
    </div>

    <div v-else class="p-4">
        <div v-if="activeSubs.length > 0">
            <div class="text-gray-100 font-light text-sm mx-2 mb-2">
                Active channels
                <span class="text-gray-200 font-bold text-xs bg-gray-900 hover:bg-gray-800 ml-1 py-1 px-1 cursor-pointer trans trans-bg rounded"
                    @click="TOGGLE_SUBREDDITS_EXPANDED"
                  >
                  {{ activeSubs.length }}
                  <IconChevronDown v-if="!isSubredditsExpanded"  class="mdi-fix" />
                  <IconChevronUp v-else class="mdi-fix" />
                </span>
            </div>
            
            <GridLayout
                v-if="isSubredditsExpanded"
                :list="activeSubs"
                class="mb-8"
                :isAnimated="true"
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

        <template v-if="isSubredditsExpanded">
            <div class="text-gray-100 font-light text-sm mx-2 mb-2">
                All channels
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
                :isAnimated="true"
            >
                <BottomCard
                    slot-scope="{ item }"
                    :title="item.Subreddit"
                    :description="item.Genre"
                    @onClick="toggleActiveSub(item)"
                />
            </GridLayout>
        </template>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapGetters } from 'vuex'
import GridLayout from '@/layouts/GridLayout.vue'
import LoadingCardGrid from '@/components/loading/LoadingCardGrid.vue'
import BottomCard from '@/components/BottomCard.vue'
import { Dictionary } from 'lodash';
import { State, Getter, Action, Mutation, namespace} from 'vuex-class'

@Component({
  components: {
    GridLayout,
    LoadingCardGrid,
    BottomCard,
  },
  computed: {
    ...mapState(['subsLoaded', 'subs', 'activeSubs']),
  },
})
export default class SubredditContainer extends Vue {
  @State public subsLoaded!: boolean
  @State public subs!: SubredditListItem[]
  @State public activeSubs!: SubredditListItem[]
  @Getter public activeSubsMap!: Dictionary< SubredditListItem >
  @Action public FETCH_SUBS!: () => void

  public isSubredditsExpanded = true
  public TOGGLE_SUBREDDITS_EXPANDED() {
    this.isSubredditsExpanded = !this.isSubredditsExpanded
  }

  public subredditSearch: string = ''

  private created() {
    this.FETCH_SUBS()
  }

  private isSubVisible(sub: SubredditListItem) {
    if (this.activeSubsMap[sub.Subreddit]) {
      return false // is active
    }

    if (this.subredditSearch && this.subredditSearch.length > 3) {
      if (sub.Subreddit.toLowerCase().indexOf(this.subredditSearch.toLowerCase()) === -1) {
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
