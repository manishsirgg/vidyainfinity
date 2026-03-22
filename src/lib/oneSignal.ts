const ONESIGNAL_SDK_SRC =
  "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";

const ONESIGNAL_APP_ID =
  import.meta.env.VITE_ONESIGNAL_APP_ID as string | undefined;

declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
    __ONESIGNAL_INIT_DONE__?: boolean;
  }
}

let sdkPromise: Promise<void> | null = null;

function loadSDK() {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    if (window.OneSignal) {
      resolve();
      return;
    }

    const existing = document.querySelector(
      'script[src*="OneSignalSDK"]'
    );

    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.src = ONESIGNAL_SDK_SRC;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject("SDK load failed");
    document.head.appendChild(script);
  });

  return sdkPromise;
}

export async function initOneSignal() {
  if (!ONESIGNAL_APP_ID) return;

  if (window.__ONESIGNAL_INIT_DONE__) return;

  await loadSDK();

  window.OneSignalDeferred = window.OneSignalDeferred || [];

  return new Promise<void>((resolve) => {
    window.OneSignalDeferred!.push(async function (OneSignal: any) {

      if (window.__ONESIGNAL_INIT_DONE__) {
        resolve();
        return;
      }

      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        serviceWorkerPath: "/OneSignalSDKWorker.js",
        allowLocalhostAsSecureOrigin: true,
        notifyButton: { enable: false },
      });

      window.__ONESIGNAL_INIT_DONE__ = true;
      resolve();
    });
  });
}

export async function requestPushNotifications(): Promise<
  "granted" | "denied" | "default" | "already-subscribed"
> {
  await initOneSignal();

  return new Promise((resolve) => {
    window.OneSignalDeferred!.push(async function (OneSignal: any) {

      const optedIn = await OneSignal.User.PushSubscription.optedIn;

      if (optedIn) {
        resolve("already-subscribed");
        return;
      }

      await OneSignal.Notifications.requestPermission();

      const newOptIn = await OneSignal.User.PushSubscription.optedIn;

      if (newOptIn) {
        resolve("granted");
        return;
      }

      if (Notification.permission === "denied") {
        resolve("denied");
        return;
      }

      resolve("default");
    });
  });
}
