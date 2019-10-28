<template>
   <div class="flex items-center">
        <IconCastConnected
            v-if="currentConnection"
            class="cursor-pointer text-3xl trans opacity-75 hover:opacity-100"
            @click="terminate"
        />
        <IconCast
            v-else
            class="cursor-pointer text-3xl trans opacity-75 hover:opacity-100"
            @click="start"
        />
   </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class PresentationControl extends Vue {
    public currentConnection: any
    public request: any

    public created() {
        // @ts-ignore
        this.request = new PresentationRequest(['/cast'])
    }

    public async start() {
        this.currentConnection = await this.request.start()
    }

    public terminate() {
        if (!this.currentConnection) {
            return
        }
        this.currentConnection.terminate()
    }
}
</script>
