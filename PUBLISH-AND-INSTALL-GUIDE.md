# Golf Rules Helper - Publish and Install Guide

## What is in this kit
| Item | Where | Used for |
|---|---|---|
| App (final) | `www/index.html`, `manifest.webmanifest`, `sw.js`, `icons/` | The app itself |
| Launcher icon sources | `assets/icon-only.png`, `icon-foreground.png`, `icon-background.png`, `splash.png` | `npm run assets` makes all Android icon sizes |
| Play Store icon 512x512 | `store/play-icon-512.png` | Play Console -> Store listing -> App icon |
| Feature graphic 1024x500 | `store/feature-graphic-1024x500.png` | Play Console -> Store listing -> Feature graphic |
| Listing text | `store/play-store-listing.md` | Copy/paste into Play Console |
| Privacy policy | `store/privacy-policy.html` | Host online, paste its https link into Play Console |
| Build steps | `BUILD-GUIDE.md` | Make the signed .aab |

## Part 1 - Publish on Google Play (do in this order)
1. **Fill the placeholders**: in `capacitor.config.json` set your own `appId` (e.g. `com.huatlynn.golfruleshelper`, cannot change after first upload); in `store/privacy-policy.html` and `store/play-store-listing.md` put your name, support email and date.
2. **Host the privacy policy** (free): create a GitHub repo, upload `privacy-policy.html` (rename `index.html` if you want a clean link), Settings -> Pages -> deploy from main. Your link looks like `https://YOURNAME.github.io/REPO/`. Open it on your phone to check.
3. **Install tools** on a PC/Mac: Node.js LTS and Android Studio.
4. **Build**: unzip the kit, open a terminal in the folder, run
   `npm install` -> `npm run add:android` -> `npm run assets` -> `npm run sync` -> `npm run open`.
5. **Test** on your Android phone (USB debugging) or the emulator: all 4 sections, samples, airplane mode.
6. **Sign and export**: Android Studio -> Build -> Generate Signed App Bundle -> Android App Bundle -> create keystore (back it up in two places) -> release -> `app-release.aab`.
7. **Google Play Console** (play.google.com/console): pay USD 25, verify identity -> Create app (Golf Rules Helper, Free, App).
8. **Store listing**: paste texts from `play-store-listing.md`; upload `play-icon-512.png`, `feature-graphic-1024x500.png` and at least 2 phone screenshots (take from your phone).
9. **App content**: privacy policy link; Ads = No; Data safety = no data collected; content rating questionnaire; target audience 13+; fill the other forms with the suggested answers in the listing file.
10. **Testing**: upload the .aab to a Closed testing track, add testers (new personal accounts currently need about 12 testers for 14 days - confirm in Console), then apply for Production and submit.
11. **Updates later**: change `www/index.html`, `npm run sync`, raise `versionCode` in `android/app/build.gradle`, build a new signed .aab, upload.

## Part 2 - Install the web version (no store needed, no Claude account)
First host the folder `www/` (or the `golf-rules-helper.zip` contents) on any https site: Netlify Drop (drag the folder onto app.netlify.com/drop) or GitHub Pages. Share the https link.

### Android (Chrome)
1. Open the link in Chrome. 2. Tap the menu (three dots) -> Install app (or Add to Home screen). 3. Confirm. The icon appears on the home screen and opens full screen; it works offline after the first load.

### iPhone / iPad (Safari only)
1. Open the link in Safari. 2. Tap Share (square with arrow). 3. Scroll -> Add to Home Screen -> Add. Open it once while online; afterwards it works offline.

### Windows / Mac / Linux PC (Chrome or Edge)
1. Open the link. 2. Click the install icon at the right end of the address bar (or menu -> Install Golf Rules Helper / Apps -> Install this site as an app). 3. It opens in its own window and can be pinned to the taskbar or Dock. (Safari on Mac: File -> Add to Dock.)

### Single file option
`golf-rules-helper.html` works by double-clicking it on a PC or opening it from a phone's Files app (no install, no offline caching guarantee on phones). Use the hosted link for proper installation.

## Part 3 - When you release an update
Web version: replace the hosted files, and bump `VERSION` in `sw.js` (now `gr-helper-v3`) so installed copies refresh.
Play version: new .aab with higher versionCode.

## Reminders
- Never upload your `.jks` keystore or passwords to GitHub.
- Keep the "independent, not affiliated with The R&A / USGA" wording in the listing and app.
- iPhone App Store needs a Mac, Xcode and USD 99/year; installing via Safari is free and works today.
