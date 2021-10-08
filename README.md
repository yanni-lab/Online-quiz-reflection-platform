# Database
**Steps to initialise mysql database:**

1. `mysql -u root -p`

2. enter password

3. run the script in `create_db.sql`  and `init_db.sql`
4. `cd /Backend`
5. change the `spring.datasource.username` and `spring.datasource.password` in the top 2 lines in `/Backend/src/main/resources/application.properties`



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







