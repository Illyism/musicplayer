<template>
  <div class="list-layout">
    <transition-group
      v-if="isAnimated"
      name="fade"
    >
      <div
        v-for="(item, index) in list"
        :key="index + 0"
        class="list-layout-column"
        :class="columnClasses"
      >
        <slot
          :item="item"
          :index="index"
        />
      </div>
    </transition-group>

    <template v-else>
      <div
        v-for="(item, index) in list"
        :key="item.id || index + 0"
        class="list-layout-column"
        :class="columnClasses"
      >
        <slot
          :item="item"
          :index="index"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ListLayout extends Vue {
    @Prop({ required: true }) public list!: any[]
    @Prop({ default: false }) public isAnimated!: boolean
    @Prop({ default: '' }) public columnClasses!: string

    private beforeEnter(el: HTMLElement) {
      el.style.opacity = '0'
    }
}
</script>

