# react-native-moodlemobile
## A React Native application developed to work with Moodle.

### How to run:
* Clone the repository and access it
* Install the dependencies with: `npm install` or `yarn install`
* Create your .env file based on .example.env, and fill in the information from your moodle site information
* If you want to run on an iOS device, access `ios/` and install the pods with: `cd ios` and `pod install`
* Run the application with: `react-native run-ios` or `react-native run-android`

### Project structure

The project is divided into the following structure

* src
  * api: This directory contains all files related to calls to the moodle webservice. This facilitates the implementation of new calls and the maintenance of existing ones.
  * blocks: Here all the blocks to be used by the application, if you have a proprietary moodle block and want to use it in your application, you must implement it here.
  * components: Here are React Components commonly used by the application.
  * events: Here all the files related to the events emitted by the application.
  * screens: Everything you can see on your device's screen is here.
