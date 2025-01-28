


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

## Deployed Site

[https://carbon-emission-calculator-vert.vercel.app]

