<template>
  <div
    v-if="playlist.length > 0"
    class="pr-2"
  >
    <div
      class="xs:h-24 xs:w-24 text-xs xs:text-sm leading-tight p-2 rounded border border-gray-800 bg-gray-900 text-white flex flex-col justify-end cursor-pointer trans hover:border-primary-800"
      @click="openMenu"
    >
      {{ playlist.length }} <span class="hidden xs:inline">songs queued</span>
    </div>

    <FullscreenPopupWithScroll
      title="Playlist"
      :isMenuOpen="isMenuOpen"
      @onCloseMenuClicked="closeMenu"
    >
      <ListLayout
        :list="playlist"
      >
        <PlaylistItemRow
          :key="item.id"
          slot-scope="{ item }"
          :title="item.title"
          :thumbnail-h-d="item.secure_media && item.secure_media.oembed ? item.secure_media.oembed.thumbnail_url : null"
          :thumbnail="item.thumbnail"
          :ups="item.ups"
          :num-comments="item.num_comments"
          :is-active-post="isActivePost(item)"
          :is-prev-song="isPrevSong(item)"
          :is-next-song="isNextSong(item)"
          @onClick="onClick(item)"
        />
      </ListLayout>
    </FullscreenPopupWithScroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter } from 'vuex-class'
import { RawPostData } from '@/typings/reddit'
import isPostEqual from '@/modules/playlist/util/isPostEqual'

import ListLayout from '@/layouts/ListLayout.vue'
import PlaylistController from '@/modules/playlist/PlaylistController'
import PlaylistItemRow from '@/modules/playlist/PlaylistItemRow.vue'
import FullscreenPopupWithScroll from '@/components/modals/FullscreenPopupWithScroll.vue'

@Component({
    components: {
        ListLayout,
        PlaylistItemRow,
        FullscreenPopupWithScroll,
    },
})
export default class PlaylistContainer extends Vue {
    @Getter public playlist!: RawPostData[]
    @State public activePost?: RawPostData
    @Getter public nextSong?: RawPostData
    @Getter public prevSong?: RawPostData

    public isMenuOpen = false

    public openMenu() {
      this.isMenuOpen = true
    }
    public closeMenu() {
      this.isMenuOpen = false
    }

    public onClick(post: RawPostData) {
        PlaylistController.toggleSong(post)
        this.closeMenu()
    }

    private isActivePost(post: RawPostData) {
        if (!this.activePost) {
            return false
        }
        return isPostEqual(post, this.activePost)
    }

    private isNextSong(post: RawPostData) {
        if (!this.nextSong) {
            return false
        }
        return isPostEqual(post, this.nextSong)
    }

    private isPrevSong(post: RawPostData) {
        if (!this.prevSong) {
            return false
        }
        return isPostEqual(post, this.prevSong)
    }
}
</script>
