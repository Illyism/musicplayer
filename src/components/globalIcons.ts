const icons = [
    require('vue-material-design-icons/Home.vue'),
    require('vue-material-design-icons/Close.vue'),
    require('vue-material-design-icons/Youtube.vue'),
    require('vue-material-design-icons/Magnify.vue'),
    require('vue-material-design-icons/Pause.vue'),
]
import { VueConstructor } from 'vue'

/**
 * Set up global components, so we don't have to import them in every file
 */
export default {
    install(Vue: VueConstructor) {
        for (const iconRequire of icons) {
            const component = iconRequire.default
            Vue.component(formatName(component.name), component)
        }
    },
}

function formatName(iconName: string) {
    return `Icon${iconName.replace('Icon', '')}`
}