# Namma Gamer Studio — Android starter

This is an Expo React Native Android project. It includes native file picking, video preview, title/description/tags editing, clipboard copy, and a handoff to YouTube Studio.

## Requirements
- Node.js LTS
- Expo account
- Google Play Console developer account for publishing
- EAS CLI: `npm install -g eas-cli`

## Run on an Android phone
1. Install Node.js on your computer.
2. Extract this ZIP and open a terminal in the project folder.
3. Run `npm install`.
4. Run `npx expo start`; scan the QR code with Expo Go if compatible, or use an Android emulator.

## Build an Android App Bundle (.aab)
1. Run `npm install` and `npm install -g eas-cli`.
2. Run `eas login`.
3. Run `eas build:configure`.
4. Create an Expo project and replace `REPLACE_WITH_YOUR_EAS_PROJECT_ID` in `app.json` with its project ID if prompted.
5. Run `eas build --platform android --profile production`.
6. Download the resulting `.aab` from the EAS build page.

## Google Play Console checklist
- Create your Play Console developer account and complete identity verification.
- Create the app listing with the app name, short/full description, icon, feature graphic and screenshots.
- Complete the Data safety form, content rating, target audience, ads declaration and app access details accurately.
- Provide a public privacy policy if required by your data practices.
- Upload the `.aab` to an internal testing track first; fix any Play Console warnings.
- Complete any testing requirement shown for your developer account, then submit for review.

## Important
- This starter does not upload video files directly to YouTube. It sends users to YouTube Studio and copies metadata. Direct YouTube uploads require implementing Google OAuth 2.0 and the YouTube Data API, a privacy policy, and secure token handling.
- The current app icon is a simple NG placeholder. Replace `assets/icon.png` and `assets/adaptive-icon.png` with your final Namma Gamer logo before building.
- Use a unique Android package ID if `com.nammagamer.studio` is already taken or not suitable. Choose it carefully because changing it later creates a different Play Store app.
- Review current Play Console requirements before release; requirements can change.
