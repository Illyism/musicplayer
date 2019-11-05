<template>
  <img
    :src="src"
    class="transition-opacity transition-slow ease-out"
    :class="{ 'opacity-0': !loaded }"
    alt=""
    @load="onLoad"
    @error="onError"
  >
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

/**
 * Starts loading the image when it's first visible in viewport
 * Then waits until the image is fully loaded and increases opacity
 * If the hd quality image fails somehow, load the low quality version
 */
@Component
export default class LazyImage extends Vue {
    @Prop() public thumbnailHD?: string
    @Prop() public thumbnail!: string

    public quality: 'hd' | 'low' = 'hd'
    public loaded = false

    public observer?: IntersectionObserver
    public hasBeenInViewport = false

    public get src() {
        if (!this.hasBeenInViewport) {
            return // hide it for now
        }
        if (this.quality === 'hd') {
            return this.thumbnailHD
        }
        return this.thumbnail
    }

    public created() {
        this.observeImage()
    }

    public mounted() {
        this.observer = new IntersectionObserver(entries => {
            const image = entries[0]
            if (image.isIntersecting) {
                this.hasBeenInViewport = true
                if (this.observer) {
                    this.observer.disconnect()
                }
            }
        })

        this.observer.observe(this.$el)
    }

    public destroyed() {
        if (this.observer) {
            this.observer.disconnect()
        }
    }

    @Watch('thumbnail') public observeImage() {
        // new image; set to high quality
        this.quality = 'hd'
        this.loaded = false
    }

    public onLoad() {
        this.loaded = true // increases opacity
    }

    public onError() {
        this.quality = 'low' // failed to load high
    }
}
</script>
