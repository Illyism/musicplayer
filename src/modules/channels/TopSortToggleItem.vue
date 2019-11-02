<template>
  <div
    class="flex-1 mx-1 p-1 flex flex-col items-center justify-center rounded border bg-gray-900 text-white"
    slot="reference"
    :class="cardClasses"
    @click="$emit('onClick')"
  >
    <div class="text-xs font-bold leading-none">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Popper from 'vue-popperjs'

@Component({
    components: {
        Popper,
    },
})
export default class TopSortToggleItem extends Vue {
    @Prop({ required: true }) public id!: string
    @Prop({ required: true }) public title!: string
    @Prop({ default: false }) public isActive!: boolean
    @Prop({}) public color!: string

    public get cardClasses() {
        if (this.isActive) {
            return `border-${this.color} text-${this.color} pointer-events-none`
        }
        return `border-gray-800 hover:border-gray-500 text-gray-700 hover:text-gray-500 cursor-pointer`
    }

    public get popperClasses() {
        return `border-${this.color} text-${this.color}`
    }
}
</script>
