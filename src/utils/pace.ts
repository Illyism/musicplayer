export default {
    install() {
        require('./pace.pkg.js')
        // @ts-ignore
        window.Pace.start({
            restartOnRequestAfter: true,
            restartOnPushState: false,
            ajax: {
                trackMethods: ['GET', 'POST'],
                ignoreURLs: ['zendesk.com', 'pusher.com', /intercom/],
                trackWebSockets: 0,
            },
        })
    },
}
