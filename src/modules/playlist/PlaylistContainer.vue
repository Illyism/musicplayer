<template>
    <div v-if="playlist.length > 0" class="py-4">
        <ListLayout
            :list="playlist"
        >
            <PlaylistItemRow
                :key="item.id"
                slot-scope="{ item }"
                :title="item.title"
                :thumbnailHD="item.secure_media && item.secure_media.oembed ? item.secure_media.oembed.thumbnail_url : null"
                :thumbnail="item.thumbnail"
                :ups="item.ups"
                :numComments="item.num_comments"
                :isActivePost="isActivePost(item)"
                :isPrevSong="isPrevSong(item)"
                :isNextSong="isNextSong(item)"
                @onClick="onClick(item)"
            />
        </ListLayout>

        <div class="text-gray-500 font-light text-sm hover:bg-gray-900 mx-2 mb-2 cursor-pointer trans trans-bg text-center rounded"
            @click="TOGGLE_PLAYLIST_EXPANDED">
            <IconChevronDown v-if="!isPlaylistExpanded"  class="mdi-fix" />
            <IconChevronUp v-else class="mdi-fix" />
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace} from 'vuex-class'
import { RawPostData } from '@/typings/reddit'
import isPostEqual from '@/modules/playlist/util/isPostEqual'

import ListLayout from '@/layouts/ListLayout.vue'
import PlaylistController from '@/modules/playlist/PlaylistController'
import PlaylistItemRow from '@/modules/playlist/PlaylistItemRow.vue'

@Component({
    components: {
        ListLayout,
        PlaylistItemRow,
    },
})
export default class PlaylistContainer extends Vue {
    @Getter public playlist!: RawPostData[]
    @State public activePost?: RawPostData
    @Getter public nextSong?: RawPostData
    @Getter public prevSong?: RawPostData
    @State public isPlaylistExpanded!: boolean

    @Action public TOGGLE_PLAYLIST_EXPANDED!: () => void

    public onClick(post: RawPostData) {
        PlaylistController.toggleSong(post)
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
