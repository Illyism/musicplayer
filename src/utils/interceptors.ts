import controller from '@/modules/toast/controller'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export function disableOnPOSTRequest(config: AxiosRequestConfig) {
    if (config.method === 'POST') {
        document.body.classList.add('disable-buttons')
        controller.hide()
    }
    return config
}

export function disableOnPOSTResponse(config: AxiosResponse) {
    document.body.classList.add('disable-buttons')
    return config
}

export function toastOnErrors(error: any) {
    controller.showError(error)
    return Promise.reject(error)
}