<template>
  <div
    v-if="playlist.length > 0"
    class="pr-2"
  >
    <div
      class="h-24 w-24 p-2 rounded border border-gray-800 bg-gray-900 text-white flex flex-col justify-end cursor-pointer trans hover:border-primary-800"
      @click="openMenu"
    >
      {{ playlist.length }} songs queued
    </div>
    
    <PortalWithFade
      :isMenuOpen="isMenuOpen"
    >
      <div
        class="fixed inset-0 px-2 py-12 z-30 bg-overlay-floating" 
        @click="closeMenu"
      >
        <div
          class="w-full h-full max-w-xl mx-auto pointer-events-auto shadow-xl rounded-lg bg-gray-900 flex flex-col"
          @click.prevent.stop=""
        >
          <div class="flex items-center justify-between pl-6 pr-2 bg-gray-800 rounded-t-lg">
            <div class="text-lg text-gray-100 font-medium py-2">
              Playlist
            </div>
            
            <div
              class="h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded text-gray-100 cursor-pointer"
              @click="closeMenu"
            >
              <IconClose class="" />
            </div>
          </div>
          <ListLayout
            class="overflow-y-scroll"
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
        </div>
      </div>
    </PortalWithFade>
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
import PortalWithFade from '@/components/PortalWithFade.vue'

@Component({
    components: {
        ListLayout,
        PlaylistItemRow,
        PortalWithFade,
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
