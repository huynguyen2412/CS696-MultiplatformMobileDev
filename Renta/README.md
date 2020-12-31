Overview:
The project is an app to help people looking for a/an home/appartment for rent which called a "Renta". They can also post a house/appartment for rent. 

The app is written using React Native framework and ReactNative Firebase(rnfirebase.io). The project used Firebase for authentication and storage.

The app included the following functionalities:
+ Register account
+ Login to app if they already have an account
+ Get validation from Firebase if the user enters incorrect login info.
+ Registration and Login form have rule validation that validate invalid input from the user
+ Users can create a Renta post if they have a house for rent by clicking "List-A-Renta"
+ They can manage their Renta posts from "My-List" menu item.
+ They can search for house for rent from the search bar by entering a zipcode or a city
+ They can contact the landlord by open a Renta post and click on the contact button. 

Instruction to run the project:

You need to create a project on Firebase and download google-services.json to securely connect your project with Firebase. More instruction can find at [rnfirebase.io](https://rnfirebase.io/#installation)

After adding the credentials for Android or iOS:
+ Run yarn to install dependency libaries: yarn
+ Update gradle bundle: cd android && ./gradlew && cd ..
+ Run Metro server: yarn start --reset-cache
+ To run the project: yarn android



