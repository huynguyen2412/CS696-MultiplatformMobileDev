Overview:
The project is an app to help people looking for a/an home/appartment for rent which called a "Renta". They can also post a house/appartment for rent. 
The app is written using React Native framework and ReactNative Firebase(rnfirebase.io). The project used Firebase for authentication and storage.

<img src="https://github.com/huynguyen2412/CS696-MultiplatformMobileDev/blob/main/Renta/gifexample/register_account.gif" width=30% height=30%>
<img src="https://github.com/huynguyen2412/CS696-MultiplatformMobileDev/blob/main/Renta/gifexample/login_account.gif" width=30% height=30%>
<img src="https://github.com/huynguyen2412/CS696-MultiplatformMobileDev/blob/main/Renta/gifexample/post_and_view.gif" width=30% height=30%>
<img src="https://github.com/huynguyen2412/CS696-MultiplatformMobileDev/blob/main/Renta/gifexample/search_message_landlord.gif" width=30% height=30%>
<img src="https://github.com/huynguyen2412/CS696-MultiplatformMobileDev/blob/main/Renta/gifexample/convo.gif" width=30% height=30%>

Instruction to run the project:

You need to create a project on Firebase and download google-services.json to securely connect your project with Firebase. More instruction can find at [rnfirebase.io](https://rnfirebase.io/#installation)

After adding the credentials for Android or iOS:
+ Run yarn to install dependency libaries: yarn
+ Update gradle bundle: cd android && ./gradlew && cd ..
+ Run Metro server: yarn start --reset-cache
+ To run the project: yarn android



