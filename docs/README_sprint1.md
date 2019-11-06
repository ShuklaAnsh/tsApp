# Readme file for Sprint 1 (Milestone 3)
## Functionality
Our app has working views, models, and controllers for the user stories marked with a :heavy_check_mark: in the next section. The other user stories mentioned were addressed but were not completed.

The views allow the user to navigate through the app. The controllers exchanges data with the model layer, which in turn communicates with the mongoDb, and with the views. 

The mongoDb is hosted on mongoDb Atlas and is up and running all the time, however the application must still be built and ran locally.

---

## User Stories Addressed
#### User Story - User wants to create an account :heavy_check_mark:
A user is able to create an account in Creatures&Caves through the view. The controller takes the request and updates the database through the model and returns a confirmation to the view.

#### User Story - User wants to create a campaign :heavy_check_mark:
A user is able to create a campaign in Creatures&Caves through the view. The controller takes the request and updates the database through the model and returns a confirmation to the view.

#### User Story - User wants to remove a campaign :heavy_check_mark:
A user is able to delete a campaign in Creatures&Caves through the view. The controller takes the request and updates the database through the model and returns a confirmation to the view.

#### User Story - User wants to create a custom item.
An item can be created through the model and controller, however the view needs additional code to have a functional frontend interface to create an item.

---

## Design Problems Faced
#### 1 - Running ```npm install``` will give a "high severity vulnerability" warning due to the chosen mock database node package
The node module ``` mongo-unit ``` uses a pre-built version of mongodb to run a local mock mongodb process for testing the models. The vulnerability arises from the version of the pre-build mongodb, making it succesptible to Denial of Service attacks. For more inforemation on mongo-unit, click [here](https://www.npmjs.com/package/mongo-unit)

This ended up not being a problem when we realized that it is not an actual production-level problem and will only affect development if attacked. Since mongo-unit is only used for testing and not as the actual database for the app, if it was attacked, it would not affect the application in any way.

#### 2 - Mongodb Atlas 
Using a cloud database comes with its own issues, like availabilty to developers. In certain times when we had no access the internet, it meant that we had no access to the database. This limits the development process since we could not work with real data and had to focus on the views and controller side instead of the model side.

Another issue was that sometimes connecting to the cloud database took too long, depending on internet speeds, and Jest would say that the test failed since it took too long. This was solved by adding the ```--detectOpenHandles``` which will allow Jest to wait for the test to finish.

---

## Design Changes
Nothing from the design from the previous milestone was taken out, however, we decided to add a new entity (Sessios) to the design and some other minor changes. 

##### Sessions
A session contains:
 - id: a unique id
 - name: the name of this session
 - session number: indicates which session of the campaign it is
 - last session details: contains information about the previous session (world time, weather, location, and recap)
 - current session details: contains information about the previous session (world time, weather, and location)

A campaign has an ordered array of sessions that, together, will form and describe the campaign's progress.

##### Minor Changes
- Campaigns will now also have descriptions
- Items will now also have rarity parameter

## Static Analysis Tool
[![BCH compliance](https://bettercodehub.com/edge/badge/archers1234/seng350?branch=master&token=1d63c209181344f0eaf3f14a24391b3524eca7bc)](https://bettercodehub.com/)  
The static analysis tool chosen to be used was through Better Code Hub. By analysing the repository Better Code Hub breaks it down into 10 points that is used to rate the quality of the code. These 10 points are listed below:
 - Write short units of code
 - Write simple units of code
 - Write code once
 - Keep unit interfaces small
 - Separate conserns in modules
 - Couple architecture components loosely
 - Keep architecture components balanced
 - Keep your code base small
 - Automate tests
 - Write clean code  

Through the use of this static analysis tool another view of the repository is created to unlamently help create better code. For more information view the webpage for [Better Code Hub](https://bettercodehub.com/).
