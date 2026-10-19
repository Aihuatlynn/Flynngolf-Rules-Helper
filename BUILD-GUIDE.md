# Golf Rules Helper - Capacitor build guide (Android / Google Play)

Everything the app needs is already in `www/` (single-page, fully offline, no network permission needed).

## 0. One-time setup on your computer (Windows / Mac / Linux)
1. Install Node.js LTS (https://nodejs.org).
2. Install Android Studio (https://developer.android.com/studio). It bundles the JDK and Android SDK.
3. Change the app ID before you start: edit `capacitor.config.json` -> `"appId"`. Use your own reversed name, e.g. `com.huatlynn.golfruleshelper`. **It can never be changed after the first upload to Google Play.**

## 1. Create the Android project
```
npm install
npm run add:android      # creates the android/ folder
npm run assets           # generates launcher icons + splash from assets/*.png
npm run sync             # copies www/ into the Android project
npm run open             # opens Android Studio
```

## 2. Check the app on a phone
In Android Studio: plug in your phone (USB debugging on) or use an emulator, then press Run (green triangle).
Test: samples load, all four sections (A/B/C/D) answer, airplane mode still works.

## 3. Set version numbers
Open `android/app/build.gradle` and set
`versionCode 1` (integer, +1 for every upload) and `versionName "1.0.0"`.
Also in `android/variables.gradle` keep `targetSdkVersion` at the level Google Play currently requires (Capacitor 7 defaults are current as of late 2025; check Play Console's "target API" warning when you upload).

## 4. Make the signing key (keep it safe - back it up in 2 places)
Android Studio -> Build -> Generate Signed App Bundle / APK -> Android App Bundle -> Create new keystore.
Save the `.jks` file and its passwords outside the project. If you lose it you cannot update the app
(unless you enrol in Play App Signing, which is recommended: Google keeps the final signing key and you only keep an upload key).

## 5. Build the release bundle
Build -> Generate Signed App Bundle -> `release` -> finish. Output:
`android/app/release/app-release.aab`  <- this is the file you upload to Google Play.

## 6. Google Play Console
1. Pay the one-time USD 25 developer fee and verify your identity: https://play.google.com/console
2. Create app -> name "Golf Rules Helper", language, App, Free.
3. Fill the store listing from `store/play-store-listing.md`.
4. Host `store/privacy-policy.html` at a public https URL (GitHub Pages / Netlify Drop) and paste that URL in "App content -> Privacy policy".
5. Complete App content forms (answers prepared in the listing file): Data safety, Content rating, Ads = No, Target audience = 13+ / general, Government app = No.
6. Upload the .aab to a Testing track. New *personal* developer accounts must run a closed test with about 12 testers for 14 days before production access - check the current rule in Play Console.
7. After the closed test, apply for Production and submit for review.

## 7. Updating later
Edit `www/index.html`, run `npm run sync`, raise `versionCode`, build a new signed .aab, upload.

## Notes
* The in-app service worker (`www/sw.js`) is harmless inside Capacitor; you may delete it and its registration line in `index.html` if you prefer.
* The app opens randa.org / Google links in the browser (the "official check" links). That is the only outbound activity, and only when the user taps.
* iOS: needs a Mac + Xcode + USD 99/yr Apple account. `npx cap add ios` then the same flow. Apple may reject apps that are only a thin web wrapper, so Android first is sensible.
