<template>
  <div
    v-if="subsLoaded"
    class="pl-2"
  >
    <div
      class="h-24 w-24 p-2 rounded border border-gray-800 bg-gray-900 text-white flex flex-col justify-end cursor-pointer trans hover:border-primary-800"
      @click="openMenu"
    >
      {{ activeSubs.length }} active channels
    </div>

    <ChannelsPopup
      :isMenuOpen="isMenuOpen"
      @onCloseMenuClicked="closeMenu"
    />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { State, Action } from 'vuex-class'
import ChannelsPopup from '@/modules/channels/ChannelsPopup.vue'

@Component({
  components: {
    ChannelsPopup,
  },
  computed: {
    ...mapState(['subsLoaded', 'activeSubs']),
  },
})
export default class ChannelsPicker extends Vue {
  @State public subsLoaded!: boolean
  @State public activeSubs!: SubredditListItem[]

  @Action public FETCH_SUBS!: () => void

  public isMenuOpen = false
  public openMenu() {
    this.isMenuOpen = true
  }
  public closeMenu() {
    this.isMenuOpen = false
  }


  private created() {
    this.FETCH_SUBS()
  }
}
</script>
