import {AppState} from 'react-native';

export const OTPManager = {
  resendOtpStartTimerReverse: (
    otp: number,
    setOtp: (val: number) => void,
    setResendOtp: (val: boolean) => void,
    timerRef: any,
    startTimeRef: any,
    appStateRef: any,
  ) => {
    // Clear interval if already exists for clearing all previous values
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Sets value to the otp and set the timer to start
    setOtp(otp);
    setResendOtp(true); // Make default to true
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = otp - elapsed;

      if (remaining > 0) {
        setOtp(remaining);
      } else {
        clearInterval(timerRef.current);
        setOtp(0);
        setResendOtp(false);
      }
    }, 1000);

    //  Listen for app state changes
    AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const remaining = otp - elapsed;
        setOtp(Math.max(0, remaining));
        if (remaining <= 0) {
          setResendOtp(false);
          clearInterval(timerRef.current);
        }
      }
      appStateRef.current = nextAppState;
    });
  },

  resendOtpStartTimerForward: (
    maxTime: number,
    setOtp: (val: number) => void,
    setResendOtp: (val: boolean) => void,
    timerRef: any,
    startTimeRef: any,
    appStateRef: any,
  ) => {
    // Clear interval if already exists for clearing all previous values
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Sets value to the otp and set the timer to start
    setOtp(1);
    setResendOtp(true); // Make default to true
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const current = 1 + elapsed;

      if (current < maxTime) {
        setOtp(current);
      } else {
        clearInterval(timerRef.current);
        setOtp(maxTime);
        setResendOtp(false);
      }
    }, 1000);

    //  Listen for app state changes
    AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const current = 1 + elapsed;
        setOtp(Math.min(current, maxTime));
        if (current >= maxTime) {
          setResendOtp(false);
          clearInterval(timerRef.current);
        }
      }
      appStateRef.current = nextAppState;
    });
  },
};
