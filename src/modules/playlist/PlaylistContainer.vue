<template>
    <div v-if="playlist.length > 0" class="p-4">
        <div class="text-gray-100 font-light text-sm mx-2 mb-2">
            Playlist
        </div>

        <GridLayout
            :list="playlist"
        >
            <PlaylistCard
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
        </GridLayout>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace} from 'vuex-class'
import { RawPostData } from '@/typings/reddit'
import isPostEqual from '@/modules/playlist/util/isPostEqual'

import GridLayout from '@/layouts/GridLayout.vue'
import PlaylistController from '@/modules/playlist/PlaylistController'
import PlaylistCard from '@/modules/playlist/PlaylistCard.vue'

@Component({
    components: {
        GridLayout,
        PlaylistCard,
    },
})
export default class PlaylistContainer extends Vue {
    @Getter public playlist!: RawPostData[]
    @State public activePost?: RawPostData
    @Getter public nextSong?: RawPostData
    @Getter public prevSong?: RawPostData

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
