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
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import GridLayout from '@/layouts/GridLayout.vue'
import LoadingCardGrid from '@/components/loading/LoadingCardGrid.vue'
import BottomCard from '@/components/BottomCard.vue'
import { SubredditListItem } from '../../shims-vue';

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
  public subsLoaded!: boolean
  public subs!: SubredditListItem[]
  public activeSubs!: SubredditListItem[]

  private created() {
    this.$store.dispatch('FETCH_SUBS')
  }

  private get inactiveSubs() {
    return this.subs.filter((sub) => this.activeSubs.indexOf(sub) === -1)
  }

  private toggleActiveSub(sub: SubredditListItem) {
    this.$store.dispatch('TOGGLE_ACTIVE_SUB', sub)
  }
}
</script>
