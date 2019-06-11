<template>
    <div
        class="queue-card h-full w-full relative rounded border border-gray-800 bg-gray-900 text-white cursor-pointer trans"
        :class="{
            'queue-card--active': isActivePost,
            'queue-card--playing': isActivePost && isPlaying,
        }"
        @click="$emit('onClick')"
    >
        <div class="absolute rounded h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url(${thumbnail})` }"></div>
        <div class="z-10 queue-card-info p-2 overflow-hidden absolute w-full h-full flex flex-col justify-between leading-tight">
            <div class="flex justify-between">
                <div class="font-medium text-orange-400">
                    {{ ups }}
                </div>
                <div class="text-xs ml-2 font-medium text-teal-600">
                    {{ numComments }}
                </div>
            </div>
            <div>
                <div class="text-xs h-8 overflow-hidden leading-tight text-gray-200 flex items-end">
                    {{ title }}
                </div>
            </div>
        </div>
        <div class="z-20 queue-card-action absolute w-full h-full flex items-center justify-center">
            <IconPause v-if="isActivePost && isPlaying" class="text-4xl" />
            <IconSkipBackward v-else-if="isPrevSong" class="text-4xl" />
            <IconSkipForward v-else-if="isNextSong" class="text-4xl" />
            <IconYoutube v-else class="text-4xl" />
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class PlaylistCard extends Vue {
    @Prop({ default: false }) public isActivePost!: boolean
    @Prop({ default: false }) public isPrevSong!: boolean
    @Prop({ default: false }) public isNextSong!: boolean
    @Prop({}) public title!: string
    @Prop({}) public thumbnail!: string
    @Prop({}) public numComments!: number
    @Prop({}) public ups!: number
    @Getter public isPlaying!: boolean
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
