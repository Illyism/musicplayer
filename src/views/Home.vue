<template>
  <div class="antialiased">
    <SortToggle />
    <SubredditContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SubredditContainer from '@/modules/subs/SubredditContainer.vue'
import SortToggle from '@/modules/playlist/SortToggle.vue'

@Component({
  components: {
    SubredditContainer,
    SortToggle,
  },
})
export default class Home extends Vue {
}
</script>
