import * as Sentry from '@sentry/react-native';
// eslint-disable-next-line import/prefer-default-export
export const setupSentry = async () => {
  const token = "https://431ae41749f45853ad04f2746e20f2f0@o4509723310686208.ingest.us.sentry.io/4509727911641088"
  
  Sentry.init({
    dsn: token,
    debug: true,
    sendDefaultPii: true,
    tracesSampleRate: 1.0
  });
  
};
 