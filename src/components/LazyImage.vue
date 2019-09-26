<template>
  <img
    :src="src"
    class="trans"
    :class="{ 'opacity-0': !loaded }"
    alt=""
    @load="onLoad"
    @error="onError"
  >
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class LazyImage extends Vue {
    @Prop() public thumbnailHD?: string
    @Prop() public thumbnail!: string

    public quality: 'hd' | 'low' = 'hd'
    public loaded = false

    public get src() {
        if (this.quality === 'hd') {
            return this.thumbnailHD
        }
        return this.thumbnail
    }

    public created() {
        this.observeImage()
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
        this.quality = 'low' // failed to low high
    }
}
</script>
