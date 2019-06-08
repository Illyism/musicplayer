<template>
    <div class="flex flex-wrap">
        <div
            v-for="(item, index) in list"
            :key="item.id || index"
            class="p-2 w-full lg:w-1/2 xl:w-1/3"
        >
            <slot :item="item" :index="index" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex'

@Component({})
export default class GridLayout extends Vue {
    @Prop({ required: true }) public list!: any[]
}
</script>
