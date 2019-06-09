<template>
  <div class="antialiased">
    <SortToggle />
    <QueueContainer />
    <SubredditContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SubredditContainer from '@/modules/subs/SubredditContainer.vue'
import SortToggle from '@/modules/playlist/SortToggle.vue'
import QueueContainer from '@/modules/playlist/QueueContainer.vue'

@Component({
  components: {
    SubredditContainer,
    SortToggle,
    QueueContainer,
  },
})
export default class Home extends Vue {
}
</script>
