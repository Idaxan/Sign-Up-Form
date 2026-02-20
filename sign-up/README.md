React Native Sign-Up Form

A fully interactive, client-side sign-up form built with React Native. It features real-time input validation, dynamic error UI (conditional red highlighting), and a responsive layout designed for both iOS and Android.



🚀 How to Run the App

1\. Prerequisites

Make sure you have Node.js installed and your React Native development environment set up (Expo is recommended for this project).



2\. Install Dependencies

Navigate to your project folder in the terminal and install the required packages:



npm install country-list react-native-safe-area-context react-native-paper react-native-dropdown-picker react-native-phone-number-input



3\. Start the Server

Run the following command to start the Metro bundler:



npx expo start



(If you are using the bare React Native CLI instead of Expo, run npx react-native run-ios or npx react-native run-android instead).



🌍 Country Data Package

To handle the country data, this project uses the country-list npm package.



* How it works: It acts as an offline dictionary, returning an array of all global countries and their 2-letter ISO codes (e.g., name: 'United States', code: 'US').



* UI Integration: The raw data from country-list is mapped into a { label, value } format and fed into the react-native-dropdown-picker to create the searchable dropdown UI.



📌 Assumptions \& Limitations

* No Backend Integration: This form operates entirely entirely on the client side using local state (useState). Hitting "Submit" resets the form and triggers a success alert, but does not send the data to a database.



* Phone Number Default Code: The react-native-phone-number-input component uses a hardcoded default calling code of "US" (+1). It is not currently linked to automatically update based on the selection made in the Country Dropdown.



* Age Validation Limits: The code assumes a valid user must be an adult. The age input will throw a validation error if the user inputs an age younger than 18 or older than 130.



* Phone Number Validation: While the phone input formats the number visually, the current handleSubmit logic only checks if the phone number field is not empty. It does not strictly validate if the phone number typed is a real, active phone number.
