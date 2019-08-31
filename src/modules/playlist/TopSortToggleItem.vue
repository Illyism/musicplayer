<template>
  <div class="p-1 w-full">
    <popper
      trigger="hover"
      :options="{
        placement: 'top',
        modifiers: { offset: { offset: '0,10px' } }
      }"
    >
      <div
        class="popper z-10 bg-gray-900 border shadow-lg pointer-events-none py-1 px-2 text-sm rounded-lg"
        :class="popperClasses"
      >
        {{ title }}
      </div>

      <div
        class="h-6 w-full trans flex flex-col items-center justify-center rounded border bg-gray-900 text-white"
        slot="reference"
        :class="cardClasses"
        @click="$emit('onClick')"
      >
        <div class="text-sm font-bold uppercase leading-none">
          {{ id }}
        </div>
      </div>
    </popper>
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
export default class SortToggleItem extends Vue {
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
