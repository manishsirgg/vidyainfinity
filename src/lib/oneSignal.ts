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

export type PushSupportState = {
  enabled: boolean;
  reason?: string;
};

let initializationPromise: Promise<void> | null = null;

export const isPushNotificationsConfigured = Boolean(ONESIGNAL_APP_ID);

export function getPushNotificationsSupport(): PushSupportState {
  if (typeof window === 'undefined') {
    return {
      enabled: false,
      reason: 'Browser alerts can only be enabled from a web browser.',
    };
  }

  if (!window.isSecureContext && window.location.hostname !== 'localhost') {
    return {
      enabled: false,
      reason: 'Push notifications require HTTPS in production.',
    };
  }

  if (!('Notification' in window)) {
    return {
      enabled: false,
      reason: 'This browser does not support the Notifications API.',
    };
  }

  if (!('serviceWorker' in navigator)) {
    return {
      enabled: false,
      reason: 'This browser does not support service workers.',
    };
  }

  if (!('PushManager' in window)) {
    return {
      enabled: false,
      reason: 'This browser does not support the Push API.',
    };
  }

  return { enabled: true };
}

function normalizePermission(value: unknown): NotificationPermission {
  return value === 'granted' || value === 'denied' ? value : 'default';
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

  const support = getPushNotificationsSupport();

  if (!support.enabled) {
    return false;
  }

  if (!initializationPromise) {
    initializationPromise = withOneSignal(async (OneSignal) => {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: window.location.hostname === 'localhost',
        serviceWorkerPath: '/OneSignalSDKWorker.js',
        autoRegister: true, // ⭐ IMPORTANT FIX
        notifyButton: {
          enable: false,
        },
      });
    });
  }

  await initializationPromise;
  return true;
}

export async function requestPushNotifications(): Promise<NotificationPermission> {
  const didInitialize = await initializeOneSignal();

  if (!didInitialize) {
    throw new Error('Push notifications are not configured or supported yet.');
  }

  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return Notification.permission;
  }

  return withOneSignal(async (OneSignal) => {
    await OneSignal.Notifications.requestPermission();
    return normalizePermission(Notification.permission);
  });
}
