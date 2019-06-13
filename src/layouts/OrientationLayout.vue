<template>
    <div
        class="flex items-stretch h-screen bg-black"
        v-resize="handleResize"
        :class="{
            'flex-row': this.isHorizontalOrientation,
            'flex-col': !this.isHorizontalOrientation
        }"
    >
            <div class="flex-1">
                <slot name="main" />
            </div>

            <div
                class="h-screen overflow-y-scroll"
                :class="{
                    'w-1/3': this.isHorizontalOrientation,
                    'w-full flex-1': !this.isHorizontalOrientation
                }"
            >
                <slot name="side" />
            </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import elementSize, { ResizeState } from '@/plugins/elementSize'

@Component({
  directives: {
    resize: elementSize,
  },
})
export default class OrientationLayout extends Vue {
    public containerWidth: number = 0
    public containerHeight: number = 0

    public get isHorizontalOrientation() {
        return this.containerWidth > this.containerHeight
    }

    private handleResize({ width, height }: ResizeState) {
        this.containerWidth = width
        this.containerHeight = height
    }
}
</script>
