# Push-PhoneGap
> Test Drive Push Notifications on Kinvey with this sample PhoneGap application.

## Installation

1. Make sure the [PhoneGap CLI](https://github.com/mwbrooks/phonegap-cli) is installed.
2. Replace `App Key` and `App Secret` (`www/js/index.js`) with your application credentials.
3. For Android, replace `Push API Key` (`www/js/push.js`) with your Google API Key.
4. Build the project: `phonegap build <android|ios>`.

## Testing
To send a Push Notification, make sure you [configured Push](http://devcenter.kinvey.com/phonegap/guides/push#ConsoleSetUp). Then, click **Send a Push** in the navigation, and send a message. Depending on whether you clicked the **Register for Push** button in your app you will receive the Push Notification.

## Gotchas
Push Notifications are intended for real devices. Push will fail on the iOS Simulator. For Android, notifications can be made to work on the emulator as follows:

1. Open the **Android SDK Manager**, and install the **Google Cloud Messaging for Android Library** under the **Extras** section.
2. Open the **AVD Manager** and create a new Google API Emulator.
3. After launching the emulator, go to **Menu → Settings → Accounts & Sync**. Add a **Google account**.
4. Deploy your PhoneGap project to the emulator to test Push Notifications.

## License

    Copyright 2014 Kinvey, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.