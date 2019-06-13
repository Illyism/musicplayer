<template>
    <div class="grid-layout" v-resize="handleResize">
        <transition-group
            name="staggered-fade"
            class="flex flex-wrap"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
        >
            <div
                v-for="(item, index) in list"
                :key="index"
                class="p-2 h-32"
                :style="{ width: widthPerColumn }"
            >
                <slot :item="item" :index="index" />
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex'
import { TweenLite, Back, CSSPlugin, AttrPlugin } from 'gsap/all'
import elementSize, { ResizeState } from '@/plugins/elementSize'
const fixActivationTreeShake = { TweenLite, Back, CSSPlugin, AttrPlugin }

const duration = 0.5

@Component({
    directives: {
        resize: elementSize,
    },
})
export default class GridLayout extends Vue {
    @Prop({ required: true }) public list!: any[]
    public containerWidth: number = 0

    public get widthPerColumn() {
        const columnSize = 130
        const columnsCount = this.containerWidth / columnSize
        const maxColumnsCount = Math.floor(columnsCount)
        return (100 / maxColumnsCount) + '%'
    }

    private handleResize({ width }: ResizeState) {
        this.containerWidth = width
    }

    private beforeEnter(el: HTMLElement) {
      el.style.opacity = '0'
    }

    private enter(el: HTMLElement, done: () => void) {
        TweenLite.set(el, {
            opacity: 1,
            ease: Back.easeOut,
            onComplete: done,
        })

        TweenLite.from(el, duration, {
            opacity: '0',
        })
    }

    private leave(el: HTMLElement, done: () => void) {
        TweenLite.to(el, duration, {
            opacity: 0,
            ease: Back.easeOut,
            onComplete: done,
        })
    }
}
</script>

