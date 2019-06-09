import IconsPlugin from '@/components/globalIcons'
import toastPlugin from '@/modules/toast/plugin'
import {
    disableOnPOSTRequest,
    disableOnPOSTResponse,
    toastOnErrors,
} from '@/utils/interceptors'
import axios from 'axios'
// @ts-ignore
import PortalVue from 'portal-vue'
import Vue from 'vue'
import Meta from 'vue-meta'
import MQ from 'vue-match-media/src'

export default function setupVueInstance() {
    // vendor plugins
    Vue.use(Meta)
    Vue.use(PortalVue)
    Vue.use(MQ)

    axios.defaults.baseURL = process.env.BASE_URL
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