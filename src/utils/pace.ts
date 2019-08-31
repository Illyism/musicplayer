
declare let Pace: any; // Magic

export default {
    install() {
        require('./pace.pkg.js')
        Pace.start({
            restartOnRequestAfter: true,
            restartOnPushState: false ,
            ajax: {
                trackMethods: ['GET', 'POST'],
                ignoreURLs: ['zendesk.com', 'pusher.com', /intercom/],
                trackWebSockets: 0,
            },
        })
    },
}
