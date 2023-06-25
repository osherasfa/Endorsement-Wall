# We are the Champions

This project showcases a simple web application that allows users to write and publish endorsements. It uses HTML, CSS, and JavaScript to provide an interactive user interface.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Realtime Database](#firebase-realtime-database)

## Demo
Check out the live demo of the project [here](https://endorsement-project.netlify.app/){:target="_blank"}.

## Features
- Users can write endorsements and specify the sender and recipient.
- Endorsements can be published and displayed on the page.
- Users can like/unlike endorsements.
- The application uses Firebase Realtime Database to store and retrieve endorsement data.

## Installation
1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Open the project folder.
3. Run on localhost machine

## Usage
1. Open the `index.html` file in your web browser.
2. Fill out the endorsement form with the endorsement message, sender, and recipient.
3. Click the "Publish" button to publish the endorsement.
4. The endorsement will be displayed in the "Endorsements" section.
5. You can like or unlike an endorsement by clicking the heart icon next to it.
6. The endorsement count will update accordingly.

## Firebase Realtime Database
This project utilizes Firebase Realtime Database to store endorsement data. To set up the Firebase Realtime Database for your own project, follow these steps:
1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
2. Enable the Realtime Database feature in your Firebase project.
3. Copy the Firebase configuration object and replace the `appSettings` variable in `index.js` with your own configuration.
4. Set the appropriate database rules for read and write access in the Firebase console.
