<template>
    <div
        class="flex items-stretch h-screen bg-black"
        v-resize="handleResize"
        :class="{
            'flex-row': isHorizontalOrientation,
            'flex-col': !isHorizontalOrientation
        }"
    >
            <div class="flex-1">
                <slot name="main" />
            </div>

            <div
                v-show="!isHorizontalOrientation || isMenuOpen"
                class="h-screen overflow-y-scroll"
                :class="{
                    'w-1/3': isHorizontalOrientation,
                    'w-full flex-1': !isHorizontalOrientation
                }"
            >
                <slot name="side" />
            </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class'
import elementSize, { ResizeState } from '@/plugins/elementSize'
import store from '@/store';

@Component({
  directives: {
    resize: elementSize,
  },
  watch: {
      isHorizontalOrientation(value) {
          store.dispatch('SET_ORIENTATION', value)
      },
  },
})
export default class OrientationLayout extends Vue {
    @State public isMenuOpen!: boolean
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
