import { DirectiveOptions } from 'vue';

export interface ResizeElement extends HTMLElement {
    _onResize: {
        callback: any,
        options: any,
    }
}

export interface ResizeState extends HTMLElement {
    width: number
    height: number
}

const directive: DirectiveOptions = {
    inserted(el, binding) {
        const resizeEl = el as ResizeElement
        const callback = binding.value
        const options = { passive: true }

        function onUpdate() {
            const width = resizeEl.clientWidth
            const height = resizeEl.clientHeight
            callback({ width, height } as ResizeState)
        }

        window.addEventListener('resize', onUpdate, options)
        resizeEl._onResize = {
            callback,
            options,
        }

        if (!binding.modifiers || !binding.modifiers.quiet) {
            onUpdate()
        }
    },
    unbind(el) {
        const resizeEl = el as ResizeElement
        const { callback, options } = resizeEl._onResize

        window.removeEventListener('resize', callback, options)
        delete resizeEl._onResize
    },
}

export default directive