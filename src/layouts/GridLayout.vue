<template>
    <div class="grid-layout" v-resize="handleResize">
        <transition-group
            v-if="isAnimated"
            name="fade"
            class="flex flex-wrap"
        >
            <div
                v-for="(item, index) in list"
                :key="index + 0"
                class="p-2 h-32"
                :style="{ width: widthPerColumn }"
            >
                <slot :item="item" :index="index" />
            </div>
        </transition-group>

        <div v-else class="flex flex-wrap">
            <div
                v-for="(item, index) in list"
                :key="item.id || index + 0"
                class="p-2 h-32"
                :style="{ width: widthPerColumn }"
            >
                <slot :item="item" :index="index" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex'
import elementSize, { ResizeState } from '@/plugins/elementSize'

const duration = 0.5

@Component({
    directives: {
        resize: elementSize,
    },
})
export default class GridLayout extends Vue {
    @Prop({ required: true }) public list!: any[]
    @Prop() public isAnimated = false
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
}
</script>

