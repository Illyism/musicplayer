<template>
    <div class="grid-layout">
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
                :key="item.id || index"
                class="p-2 h-32 w-full lg:w-1/2 xl:w-1/3"
            >
                <slot :item="item" :index="index" />
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex'
import { TweenLite, Back } from 'gsap/all'

const duration = 0.25

@Component({})
export default class GridLayout extends Vue {
    @Prop({ required: true }) public list!: any[]

    public get widthPerColumn() {
        if (this.$mq.xl) {
            return '33.33333333%'
        }
        if (this.$mq.lg) {
            return '50%'
        }
        return '100%'
    }

    private beforeEnter(el: HTMLElement) {
      el.style.opacity = '0'
      el.style.height = '0'
      el.style.width = '0'
      el.style.padding = '0'
    }

    private enter(el: HTMLElement, done: () => void) {
        setTimeout(() => {
            TweenLite.set(el, {
                opacity: 1,
                padding: '0.5rem',
                height: '8rem',
                width: this.widthPerColumn,
                ease: Back.easeOut,
                onComplete() {
                    el.style.removeProperty('width')
                    done()
                },
            })
            TweenLite.from(el, duration, {
                opacity: '0',
                height: '0',
                width: '0',
                padding: '0',
            })
        }, 100)
    }

    private leave(el: HTMLElement, done: () => void) {
        TweenLite.to(el, duration, {
            opacity: 0,
            height: 0,
            width: 0,
            padding: 0,
            ease: Back.easeOut,
            onComplete: done,
        })
    }
}
</script>

