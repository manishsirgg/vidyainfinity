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

function loadSDK() {
  return new Promise<void>((resolve, reject) => {
    if (window.OneSignal) return resolve();

    const script = document.createElement("script");
    script.src = ONESIGNAL_SDK_SRC;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}

export async function initOneSignal() {
  if (!ONESIGNAL_APP_ID) return;

  if (initialized) return;

  await loadSDK();

  window.OneSignalDeferred = window.OneSignalDeferred || [];

  window.OneSignalDeferred.push(async function (OneSignal: any) {
    await OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      serviceWorkerPath: "/OneSignalSDKWorker.js",
      allowLocalhostAsSecureOrigin: true,
      notifyButton: { enable: false },
    });

    initialized = true;
  });
}

export async function requestPushNotifications(): Promise<
  "granted" | "denied" | "default" | "already-subscribed"
> {
  await initOneSignal();

  return new Promise((resolve) => {
    window.OneSignalDeferred.push(async function (OneSignal: any) {
      const subscribed =
        await OneSignal.User.PushSubscription.optedIn;

      if (subscribed) {
        resolve("already-subscribed");
        return;
      }

      await OneSignal.Notifications.requestPermission();

      resolve(Notification.permission);
    });
  });
}
