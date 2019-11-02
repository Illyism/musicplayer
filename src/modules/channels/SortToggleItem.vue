<template>
  <div class="p-2 flex-1">
    <div
      class="p-2 trans flex items-center justify-center rounded border bg-gray-900 text-white"
      :class="cardClasses"
      @click="$emit('onClick')"
    >
      <img
        :src="`/img/emoji/${image}.png`"
        :alt="id"
        class="h-4 inline-block w-auto mr-2"
        :class="{
          'opacity-50': !isActive  
        }"
      >
      <div class="text-xs font-bold tracking-widest uppercase">
        {{ id }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class SortToggleItem extends Vue {
    @Prop({ required: true }) public image!: string
    @Prop({ required: true }) public id!: string
    @Prop({ default: false }) public isActive!: boolean
    @Prop({}) public color!: string

    public get cardClasses() {
        if (this.isActive) {
            return `border-${this.color}-500 text-${this.color}-500 pointer-events-none`
        }
        return `border-gray-800 hover:border-gray-500 text-gray-700 hover:text-gray-500 cursor-pointer`
    }
}
</script>
