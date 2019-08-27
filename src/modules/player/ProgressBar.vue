<template>
   <div class="w-full h-full flex items-center justify-center text-xs xs:text-base">
       <div>{{ progressCurrent | formatSeconds }}</div>
       <div class="relative w-full h-2 mx-4 pointer-events-auto"
            @click.prevent.stop="onSliderClick"
            ref="slider"
            role="slider"
            :aria-valuemin="0"
            :aria-value="progressCurrent"
            :aria-valuemax="progressDuration"
        >
            <div class="absolute w-full h-full rounded-full bg-gray-900"></div>
            <div
                class="absolute h-full rounded-full bg-gray-800"
                :style="progressLoadedStyles"
            ></div>
            <div
                class="absolute h-full rounded-full bg-yellow-600"
                :style="progressCurrentStyles"
            ></div>

            <ProgressSliderButton
                :value="progressCurrent"
                ref="progressSliderButton"
                :dragging="dragging"
                :hovering="hovering"
                :style="circleCurrentStyle"
                @onHoveringChanged="onHoveringChanged"
                @onButtonDown="onButtonDown"
            />
       </div>
       <div>{{ progressDuration | formatSeconds }}</div>
   </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import PlayersController from './PlayersController'
import formatSeconds from './util/formatSeconds'
import ProgressSliderButton from './ProgressSliderButton.vue'

@Component({
    components: {
        ProgressSliderButton,
    },
    filters: {
        formatSeconds,
    },
})
export default class ProgressBar extends Vue {
    @State public progressDuration!: number
    @State public progressCurrent!: number
    @State public progressLoaded!: number

    private dragging = false
    private sliderWidth = 1
    private step = 5 // 5 seconds
    private hovering = false

    public draggingCurrentX = 0
    public draggingStartX = 0
    public draggingStartPercentage = 0
    public draggingCurrentPercentage = 0

    public get progressLoadedStyles() {
        return {
            width: `${this.progressLoaded * 100}%`,
        }
    }

    public get progressCurrentStyles() {
        return {
            width: `${this.progressCurrentPercentage * 100}%`,
        }
    }

    public get circleCurrentStyle() {
        return {
            left: `${this.progressCurrentPercentage * 100}%`,
        }
    }

    public get progressCurrentPercentage() {
        if (this.dragging) {
            return this.draggingCurrentPercentage
        }
        return this.getPercentageForSeconds(this.progressCurrent)
    }

    public mounted() {
        this.resetSize();
        window.addEventListener('resize', this.resetSize)
        window.addEventListener('mousemove', this.onDragging)
        window.addEventListener('touchmove', this.onDragging)
        window.addEventListener('mouseup', this.onDragEnd)
        window.addEventListener('touchend', this.onDragEnd)
        window.addEventListener('contextmenu', this.onDragEnd)
    }

    public beforeDestroy() {
        window.removeEventListener('resize', this.resetSize)
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('touchmove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
        window.removeEventListener('touchend', this.onDragEnd)
        window.removeEventListener('contextmenu', this.onDragEnd)
    }

    public onSliderClick(ev: MouseEvent) {
        if (this.dragging) {
            return
        }
        const percentage = this.getClickPositionInPercentage(ev)
        this.setPositionByPercentage(percentage)
    }

    public resetSize() {
        if (!this.$refs.slider) {
            return
        }
        const $slider = this.$refs.slider as HTMLElement
        this.sliderWidth = $slider.clientWidth
    }

    public getClickPositionInPercentage({ clientX }: MouseEvent) {
        this.resetSize()
        const $slider = this.$refs.slider as HTMLElement
        const sliderOffsetLeft = $slider.getBoundingClientRect().left
        return (clientX - sliderOffsetLeft) / this.sliderWidth
    }

    public getSecondsForPercentage(percentage: number) {
        if (this.step) {
            // round to the nearest tick if step is set
            return Math.round((percentage * this.progressDuration) / this.step) * this.step
        }
        return percentage * this.progressDuration
    }

    public setPositionByPercentage(percentage: number) {
        const clickedSeconds = this.getSecondsForPercentage(percentage)
        this.trySeekTo(clickedSeconds)
    }

    public trySeekTo(seconds: number, allowSeekAhead = !this.dragging) {
        if (seconds < 0) {
            console.error('Tried to set upperBounds lower than lowerBounds')
            return
        }
        if (seconds > this.progressDuration) {
            this.seekTo(this.progressDuration, allowSeekAhead)
            return
        }
        if (isNaN(seconds)) {
            console.error('RangeSlider: Tried to set NaN')
            return
        }
        this.seekTo(seconds, allowSeekAhead)
    }

    // always use trySeekTo in public code
    public seekTo(seconds: number, allowSeekAhead: boolean) {
        PlayersController.seekTo(seconds, allowSeekAhead)
    }

    public onHoveringChanged(isHovering: boolean) {
        this.hovering = isHovering
    }

    public isTouchEvent(ev: MouseEvent | TouchEvent): ev is TouchEvent {
        const touchEvent = ev as TouchEvent
        if (touchEvent.touches && touchEvent.touches.length > 0 && touchEvent.touches[0]) {
            return true
        }
        return false
    }

    public getClientX(ev: TouchEvent | MouseEvent) {
        if (this.isTouchEvent(ev)) {
            return ev.touches[0].clientX
        }
        return ev.clientX
    }

    public onButtonDown(ev: MouseEvent | TouchEvent) {
        this.dragging = true
        this.draggingStartX = this.getClientX(ev)
        this.draggingStartPercentage = this.getPercentageForSeconds(this.progressCurrent)
        this.setDraggingCurrentPercentage(this.draggingStartPercentage)
    }

    public setDraggingCurrentPercentage(percentage: number) {
        // constrain percentage by "step" and slider bounds
        percentage = this.getPercentageForSeconds(this.getSecondsForPercentage(percentage))
        this.draggingCurrentPercentage = percentage
        this.trySeekTo( this.getSecondsForPercentage(percentage) )
    }

    public getPercentageForSeconds(seconds: number) {
        const percentage = seconds / this.progressDuration
        if (percentage < 0) {
            return 0
        }
        if (percentage > 1) {
            return 1
        }
        return percentage
    }

    public onDragging(ev: TouchEvent | MouseEvent) {
        if (!this.dragging) {
            return
        }

        this.draggingCurrentX = this.getClientX(ev)
        const diffInPercentage = (this.draggingCurrentX - this.draggingStartX) / this.sliderWidth
        this.setDraggingCurrentPercentage(this.draggingStartPercentage + diffInPercentage)
    }

    public async onDragEnd() {
        if (!this.dragging) {
            return
        }

        const newSeconds = this.getSecondsForPercentage(this.draggingCurrentPercentage)
        this.trySeekTo( newSeconds, true )
        await this.$nextTick()

        this.dragging = false
        this.draggingStartX = 0
        this.draggingCurrentX = 0
        this.draggingStartPercentage = 0
        this.draggingCurrentPercentage = 0
    }
}
</script>
