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
2. Automatic screenshots and video generation (FFMPEG Must be installed.)

### iOS Screenshots

| 01_SignupScreen.png<br>![](files/ios/01_SignupScreen.png) | 02_Signup_Error_Required.png<br>![](files/ios/02_Signup_Error_Required.png) | 03_Signup_Error_InvalidEmail.png<br>![](files/ios/03_Signup_Error_InvalidEmail.png) | 04_Signup_Error_ShortPassword.png<br>![](files/ios/04_Signup_Error_ShortPassword.png) |
|:---:|:---:|:---:|:---:|
| 05_Home_After_Signup.png<br>![](files/ios/05_Home_After_Signup.png) | 06_Login_After_Logout.png<br>![](files/ios/06_Login_After_Logout.png) | 07_Login_Error_InvalidEmail.png<br>![](files/ios/07_Login_Error_InvalidEmail.png) | 08_Login_Error_WrongCreds.png<br>![](files/ios/08_Login_Error_WrongCreds.png) |
| 09_Home_After_Login.png<br>![](files/ios/09_Home_After_Login.png) | 10_Login_Final.png<br>![](files/ios/10_Login_Final.png) |  |  |

---

#### iOS Flow Video

<video src="./files/ios/ios.mp4" controls width="300">
  Your browser does not support HTML5 video.
</video>

---

### Android Screenshots

| 01_SignupScreen.png<br>![](files/android/01_SignupScreen.png) | 02_Signup_Error_Required.png<br>![](files/android/02_Signup_Error_Required.png) | 03_Signup_Error_InvalidEmail.png<br>![](files/android/03_Signup_Error_InvalidEmail.png) | 04_Signup_Error_ShortPassword.png<br>![](files/android/04_Signup_Error_ShortPassword.png) |
|:---:|:---:|:---:|:---:|
| 05_Home_After_Signup.png<br>![](files/android/05_Home_After_Signup.png) | 06_Login_After_Logout.png<br>![](files/android/06_Login_After_Logout.png) | 07_Login_Error_InvalidEmail.png<br>![](files/android/07_Login_Error_InvalidEmail.png) | 08_Login_Error_WrongCreds.png<br>![](files/android/08_Login_Error_WrongCreds.png) |
| 09_Home_After_Login.png<br>![](files/android/09_Home_After_Login.png) | 10_Login_Final.png<br>![](files/android/10_Login_Final.png) |  |  |

---

#### Android Flow Video

<video src="./files/android/android.mp4" controls width="300">
  Your browser does not support HTML5 video.
</video>
