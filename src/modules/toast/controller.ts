let timer: number

const controller = {
    data: {
        msg: {},
    },
    // Remove the toast msg from the data array
    hide() {
        controller.data.msg = {}
    },

    // internal use
    setTimer(timeOut: number) {
        if (timer) {
            window.clearTimeout(timer)
        }
        timer = window.setTimeout(() => {
            controller.hide()
        }, timeOut)
    },

    // Adds a toast message with a title, description and icon
    // Then automatically removes the file after timeOut time...
    show(msg: ToastMessage) {
        if (msg.timeOut == null) {
            msg.timeOut = 30000
        }
        controller.data.msg = msg
        if (msg.timeOut !== 0) {
            controller.setTimer(msg.timeOut)
        }
    },

    // On uncaught XHR exceptions
    showError(res: any) {
        console.log('Toast', res, res.response)
        const msg =
            res.response && res.response.data && res.response.data.message
                ? res.response.data.message
                : res.statusText
        controller.show({ title: 'Error', description: msg, color: 'red' })
    },
}

export interface ToastMessage {
    title: string
    description: string
    color: string
    timeOut?: number
}

export default controller