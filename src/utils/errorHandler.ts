import Raven from 'raven-js'
import Vue from 'vue'

export function installSentry() {
    if (process.env.NODE_ENV !== 'production') {
        return
    }

    // this is included in the built file - no need to hide it in env vars for now
    Raven.config('https://811bdb2b59a944c28f00c69835cba65b@sentry.io/1503448', {
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        release: '1.0.0',
        tags: {
            platform: 'musicplayer-io',
        },
        captureUnhandledRejections: true,
    }).install()
}

function formatComponentName(vm?: Vue) {
    if (!vm) {
        return 'code'
    }

    if (vm.$root === vm) {
        return 'root instance'
    }

    // @ts-ignore
    let name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name

    if (name) {
        name = `<${name}>`
    } else {
        name = 'anonymous component'
    }

    // @ts-ignore
    const fileName = vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : ''

    if (fileName) {
        return `${name} at ${fileName}`
    }

    return name
}

export function installVueErrorHandler() {
    Vue.config.errorHandler = (error, vm, info) => {
        if (process.env.NODE_ENV === 'production') {
            Raven.captureException(error, {
                extra: {
                    componentName: formatComponentName(vm),
                    errorType: info,
                },
            })
        }

        console.log(
            '%c %s%c %s\n',
            'background: #222; color: #bada55',
            formatComponentName(vm),
            'background: #222; color: #00FF00',
            info,
            error,
        )
    }
}