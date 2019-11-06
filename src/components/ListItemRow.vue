<template>
  <div
    class="p-2 border-l border-gray-800 text-white flex items-center cursor-pointer transition-fast ease-in-out transition-border"
    :class="{
      'text-gray-500 hover:text-gray-300 hover:border-primary-800': !isActive,
      'text-gray-100 border-primary-500 hover:border-primary-600': isActive
    }"
    @click="$emit('onClick')"
  >
    <div
      class="text-sm truncate flex-1"
      lang="en-US"
    >
      {{ title }}
    </div>
    <div
      v-if="description"
      class="text-xs truncate opacity-50"
    >
      {{ description }}
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ListItemRow extends Vue {
    @Prop({ required: true }) public title!: string
    @Prop() public description!: string
    @Prop({ default: false }) public isActive!: boolean
}
</script>
