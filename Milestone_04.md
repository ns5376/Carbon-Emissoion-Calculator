# Milestone 04 - Final Project Documentation

## NetID
ns5376

## Name
Nisa Shahid

## Repository Link
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376`

## URL for deployed site
http://linserv1.cims.nyu.edu:33344

## URL for form 1 (from previous milestone)
http://linserv1.cims.nyu.edu:33344/emission-form


## URL for form 2 (for current milestone)
http://linserv1.cims.nyu.edu:33344/update


## URL for form 3 (from previous milestone)
http://linserv1.cims.nyu.edu:33344/feedback
http://linserv1.cims.nyu.edu:33344/login
http://linserv1.cims.nyu.edu:33344/register


## First link to GitHub line number(s) for constructor, HOF, etc.
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/routes/authRoutes.mjs#L87

## Second link to GitHub line number(s) for constructor, HOF, etc.
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/routes/authRoutes.mjs#L88

### Short description for links above
1. The map function iterates over each item in the entries array (which represents the emission entries retrieved from the database).
2. The reduce function calculates the sum of all amount values within the emissions object.

## Link to GitHub line number(s) for schemas (db.js or models folder)
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/models

## Description of research topics above with points
1. Integration of Climatiq API for Emission Calculations
The application integrates the Climatiq API to estimate CO2 emissions for various activities. Users input data such as transportation distance, electricity consumption, waste, and water usage, and the API calculates the equivalent carbon emissions. 
2. Google Authentication with Passport.js
The app uses Passport.js with the Google OAuth strategy for user authentication. This allows users to log in securely using their Google accounts. After successful authentication, users are redirected to the dashboard. 
3. Vite with ESLint Integration for Workflow Automation 
Vite is integrated as a build tool for faster development and optimized production builds. ESLint is configured to lint the codebase during development, ensuring code quality and adherence to coding standards. 
4. Tailwind CSS for UI Design (2 points)
The application uses Tailwind CSS for responsive and utility-first styling. Tailwind enables rapid design iteration with pre-defined utility classes, creating a modern and consistent UI for forms, dashboards, and navigation. 

## Links to GitHub line number(s) for research topics described above
1. https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/routes/emissionRoutes.mjs#L31
2. https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/routes/authRoutes.mjs#L69
3. https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/vite.config.js
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/.eslintrc.json
4. https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ns5376/blob/master/backend/tailwind.config.mjs


## Attributions
1. API documentation: https://www.climatiq.io/docs/api-reference
