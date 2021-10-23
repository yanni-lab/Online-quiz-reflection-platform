
# Berry Street Project - Boxjelly
## Table of Contents

1. [Project Overview](#project-overview)
2. [Demo](#demo)
3. [Features](#features)
4. [Documentation](#documentation)
5. [System Requirements](#system-requirements)
6. [User Guide](#user-guide)
7. [Project Structure](#project-structure)
8. [Testing](#testing)
9. [Changelog](#changelog)

## Project Overview

A self-reflection online platform for young people with lived experiences from disadvantaged backgrounds. More information can be found in the [project background](./docs/ProjectBackground.pdf).

## Demo

Check out our [live demo](./docs/LiveDemo.mp4) for a complete walkthrough of the platform.

## Features

**Sprint 1**

For sprint 1, we focus on developing the functionality for LECs  to take quizzes. The user should be able to complete the entire workflow as an LEC, meaning he/she can choose which quiz to take, select the answers to each quiz, check and edit previous answers, see feedback, and write user experience comments.

The organized user stories in sprint 1 are: US01, US02, US03, US04, US08, US09, US10, US11



**Sprint 2**

For sprint 2, we focus on developing the functionality for Supervisors to create and manage quizzes, as well as ensuring that LECs can view the quizzes they have taken. The supervisor should be able to complete the entire workflow as a supervisor, meaning he/she can create the quiz, set the quiz public or private, edit the quiz, delete the quiz, view the feedback and user experience of LECs who chose to share  with them. 

The organized user stories in sprint 2 are: US05, US06, US07, US12, US13, US14, US15, US16, US17, US18, US19, US20, US21

## Documentation

`docs/` 

- [Project Background](./docs/ProjectBackground.pdf)
- [Project Requirements](./docs/ProjectRequirements.pdf)
- [Motivational Model](./docs/MotivationalModel.pdf)
- [User stories](./docs/UsersStories.pdf)
- [High Level Component Diagram](./docs/ComponentDiagram.pdf)
- [Database ER Diagram](./docs/ERDiagram.pdf)
- [Sequence Diagram](./docs/SequenceDiagram.pdf)
- [Final Presentation Slides](./docs/FinalPresentation.pptx)
- [Live Demo](./docs/LiveDemo.mp4)

## System Requirements

- React (17.0.2)
- React-bootstrap (5.1.0)
- Npm (6.14.15)
- Node.js (v14.17.6)
- CSS (CSS 4)
- Java (11.0.8)
- Spring Boot Framework (2.5.4)
- MyBatis (3.5.2)
- Maven (3.6.3)
- MySQL (8.0.26)

## User Guide

**Run Backend Program**

1. Make sure you have a working `Java 11` environment. 
   (Open a shell and run `java --version` to check your Java version.)
2. Make sure you have your `MySQL server` running.
3. On [release](https://github.com/yanni-lab/COMP90082-2021-SM2-ST-Boxjelly/releases)
   page download `berryst-1.0.0.jar` file.
4. On shell run `java -jar <path-to-file>berryst-1.0.0.jar`.

**Config Sharing Email**
1. Open file on `Backend/src/main/java/com/berryst/demo/configuration/EmailConfig.java`
2. Change value of `setHost`, `setPort`, `setUsername` and `setPassword`

**Database**

Steps to initialise mysql database:

1. `mysql -u root -p`

2. enter password

3. run the script `create_db.sql`  and `init_db.sql` in `/Database` folder 
4. `cd /Backend`
5. change the `spring.datasource.username` and `spring.datasource.password` in the top 2 lines
   in `/Backend/src/main/resources/application.properties`

**Frontend**

Steps to initialise react:

1. `git clone` the frontend folder

2. `cd /Frontend` to get access to this frontend folder

3. `npx install react-bootstrap` to load the ui-related package, install the `node_modules` before run the project

4. `npm start` to start the project

5. Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```markdown
├─Backend/src
│ ├─main
│ │  ├─java/com/berryst/demo
│ │  │              ├─DemoApplication.java
│ │  │              │  
│ │  │              ├─configuration
│ │  │              │      EmailConfig.java
│ │  │              │      JacksonConfig.java
│ │  │              │      
│ │  │              ├─controller
│ │  │              │      QuizController.java
│ │  │              │      ResultController.java
│ │  │              │      UserController.java
│ │  │              │      
│ │  │              ├─exception
│ │  │              │      GlobalExceptionHandler.java
│ │  │              │      
│ │  │              ├─mapper
│ │  │              │      QuizMapper.java
│ │  │              │      ResultMapper.java
│ │  │              │      UserMapper.java
│ │  │              │      
│ │  │              ├─model
│ │  │              │      Comment.java
│ │  │              │      Feedback.java
│ │  │              │      Question.java
│ │  │              │      QuestionChoice.java
│ │  │              │      Quiz.java
│ │  │              │      QuizResult.java
│ │  │              │      User.java
│ │  │              │      
│ │  │              ├─service
│ │  │              │  │  QuizService.java
│ │  │              │  │  ResultService.java
│ │  │              │  │  UserService.java
│ │  │              │  │  
│ │  │              │  └─impl
│ │  │              │          QuizServiceImpl.java
│ │  │              │          ResultServiceImpl.java
│ │  │              │          UserServiceImpl.java
│ │  │              │          
│ │  │              └─utils
│ │  │                      DataProcessing.java
│ │  │                      EmailService.java
│ │  │                      StringToIntArrayHandler.java
│ │  │                      
│ │  └─resources
│ │      │  application .yml
│ │      │  application.properties
│ │      │  
│ │      └─mybatis
│ │          └─mapper
│ │                  QuizMapper.xml
│ │                  ResultMapper.xml
│ │                  UserMapper.xml
│ │                  
│ └─test/java/com/berryst/demo
│                     ├─DemoApplicationTests.java
│                     │  
│                     └─controller
│                            QuizControllerTest.java
│                            ResultControllerTest.java
│                            UserControllerTest.java
└─data
```

```markdown
Frontend/src
    │  App.css
    │  App.js
    │  index.css
    │  index.js
    │  NavBar.css
    │  quiz.json
    │  
    ├─Components
    │  ├─Communication
    │  │      Communication.css
    │  │      Communication.js
    │  │      
    │  ├─CreateQuizPage
    │  │      CreateQuiz.css
    │  │      CreateQuiz.js
    │  │      
    │  ├─EditQuizPage
    │  │      EditQuiz.css
    │  │      EditQuiz.js
    │  │      
    │  ├─FeedBack
    │  │      FeedBack.css
    │  │      FeedBack.js
    │  │      
    │  ├─HomePage
    │  │      Home.css
    │  │      Home.js
    │  │      
    │  ├─images
    │  │  
    │  │      
    │  ├─ListQuizPage
    │  │      listQuiz.css
    │  │      listQuiz.js
    │  │      
    │  ├─LoginPage
    │  │      Login.css
    │  │      Login.js
    │  │      
    │  ├─MyLECsPage
    │  │      MyLECs.css
    │  │      MyLECs.js
    │  │      
    │  ├─NavBar
    │  │      NavBar.css
    │  │      NavBar.js
    │  │      
    │  ├─Quiz
    │  │      Quiz.css
    │  │      quiz.js
    │  │      quiz1.js
    │  │      
    │  ├─RegisterPage
    │  │      Register.css
    │  │      Register.js
    │  │      
    │  ├─resetPassword
    │  │      resetPassword.css
    │  │      resetPassword.js
    │  │      
    │  ├─SupervisorDashboard
    │  │      SupervisorDashboard.css
    │  │      SupervisorDashboard.js
    │  │      
    │  ├─UpdateAccountPage
    │  │      UpdateAccount.css
    │  │      UpdateAccount.js
    │  │      
    │  ├─ViewCommentsPage
    │  │      ViewComments.css
    │  │      ViewComments.js
    │  │      
    │  └─ViewLECsPage
    │          ViewLECs.css
    │          ViewLECs.js
    │          
    └─data
```

## Testing

`tests/`

- [Acceptance criteria](./tests/AcceptanceCriteria.pdf)
- [Acceptance tests](./tests/UserAcceptanceTests.pdf)

## Changelog
###[2.0] - 2021-10-23
#### Added
* Frontend: Create quiz page
* Frontend: Edit quiz page
* Frontend: Make comment page
* Frontend: Input validation
* Frontend: Reset Password
* Frontend: Automatic increase score in create/edit quiz
* Backend: Reset password
* Backend: Global exception handler
* Backend: Supervisor quiz list
* Backend: Set quiz public/private
* Backend: Add/edit/delete quiz
* Backend: Save result
* Backend: Share result
* Backend: View result LEC
* Backend: View result supervisor
* Backend: Comment on website
* Backend: View website comment
* Backend: Delete user account
* Backend: Edit user profile
* Backend: Format log output
* Backend: Controller mock test
* Database: Cascade Delete
#### Changed
* Frontend: Add user info to cookie
* Frontend: Remove LEC dashboard
* Frontend: UI design
* Frontend: Button redirection
* Backend: Feedback related functions
* Backend: Share with supervisor
* Backend: Return user detail on login and register
* Database: Add Feedback table
#### Fixed
* Frontend: url to backend controller
* Backend: Duplicate username in DB
* Backend: Error in reset password
* Backend: Format return type JSON array

## Changelog
###[1.0] - 2021-09-19
#### Added
* Frontend: Initialize project using Create React App
* Frontend: Home page
* Frontend: Navigation bar link
* Frontend: Register page
* Frontend: List quiz page
* Frontend: Take quiz page
* Backend: Add SpringBoot Structure
* Backend: Register function
* Backend: Login function
* Backend: MySQL connection
* Backend: Add model corresponding to database design
* Backend: Add mapper interface
* Backend: Retrieve public quiz list
* Backend: Retrieve detailed quiz content
* Backend: Unit test template
* Database: Implement database structure
#### Changed
* Frontend: Navigation bar UI
* Backend: Use new version of Mybatis
* Backend: Controller return ObjectNode
* Database: Database structure
#### Fixed
* Frontend: Connection to backend
* Backend: Remove MapperImpl
* Backend: Remove supervisor login
* Database: Line separator on input



