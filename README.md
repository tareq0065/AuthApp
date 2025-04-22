# AuthApp

A React Native CLI application demonstrating Login & Signup flows using:
- React Context API for auth state
- React Navigation for screen management
- AsyncStorage for persistence
- Animated API for simple screen animations
- Password visibility toggle

## Setup

```bash
git clone <this-repo-url>
cd AuthApp
yarn install
cd ios && pod install && cd ..
npx react-native run-ios   # or run-android
```

## Features


1. Login / Signup with form validation
2. AuthContext providing login, signup, logout, and user state
3. AsyncStorage-backed persistence
4. Screen animations via React Native’s Animated API
5. Password visibility toggle 🕶️

## Bonus features
1. Added Detox for visual testing
2. Automatic screenshots and video generation (FFMPEG Must be installed) while testing using detox. 

### iOS Screenshots

| 01_SignupScreen.png<br><img src="files/ios/01_SignupScreen.png" width="200" /> | 02_Signup_Error_Required.png<br><img src="files/ios/02_Signup_Error_Required.png" width="200" /> | 03_Signup_Error_InvalidEmail.png<br><img src="files/ios/03_Signup_Error_InvalidEmail.png" width="200" /> | 04_Signup_Error_ShortPassword.png<br><img src="files/ios/04_Signup_Error_ShortPassword.png" width="200" /> |
|:---:|:---:|:---:|:---:|
| 05_Home_After_Signup.png<br><img src="files/ios/05_Home_After_Signup.png" width="200" /> | 06_Login_After_Logout.png<br><img src="files/ios/06_Login_After_Logout.png" width="200" /> | 07_Login_Error_InvalidEmail.png<br><img src="files/ios/07_Login_Error_InvalidEmail.png" width="200" /> | 08_Login_Error_WrongCreds.png<br><img src="files/ios/08_Login_Error_WrongCreds.png" width="200" /> |
| 09_Home_After_Login.png<br><img src="files/ios/09_Home_After_Login.png" width="200" /> | 10_Login_Final.png<br><img src="files/ios/10_Login_Final.png" width="200" /> |  |  |

---

#### iOS Flow Preview

<p align="center">
  <img src="files/ios/ios.gif" width="400" alt="iOS Flow Preview" />
</p>

---

### Android Screenshots

| 01_SignupScreen.png<br><img src="files/android/01_SignupScreen.png" width="200" /> | 02_Signup_Error_Required.png<br><img src="files/android/02_Signup_Error_Required.png" width="200" /> | 03_Signup_Error_InvalidEmail.png<br><img src="files/android/03_Signup_Error_InvalidEmail.png" width="200" /> | 04_Signup_Error_ShortPassword.png<br><img src="files/android/04_Signup_Error_ShortPassword.png" width="200" /> |
|:---:|:---:|:---:|:---:|
| 05_Home_After_Signup.png<br><img src="files/android/05_Home_After_Signup.png" width="200" /> | 06_Login_After_Logout.png<br><img src="files/android/06_Login_After_Logout.png" width="200" /> | 07_Login_Error_InvalidEmail.png<br><img src="files/android/07_Login_Error_InvalidEmail.png" width="200" /> | 08_Login_Error_WrongCreds.png<br><img src="files/android/08_Login_Error_WrongCreds.png" width="200" /> |
| 09_Home_After_Login.png<br><img src="files/android/09_Home_After_Login.png" width="200" /> | 10_Login_Final.png<br><img src="files/android/10_Login_Final.png" width="200" /> |  |  |

---

#### Android Flow Preview

<p align="center">
  <img src="files/android/android.gif" width="400" alt="Android Flow Preview" />
</p>
