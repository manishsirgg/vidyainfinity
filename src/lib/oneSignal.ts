const ONESIGNAL_SDK_SRC = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID as string | undefined;

declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: Array<(OneSignal: any) => void | Promise<void>>;
  }

  interface ImportMetaEnv {
    readonly VITE_ONESIGNAL_APP_ID?: string;
  }
}

let initializationPromise: Promise<void> | null = null;

export const isPushNotificationsConfigured = Boolean(ONESIGNAL_APP_ID);

export function isPushNotificationsSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

function loadOneSignalScript() {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    if (window.OneSignal) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-onesignal-sdk="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load the OneSignal SDK.')),
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.src = ONESIGNAL_SDK_SRC;
    script.defer = true;
    script.dataset.onesignalSdk = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load the OneSignal SDK.'));
    document.head.appendChild(script);
  });
}

async function withOneSignal<T>(callback: (OneSignal: any) => Promise<T> | T) {
  await loadOneSignalScript();
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  if (window.OneSignal) {
    return callback(window.OneSignal);
  }

  return new Promise<T>((resolve, reject) => {
    window.OneSignalDeferred?.push(async (OneSignal) => {
      try {
        resolve(await callback(OneSignal));
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function initializeOneSignal() {
  if (!isPushNotificationsConfigured || typeof window === 'undefined') {
    return false;
  }

  if (!initializationPromise) {
    initializationPromise = withOneSignal(async (OneSignal) => {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: window.location.hostname === 'localhost',
        serviceWorkerPath: '/OneSignalSDKWorker.js',
        autoRegister: false,
        notifyButton: {
          enable: false,
        },
      });
    });
  }

  await initializationPromise;
  return true;
}

export async function requestPushNotifications() {
  const didInitialize = await initializeOneSignal();

  if (!didInitialize) {
    throw new Error('Push notifications are not configured yet.');
  }

  return withOneSignal(async (OneSignal) => {
    await OneSignal.Notifications.requestPermission();
    return OneSignal.Notifications.permission ?? Notification.permission;
  });
}
