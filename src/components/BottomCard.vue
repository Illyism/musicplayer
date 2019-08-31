<template>
  <div
    class="overflow-hidden h-full p-2 rounded border border-gray-800 bg-gray-900 text-white flex flex-col justify-end cursor-pointer trans"
    :class="{
      'hover:border-primary-800': !isActive,
      'border-primary-500 hover:border-primary-600': isActive
    }"
    @click="$emit('onClick')"
  >
    <div
      v-if="description"
      class="text-xs truncate text-gray-500"
      :class="descriptionClass"
    >
      {{ description }}
    </div>
    <div
      class="text-sm truncate text-gray-100"
      :class="titleClass"
      lang="en-US"
    >
      {{ title }}
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class BottomCard extends Vue {
    @Prop({ required: true }) public title!: string
    @Prop() public description!: string

    @Prop({}) public titleClass!: string
    @Prop({}) public descriptionClass!: string

    @Prop({ default: false }) public isActive!: boolean
}
</script>
