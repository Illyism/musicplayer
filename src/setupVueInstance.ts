import IconsPlugin from '@/components/globalIcons'
import toastPlugin from '@/modules/toast/plugin'
import {
    decache,
    disableOnPOSTRequest,
    disableOnPOSTResponse,
    toastOnErrors,
} from '@/utils/interceptors'
import axios from 'axios'
// @ts-ignore
import PortalVue from 'portal-vue'
import Vue from 'vue'
import Meta from 'vue-meta'

export default function setupVueInstance() {
    // vendor plugins
    Vue.use(Meta)
    Vue.use(PortalVue)

    if (process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = 'https://api.musicplayer.io'
    } else {
        axios.defaults.baseURL = process.env.BASE_URL
    }
    axios.interceptors.request.use(decache)
    axios.defaults.headers.post['X-TLC'] = '1'
    axios.interceptors.request.use(disableOnPOSTRequest)
    axios.interceptors.response.use(disableOnPOSTResponse)
    axios.interceptors.response.use((config) => config, toastOnErrors)

    // our plugins
    Vue.use(toastPlugin)

    // global components
    Vue.use(IconsPlugin)

    return Vue
}