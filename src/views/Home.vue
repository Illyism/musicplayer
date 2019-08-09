<template>
  <div class="antialiased">
    <PlaylistContainer />
    <SortToggle />
    <SubredditContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SubredditContainer from '@/modules/subs/SubredditContainer.vue'
import SortToggle from '@/modules/playlist/SortToggle.vue'
import PlaylistContainer from '@/modules/playlist/PlaylistContainer.vue'

@Component({
  components: {
    SubredditContainer,
    SortToggle,
    PlaylistContainer,
  },
})
export default class Home extends Vue {
}
</script>
