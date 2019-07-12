import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://811bdb2b59a944c28f00c69835cba65b@sentry.io/1503448',
        integrations: [new Integrations.Vue({ Vue, attachProps: true })],
    })
}
