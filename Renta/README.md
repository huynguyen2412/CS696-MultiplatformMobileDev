SDSU RedID: 818759988
<br>
Project name: Renta

Overview:
The project is an app to help people looking for a/an home/appartment for rent which called a "Renta".
They also post a house/appartment for rent. 
I used Firebase for authentication and storage.

The app included the following functionalities:
+ Register account
+ Login to app if they already have an account
+ Get validation from Firebase if the user enters incorrect login info.
+ Registration and Login form have rule validation that validate invalid input from the user
+ Users can create a Renta post if they have a house for rent by clicking "List-A-Renta"
+ They can manage their Renta posts from "My-List" menu item.
+ To sign out they can go to "Setting" menu item and click on "Sign Out" button
+ They can search for house for rent from the search bar by entering a zipcode or a city
+ They can contact the landlord by open a Renta post and click on the contact button. 

Instruction to run the project:
+ Run yarn to install dependency libaries: yarn
+ Update gradle bundle: cd android && ./gradlew && cd ..
+ Run Metro server: yarn start --reset-cache
+ Open another terminal and run program: yarn android

Know issues:
+ I didn't handle unmount useEffect on some components. It might cause memory leak at sometimes.
+ Two users can send text message for each other but the feature is not fully tested.
+ The app will take a little time to load since I used 3rd library for UI components.


