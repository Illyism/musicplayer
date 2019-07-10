const icons = [
    require('vue-material-design-icons/Home.vue'),
    require('vue-material-design-icons/Close.vue'),
    require('vue-material-design-icons/Youtube.vue'),
    require('vue-material-design-icons/Play.vue'),
    require('vue-material-design-icons/Magnify.vue'),
    require('vue-material-design-icons/Pause.vue'),
    require('vue-material-design-icons/SkipNext.vue'),
    require('vue-material-design-icons/SkipPrevious.vue'),
    require('vue-material-design-icons/VolumeVariantOff.vue'),
    require('vue-material-design-icons/VolumeLow.vue'),
    require('vue-material-design-icons/VolumeMedium.vue'),
    require('vue-material-design-icons/VolumeHigh.vue'),
    require('vue-material-design-icons/Fullscreen.vue'),
    require('vue-material-design-icons/Menu.vue'),
    require('vue-material-design-icons/ArrowUpBold.vue'),
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