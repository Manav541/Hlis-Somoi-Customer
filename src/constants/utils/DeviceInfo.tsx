import DeviceInfo from 'react-native-device-info';

export const DeviceInfoManager = {
  // 🔹 Basic Sync Info
  getDeviceId: () => DeviceInfo.getDeviceId(), // "iPhone10,6"
  getDeviceType: () => DeviceInfo.getDeviceType(), // "Handset" | "Tablet" | "Tv" | "Desktop" | "unknown"
  getBrand: () => DeviceInfo.getBrand(), // "Apple", "Samsung"
  getModel: () => DeviceInfo.getModel(), // "iPhone X", "SM-G950F"
  getSystemName: () => DeviceInfo.getSystemName(), // "iOS", "Android"
  getSystemVersion: () => DeviceInfo.getSystemVersion(), // "14.4", "11"
  getBuildNumber: () => DeviceInfo.getBuildNumber(), // "89"
  getBundleId: () => DeviceInfo.getBundleId(), // "com.example.myapp"
  getAppName: () => DeviceInfo.getApplicationName(), // "My App"
  getVersion: () => DeviceInfo.getVersion(), // "1.0.1"
  getReadableVersion: () => DeviceInfo.getReadableVersion(), // "1.0.1 (89)"
  getUniqueId: () => DeviceInfo.getUniqueId(), // A unique device ID, "FCDBD8EF-62FC-4ECB-AAAA-80DA344E6A5E"
  isTablet: () => DeviceInfo.isTablet(), // true if the device is a tablet, otherwise false

  // 🔹 Async Info
  getBuildId: async () => await DeviceInfo.getBuildId(), // "20A5358e"
  getManufacturer: async () => await DeviceInfo.getManufacturer(), // "Apple", "Samsung"
  getDeviceName: async () => await DeviceInfo.getDeviceName(), // "John's iPhone"
  isEmulator: async () => await DeviceInfo.isEmulator(), // true if emulator/simulator, else false
  isPinOrFingerprintSet: async () => await DeviceInfo.isPinOrFingerprintSet(), // true if secure lock is set
  getCarrier: async () => await DeviceInfo.getCarrier(), // "Vodafone", "Airtel"
  getTotalMemory: async () => await DeviceInfo.getTotalMemory(), // in bytes, 4294967296
  getTotalDiskCapacity: async () => await DeviceInfo.getTotalDiskCapacity(), // in bytes, 128000000000
  getFreeDiskStorage: async () => await DeviceInfo.getFreeDiskStorage(), // in bytes, 64000000000
  getBatteryLevel: async () => await DeviceInfo.getBatteryLevel(), // 0 to 1 float, 0.85
  isBatteryCharging: async () => await DeviceInfo.isBatteryCharging(), // true if charging
  getMacAddress: async () => await DeviceInfo.getMacAddress(), // "02:00:00:00:00:00" (Android 6+ returns this default)
  getIpAddress: async () => await DeviceInfo.getIpAddress(), // "192.168.1.101"
  getInstallReferrer: async () => await DeviceInfo.getInstallReferrer(), // campaign ID or store referrer string
  isLocationEnabled: async () => await DeviceInfo.isLocationEnabled(), // true if location services enabled
  isHeadphonesConnected: async () => await DeviceInfo.isHeadphonesConnected(), // true if headphones are plugged in or connected via Bluetooth
};
