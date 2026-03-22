import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { BellRing } from 'lucide-react';

import {
  getPushNotificationsSupport,
  isPushNotificationsConfigured,
  requestPushNotifications,
} from '../lib/oneSignal';

const PushNotifications: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportState = useMemo(() => {
    if (!isPushNotificationsConfigured) {
      return {
        enabled: false,
        message: 'Browser alerts will go live after the OneSignal keys are added in Vercel.',
      };
    }

    const pushSupport = getPushNotificationsSupport();

    if (!pushSupport.enabled) {
      return {
        enabled: false,
        message: pushSupport.reason ?? 'This browser does not support web push notifications.',
      };
    }

    return {
      enabled: true,
      message: 'Enable browser alerts for new blogs, application deadlines, and marketing campaigns.',
    };
  }, []);

  const handleEnableNotifications = useCallback(async () => {
    if (!supportState.enabled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const permission = await requestPushNotifications();

      if (permission === 'granted') {
        toast.success('Push notifications enabled successfully.');
        return;
      }

      if (permission === 'denied') {
        toast.error('Notifications are blocked in this browser.');
        return;
      }

      toast('Notification permission was dismissed.', {
        icon: '🔔',
      });
    } catch (error) {
      console.error('Push notification setup failed:', error);
      toast.error('Unable to enable browser alerts right now.');
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, supportState.enabled]);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-full bg-blue-50 p-2 text-blue-900">
          <BellRing size={18} />
        </div>

        <div className="space-y-3">
          <div>
            <h5 className="text-sm font-semibold text-slate-900">
              Browser Alerts
            </h5>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {supportState.message}
            </p>
          </div>

          <button
            type="button"
            onClick={handleEnableNotifications}
            disabled={!supportState.enabled || isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? 'Enabling…' : 'Enable Push Alerts'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PushNotifications;
