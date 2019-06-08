
import Toast from '@/modules/toast/controller.ts'
import { VueConstructor } from 'vue'

export default {
    install(Vue: VueConstructor) {
        Object.defineProperty(Vue.prototype, '$toast', {
            get() {
                return Toast
            },
        })
    },
}