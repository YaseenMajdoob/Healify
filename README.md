## !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
## This app is not completed yet, I didn't set up the specialists\doctors fonctionnalities yet, the code is not clean and I haven't made many tests

## Prerequisites

Before setting up the app, make sure you have the following prerequisites installed:

-   **Node.js**: Install Node.js from the official website (https://nodejs.org) or use a package manager like Homebrew (macOS) or Chocolatey (Windows).
-   **Expo CLI**: Install the Expo CLI globally by running the following command:

```shell
npm install --global expo-cli

```

-   **Firebase Account**: Create a Firebase account at https://firebase.google.com and set up a new project.


2. **Install dependencies:**

```shell
npm install
```

3. **Set up Firebase:**

-   Create a new Firebase project
-   Enable Authentication and Firestore services.
-   In the Firebase console, navigate to Project Settings and copy the Firebase configuration object.

4. **Configure Firebase in the app:**

-   Replace the ********** values in firebaseHelper.js with your Firebase configuration values.

5. **Start the Expo development server:**

```shell
expo start
```
6. **Get google Api key** 

-   Replace  the ********* value in "chat.js" and "gemini.js" in screens folder with your Google AI Api key
    https://ai.google.dev/gemini-api/docs/api-key

7. **Install the Expo Go app** on your iOS or Android device.

8. **Scan the QR code** displayed in the terminal or in the browser using the Expo Go app to launch the app on your device.


## Technologies Used

The Chat GPT Clone app utilizes the following technologies:

-   **React Native**: A framework for building native apps using React.
-   **Expo**: A framework and platform for universal React applications.
-   **Firebase**: A backend-as-a-service platform for building web and mobile apps.
-   **Gemini Pro**: A state-of-the-art language model developed by Google.