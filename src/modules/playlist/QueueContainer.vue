<template>
    <div class="p-4">
        <div class="text-gray-100 font-light text-sm mx-2 mb-2">
            Queue
        </div>

        <GridLayout
            :list="playlist"
        >
            <div
                slot-scope="{ item }"
                class="queue-card h-full w-full relative rounded border border-gray-800 bg-gray-900 text-white cursor-pointer trans"
                :class="{ 'queue-card--active': activePost === item }"
                @click="onClick(item)"
            >
                <div class="absolute rounded h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url(${item.thumbnail})` }"></div>
                <div class="z-10 queue-card-info p-2 overflow-hidden absolute w-full h-full flex flex-col justify-between leading-tight">
                    <div class="flex justify-between">
                        <div class="font-medium text-orange-400">
                            {{ item.ups }}
                        </div>
                        <div class="text-xs ml-2 font-medium text-teal-600">
                            {{ item.num_comments }}
                        </div>
                    </div>
                    <div>
                        <div class="text-xs h-8 overflow-hidden leading-tight text-gray-200 flex items-end">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
                <div class="z-20 queue-card-action absolute w-full h-full flex items-center justify-center">
                    <IconPause v-if="activePost === item" class="text-4xl" />
                    <IconYoutube v-else class="text-4xl" />
                </div>
            </div>
        </GridLayout>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace} from 'vuex-class'
import { RawPostData } from '@/typings/reddit'

import GridLayout from '@/layouts/GridLayout.vue'
import PlaylistController from '@/modules/playlist/PlaylistController'

@Component({
    components: {
        GridLayout,
    },
})
export default class QueueContainer extends Vue {
    @Getter public playlist!: RawPostData[]
    @State public activePost!: RawPostData
    @Action public TOGGLE_POST!: (post: RawPostData) => void

    public mounted() {
        PlaylistController.getMusic()
    }

    public onClick(post: RawPostData) {
        this.TOGGLE_POST(post)
    }
}
</script>

<style scoped>
.queue-card .queue-card-info {
    background: rgba(26, 32, 44, .5);
    opacity: 0.8;
    transition: background .25s cubic-bezier(0.0,0.0,0.2,1), opacity .25s cubic-bezier(0.0,0.0,0.2,1);
}
.queue-card-action {
    opacity: 0;
    transition: opacity .5s cubic-bezier(0.0,0.0,0.2,1);
}


.queue-card:hover .queue-card-info,
.queue-card--active .queue-card-info {
    opacity: 1;
    background: rgba(26, 32, 44, .9);
}
.queue-card:hover .queue-card-action,
.queue-card--active .queue-card-action {
    opacity: 1;
}
</style>
