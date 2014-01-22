/**
 * Copyright 2014 Kinvey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Push Notification namespace.
var push = {
  // The device ID. Set here because we need it in case of unregistering.
  deviceId: null,

  // Status DOM.
  status: document.getElementById('status'),

  /**
   * Initializes push functionality.
   */
  initialize: function() {
    // Check preconditions.
    if(null == window.plugins.pushNotification) {
      throw new Error('The PushPlugin is not installed.');
    }

    // Bind buttons.
    var register   = document.getElementById('register');
    var unregister = document.getElementById('unregister');
    register.addEventListener('click', push.register, false);
    unregister.addEventListener('click', push.unregister, false);
  },

  /**
   * Registers device for receiving Push Notifications.
   */
  register: function() {
    // Check preconditions.
    if(null != push.deviceId) {
      push.status.innerHTML = 'Cannot register: already registered for push.';
      return;
    }

    // The success- and error callbacks are never called. This is a bug with
    // the PushPlugin.
    window.plugins.pushNotification.register(function(token) {
      // Register the device with Kinvey (iOS only).
      if('ios' === window.device.platform.toLowerCase()) {
        push.deviceId = token;// Save.
        Kinvey.Push.register(tokenId);
      }
      push.status.innerHTML = 'Registered for push.';
    }, function(error) {
      push.status.innerHTML = 'Failed to register: ' + error;
    }, {
      alert    : 'true',// Subscribe to this notification type (iOS only).
      badge    : 'true',// Subscribe to this notification type (iOS only).
      sound    : 'true',// Subscribe to this notification type (iOS only).
      ecb      : 'push.onMessage',// Callback to invoke on new Push Notification.
      senderID : 'Push API Key'// Google API Key (Android only).
    });

    // The device will be registered with Kinvey in `app.onPushMessage`.

    // Update.
    push.status.innerHTML = 'Registering for push.';
  },

  /**
   * Unregisters device from receiving Push Notifications.
   */
  unregister: function() {
    // Check preconditions.
    if(null == push.deviceId) {
      push.status.innerHTML = 'Cannot unregister: not registered for push.';
      return;
    }

    // Unregister device.
    window.plugins.pushNotification.unregister(function() { });
    Kinvey.Push.unregister(push.deviceId);

    // Update.
    push.deviceId         = null;
    push.status.innerHTML = 'Not registered for push.';
  },

  /**
   * Callback invoked when a new Push Notification is received.
   */
  onMessage: function(data) {
    // The `registered` event is fired by the `push.register` function. Here,
    // register the device with Kinvey (Android only).
    if('registered' === data.event) {
      push.deviceId = data.regid;// Save.
      Kinvey.Push.register(push.deviceId);
    }

    // Push Notifications are handled here.

    // Show a simple alert on receiving a Push Notification.
    if('message' === data.event) {// Android.
      alert('Push Notification received: ' + data.payload.msg);
    }
    if(data.alert) {// iOS.
      alert('Push Notification received: ' + data.alert);
    }
  }
};