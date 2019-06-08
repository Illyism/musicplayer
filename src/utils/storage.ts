let usePolyfill = false

try {
    // Info: https://github.com/Modernizr/Modernizr/blob/94a690127904ed7d85679970257e76f3528b4b1c/modernizr.js#L777-802
    window.localStorage.setItem('fcl.test', '1')
    window.localStorage.removeItem('fcl.test')
} catch (e) {
    if (process.env.NODE_ENV === 'production') {
        console.warn('USING STORAGE POLYFILL')
    }
    usePolyfill = true
}

export default {
    data: {} as { [key: string]: string },
    setItem(id: string, val: string) {
        if (usePolyfill) {
            this.data[id] = val
        } else {
            window.localStorage.setItem(id, val)
        }
    },
    getItem(id: string) {
        if (usePolyfill) {
            return this.data[id]
        } else {
            return window.localStorage.getItem(id)
        }
    },
    removeItem(id: string) {
        if (usePolyfill) {
            delete this.data[id]
        } else {
            window.localStorage.removeItem(id)
        }
    },
    clear() {
        if (usePolyfill) {
            this.data = {}
        } else {
            window.localStorage.clear()
        }
    },
}