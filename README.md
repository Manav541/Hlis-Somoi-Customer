# SomoiCustomer

## 📖 Getting Started
SomoiCustomer is a React Native mobile application built using the company’s boilerplate.  
It uses **Zustand** for central state management, where all APIs are registered and stored in the project’s `store` folder.  
This document provides setup instructions, usage, and troubleshooting guidelines.

---

## 📑 Table of Contents
1. [Project Information](#-project-information)  
2. [Installation](#️-installation)  
3. [Running the Application](#-running-the-application)  
4. [Troubleshooting](#-troubleshooting)  

---

## 📝 Project Information
- **Technology**: React Native CLI  
- **Project Version**: 0.79.1  
- **Node Version**: 23.11.0  
- **Structure/Architecture**: Company’s Boilerplate  
- **Android Studio**: Meerkat | 2024.3.1 Patch 2  
- **Xcode**: 16.2  
- **State Management**: Zustand  
- **iOS Development Certificates**: Located inside the project’s **ios/** folder  

🔹 All APIs are registered in Zustand and located in the project’s **store** folder.

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RMC-Somoi/SomoiCustomer.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   If you face issues with peer dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install required Pods for iOS**
   ```bash
   cd ios
   pod install
   cd ..
   ```

---

## 🚀 Running the Application

1. **Start the Metro Bundler**
   ```bash
   npx react-native start
   ```

2. **Run project on iOS**
   ```bash
   npx react-native run-ios
   ```

3. **Run project on Android**
   ```bash
   npx react-native run-android
   ```

---

## 🔧 Troubleshooting

### Emoji Picker Fix
If using `react-native-emoji-selector`, make the following changes:

- Navigate to:  
  `node_modules/react-native-emoji-selector/index.js`
- On **line 95**, remove `tabSize` from `fontSize`.  
- Change:
  ```js
  fontSize: 24
  ```
  to:
  ```js
  fontSize: 16
  ```
  ✅ A static `fontSize: 16` works after removing `tabSize`.

---

### Pod Installation Errors
If you encounter errors while installing pods, try the following:
```bash
pod deintegrate
rm -rf Podfile.lock
pod repo update
pod install
