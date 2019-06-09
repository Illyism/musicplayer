import store, { State } from '@/store'
import { MutationPayload } from 'vuex';

export default class StoreListener {
    protected on: {[key: string]: (state: State) => void } = {}

    constructor() {
        store.subscribe(this.onStoreMutation.bind(this))
    }

    private onStoreMutation({ type }: MutationPayload, state: State ) {
        if (this.on[type]) {
            this.on[type].call(this, state)
        }
    }
}