const ONESIGNAL_SDK_SRC =
  "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";

const ONESIGNAL_APP_ID =
  import.meta.env.VITE_ONESIGNAL_APP_ID as string | undefined;

declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
  }
}

let initialized = false;
let sdkLoadingPromise: Promise<void> | null = null;

function loadSDK() {
  if (sdkLoadingPromise) return sdkLoadingPromise;

  sdkLoadingPromise = new Promise<void>((resolve, reject) => {
    if (window.OneSignal) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="OneSignalSDK"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.src = ONESIGNAL_SDK_SRC;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject("OneSignal SDK failed to load");
    document.head.appendChild(script);
  });

  return sdkLoadingPromise;
}

export async function initOneSignal() {
  if (!ONESIGNAL_APP_ID) return;

  if (initialized) return;

  await loadSDK();

  window.OneSignalDeferred = window.OneSignalDeferred || [];

  return new Promise<void>((resolve) => {
    window.OneSignalDeferred.push(async function (OneSignal: any) {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        serviceWorkerPath: "/OneSignalSDKWorker.js",
        allowLocalhostAsSecureOrigin: true,
        notifyButton: { enable: false },
      });

      initialized = true;
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
