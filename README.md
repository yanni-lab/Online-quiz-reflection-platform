# Database

**Steps to initialise mysql database:**

1. `mysql -u root -p`

2. enter password

3. run the script in `create_db.sql`  and `init_db.sql`
4. `cd /Backend`
5. change the `spring.datasource.username` and `spring.datasource.password` in the top 2 lines
   in `/Backend/src/main/resources/application.properties`

**Database Design**

7 tables:

**user**

```
user_id               int, PK 
username              varchar
password              varchar
email                 varchar
is_supervisor         boolean
```

**question**

```
question_id           int, PK
question              varchar
quiz_id               int, FK(quiz.quiz_id)
question_order        int
```

**question_choices**

```
choice_id             int, PK 
score                 int
choice                varchar
question_id           int, FK(question.question_id)
question_choice_order int
```

**uesr_result**

```
attempt_id            int, PK 
user_id               int
quiz_id               int, quiz.quiz_id
choices               varchar
attempt_times         int
score                 int
reflection            varchar
reflection_available  boolean
reflection_time       datetime
supervisor_id         int
```

**quiz**

```
quiz_id               int, PK 
quiz_title            varchar
quiz_background       varchar
created_by            int, supervisor.user_id
is_public             boolean
is_available          boolean
```

**feedback**

```
feedback_id           int, PK 
lower_bound           int
upper_bound           int
feedback_content      varchar
quiz_id               int, FK(quiz.quiz_id)
feedback_order        int
```

**comment**

```
comment_id            int, PK 
comment               varchar
comment_time          datetime
```

# Frontend

**Steps to initialise react:**

1. `git clone` the frontend folder

2. `cd /Frontend` to get access to this frontend folder

3. `npx install react-bootstrap` to load the ui-related package, install the node_modules before run the project

4. `npm start` to start the project

5. The website will be open at localhost:3000


# Berry Street Project - Boxjelly
## Table of Contents

1. [Project Overview](#project-overview)
2. [Demo](#demo)
3. [Features](#features)
4. [Documentation](#documentation)
5. [System Requirements](#system-requirements)
6. [Setup Guide](#setup-guide)
7. [Testing](#testing)
8. [Changelog](#changelog)

## Project Overview

A self-reflection online platform for young people with lived experiences from disadvantaged backgrounds. More information can be found in the [project background](./docs/ProjectBackground.pdf).

## Demo

The demo video will be uploaded after the final presentation.

## Features

**Sprint 1**

For sprint 1, we plan to focus on developing the functionality for LECs  to take quizzes. The user should be able to complete the entire workflow as an LEC, meaning he/she can choose which quiz to take, select the  answers to each quiz, check and edit previous answers, see feedback, and write user experience comments.

The organized user stories in sprint 1 are: US01, US02, US03, US04, US08, US09, US10, US11



**Sprint 2**

For sprint 2, we plan to focus on developing the functionality for  Supervisors to create and manage quizzes, as well as ensuring that LECs  can view the quizzes they have taken. The supervisor should be able to  complete the entire workflow as a supervisor, meaning he/she can create  the quiz, set the quiz public or private, edit the quiz, delete the  quiz, view the feedback and user experience of LECs who chose to share  with them. 

The organized user stories in sprint 2 are: US05, US06, US07, US12, US13, US14, US15, US16, US17, US18, US19, US20, US21

## Documentation

`docs/` (process documentation)

- [Project Background](./docs/ProjectBackground.pdf)
- [Project Requirements](./docs/ProjectRequirements.pdf)
- [Motivational Model](./docs/MotivationalModel.pdf)
- [User stories](./docs/UsersStories.pdf)
- [High Level Component Diagram](./docs/ComponentDiagram.pdf)
- [Database ER Diagram](./docs/ERDiagram.pdf)
- [Sequence Diagram](./docs/SequenceDiagram.pdf)

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

## Setup Guide

setup and configuration details to install/run your code

## Testing

`tests/`

- [Acceptance criteria](./tests/AcceptanceCriteria.pdf)
- [Acceptance tests](./tests/UserAcceptanceTests.pdf)

## Changelog

#Backend
##Project Structure
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
##User Guide
1. Make sure you have a working `Java 11` environment. 
   (Open a shell and run `java --version` to check your Java version.)
2. Make sure you have your `MySQL server` running.
3. On [release](https://github.com/yanni-lab/COMP90082-2021-SM2-ST-Boxjelly/releases)
page download `berryst-1.0.0.jar` file.
4. On shell run `java -jar <path-to-file>berryst-1.0.0.jar`.



