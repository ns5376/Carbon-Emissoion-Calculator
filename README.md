The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.


# The Carbon Dioxide Emission Calculator

## Overview



The Carbon Dioxide Emission Calculator is designed to help individuals and organizations estimate their carbon footprint based on daily activities such as transportation, home energy use, and lifestyle choices. By inputting simple data about their daily routines, users can see how their actions contribute to carbon emissions, enabling them to make informed decisions about reducing their environmental impact.


## Data Model



The application will store Users and Emission Entries:

* Users can have multiple Emission Entries (via references)
* Each Emission Entry corresponds to a single user, but contains detailed records of different emission categories embedded within each entry.



An Example User:

```javascript
{
  username: "ecoUser",
  hash: "hashedPasswordExample",  // This would be a password hash for user authentication
  emissionEntries: [
    // An array of references to Emission Entry documents
  ]
}

```

An Example List with Embedded Items:

```javascript
{
  userId:   // Reference to the User object who owns this entry
  date: "2023-10-10",
  emissions: {
    transportation: {
      amount: 300, 
      unit: "kg of CO2", 
      description: "Car and public transportation"
    },
    electricity: {
      amount: 150, 
      unit: "kg of CO2",
      description: "Home electricity usage"
    },
    waste: {
      amount: 45, 
      unit: "kg of CO2",
      description: "Recyclable and non-recyclable waste"
    },
    water: {
      amount: 80, 
      unit: "kg of CO2",
      description: "Water supply and treatment"
    }
    // might add more
  },
  createdAt:  // Timestamp of when the entry was created
}

```


## [Link to Commented First Draft Schema](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/db.mjs) 



## Wireframes




![home](documentation/home.jpg)
/home2/ home page for when not logged in 
![home2](documentation/home2.jpg) 
/input/ page to enter emission data
![input](documentation/input.jpg)
![login](documentation/login.jpg)
![profile](documentation/profile.jpg)
![register](documentation/register.jpg)
![dashboard](documentation/dashboard.jpg)


## Site map



![Site Map](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/documentation/sitemap.jpg)


## User Stories or Use Cases



* As a new visitor, I want to understand what the application does, so that I can decide if I want to use it.
* As a new user, I want to easily register for an account, so that I can securely store and track my carbon emission data.
* As a user, I want to log in to my account, so that I can access my personal emission data.
* As a user, I want to input data regarding my daily activities, so that I can calculate my carbon emissions for those activities.
* As a user, I want to view a summary of my emissions over different periods (daily, weekly, monthly), so that I can understand my emission trends.
* As a user, I want to modify or delete previously entered emission data, so that I can correct mistakes and keep my data accurate.
* As a user, I want to be able to change my account settings, so that I can update my personal information or password.
* As a user, I want to log out of the application, so that I can ensure no one else has access to my data on my device.
* As an administrator, I want to see statistics about user engagement and data entries, so that I can gauge the success of the application.

## Research Topics


* (2 points) Integration of Climatiq API
  * Enables accurate emissions data retrieval based on user activities for precise carbon calculations. Set up API calls to Climatiq based on user input and integrate the data into your emission calculation functions.
* (3 points) Unit Testing with JavaScript (Jest)
  * Ensures core functions, especially emission calculations, work reliably under various scenarios.  Write at least four tests covering key functions, such as emission calculations and API responses, to verify they handle various user inputs and data formats.
* (3 points) User Authentication Using OAuth (Google, Facebook, Apple)
  * Allows secure and convenient login options for users via popular social accounts. Use Passport.js or a similar library to set up OAuth authentication with Google, Facebook, and Apple. Implement the login flow to securely handle tokens and user sessions.
* (2 points) Integrate ESLint into Your Workflow
  * Maintains code quality, making your application more maintainable and secure, especially important when handling sensitive information like tokens and API data. Configure ESLint to enforce coding standards across your project, especially for code handling API integration and authentication.
* Total Points: 10 Points


## [Link to Initial Main Project File](app.mjs) 



## Annotations / References Used



