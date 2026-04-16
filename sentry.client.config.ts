import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  replaysOnErrorSampleRate: 1.0,

  replaysSessionSampleRate: 0.1,

  environment: process.env.NODE_ENV,

  enabled: process.env.NODE_ENV === 'production' || process.env.SENTRY_ENABLED === 'true',

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Sentry] Event captured:', event);
    }
    return event;
  },

  ignoreErrors: [
    'NetworkError',
    'NavigatorGeolocation',
    'GeolocationPositionError',
  ],

  denyUrls: [
    /localhost/,
    /127\.0\.0\.1/,
  ],
});

export default Sentry;
