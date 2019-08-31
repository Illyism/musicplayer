<template>
  <GridLayout
    class="opacity-50 pointer-events-none"
    :list="list"
  >
    <BottomCard
      slot-scope="{ index }"
      :title="randomString(index)"
      :description="randomString(index)"
    />
  </GridLayout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GridLayout from '@/layouts/GridLayout.vue'
import BottomCard from '@/components/BottomCard.vue'

@Component({
    components: {
        GridLayout,
        BottomCard,
    },
})
export default class LoadingCardGrid extends Vue {
    @Prop({ default: 9 }) public count!: number

    private get list() {
        const list = []
        for (let index = 0; index < this.count; index++) {
            list.push(index)
        }
        return list
    }

    private randomString(max: number) {
        let str = ''

        const count = 3 + (Math.random() * max)
        for (let index = 0; index < count; index++) {
            str += '.'
        }
        return str
    }
}

</script>
