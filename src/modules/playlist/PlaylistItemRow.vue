<template>
  <div
    class="h-full text-white cursor-pointer px-6 py-2 flex items-center leading-none"
    :class="{ 'bg-gray-900': isActivePost }"
    @click="$emit('onClick')"
  >
    <div
      class="queue-card h-16 w-16 relative rounded border bg-gray-900 trans"
      :class="{
        'queue-card--active': isActivePost,
        'queue-card--playing': isThisPlaying,
      }"
    >
      <LazyImage
        class="absolute rounded h-full w-full"
        :thumbnail="thumbnail"
        :thumbnail-h-d="thumbnailHD"
      />

      <div class="z-20 queue-card-action absolute rounded w-full h-full flex items-center justify-center">
        <IconPause
          v-if="isThisPlaying"
          class="text-4xl"
        />
        <IconSkipPrevious
          v-else-if="isPrevSong"
          class="text-4xl"
        />
        <IconSkipNext
          v-else-if="isNextSong"
          class="text-4xl"
        />
        <IconYoutube
          v-else
          class="text-4xl"
        />
      </div>
    </div>

    <div class="ml-4 flex-1">
      <div class="queue-card-info rounded w-full h-full leading-tight">
        <div class="text-gray-200">
          {{ title }}
        </div>
        <div class="flex text-xs">
          <div class="font-medium text-orange-400">
            {{ ups }} upvotes
          </div>
          <div
            v-if="numComments"
            class="px-2 text-gray-700"
          >
            •
          </div>
          <div
            v-if="numComments"
            class="font-medium text-teal-600"
          >
            {{ numComments }} comments
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import LazyImage from '@/components/LazyImage.vue'

@Component({
    components: {
        LazyImage,
    },
})
export default class PlaylistCard extends Vue {
    @Prop({ default: false }) public isActivePost!: boolean
    @Prop({ default: false }) public isPrevSong!: boolean
    @Prop({ default: false }) public isNextSong!: boolean
    @Prop({}) public title!: string
    @Prop({}) public thumbnailHD!: string
    @Prop({}) public thumbnail!: string
    @Prop({}) public numComments!: number
    @Prop({}) public ups!: number
    @Getter public isPlaying!: boolean

    get isThisPlaying() {
        return this.isActivePost && this.isPlaying
    }
}
</script>

<style scoped>
.queue-card-action {
    opacity: 0;
    transition: opacity .5s cubic-bezier(0.0,0.0,0.2,1);
}

.queue-card:hover .queue-card-action,
.queue-card--active .queue-card-action {
    opacity: 1;
}

.queue-card {
    @apply border-gray-800;
}
.queue-card:hover {
    @apply border-primary-800;
}
.queue-card--active {
    @apply border-primary-800;
}
.queue-card--playing,
.queue-card--playing:hover {
    @apply border-primary-500;
}
</style>
