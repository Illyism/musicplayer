<template>
    <div
        class="absolute h-4 w-4 -ml-1 -mt-1 rounded-full bg-yellow-600 cursor-grab"

        @mouseenter.prevent.stop="handleMouseEnter"
        @mouseleave.prevent.stop="handleMouseLeave"
        @mousedown.prevent.stop="onButtonDown"
        @touchstart.prevent.stop="onButtonDown"

        :class="{ 'hover': hovering, 'dragging': dragging }"
    ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import PlayersController from './PlayersController'

@Component({
})
export default class ProgressSliderButton extends Vue {
    @Prop({ default: 0 }) public value!: number
    @Prop({ default: false }) public dragging!: boolean
    @Prop({ default: false }) public hovering!: boolean

    public onButtonDown($event: MouseEvent | TouchEvent) {
        this.$emit('onButtonDown', $event)
    }
    public handleMouseEnter() {
        this.$emit('onHoveringChanged', true)
    }
    public handleMouseLeave() {
        this.$emit('onHoveringChanged', false )
    }
}
</script>
