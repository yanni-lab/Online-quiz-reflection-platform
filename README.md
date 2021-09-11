# Database
**Steps to initialise mysql database:**

1. `mysql -u root -p`

2. enter password

3. run the script in `create_db.sql` 
4. `cd /Backend`
5. change the `spring.datasource.username` and `spring.datasource.password` in the top 2 lines in `/Backend/src/main/resources/application.properties`



**Database Design**

https://dbdiagram.io/d/6139cf89825b5b0146fa5e75

8 tables:

**users**

```
user_id               int, PK 
username              varchar
password              varchar
email                 varchar
```

**supervisor** 

```
user_id               int, PK 
username              varchar
password              varchar
email                 varchar
```

**question** 

```
question_id           int, PK
question              varchar
quiz_id               int, quiz.quiz_id
```

**question_choices** 

```
choice_id             int, PK 
mark                  int
choice                varchar
question_id           int, question.question_id
```

**uesr_question_answers** 

```
attempt_id            int, PK 
user_id               int, PK
quiz_id               int, quiz.quiz_id
question_id           int, question.question_id
choice_id             int, question_choice.choice_id
attempt_time          datetime
```

**quiz** 

```
quiz_id               int, PK 
quiz_title            varchar
quiz_background       varchar
created_by            supervisor.user_id
is_public             boolean
```

**feedback**

```
feedback_id           int, PK 
mark_range_min        int
mark_range_max        int
feedback_content      varchar
quiz_id               int, quiz.quiz_id
```

**user_reflection** 

```
reflection_id         int, PK 
user_id               int, user.user_id, PK
quiz_id               int, quiz.quiz_id
feedback_id           int, feedback.feedback_id
reflection            varchar
share_email           varchar
ux_comment            varchar
reflection_time       datetime
```



**SQL Queries Examples**

1. Login with `username = "user"` and `password = "123456"`

```sql
select * from user where username = "user" and password = "123456"
```

2. Register with `username = "register"` and `password = "123456"`and `email = "register@gmail.com"`

```sql
insert into user (user_id, username, password, email) values (2, "register", "123456", "register@gmail.com")
```

3. Get all public quizzes

```sql
select * from quiz where is_public = true
```

4. Get all quizzes created by the supervisor with`user_id = 1`

```sql
select * from quiz where created_by = 1
```

5. Delete a quiz with `quiz_title = "Collaborative Learning"`

```sql
delete from quiz where quiz_title = "Collaborative Learning"
```

6. Make quiz private/public 

```sql
update quiz set is_public = false where quiz_id = 1
```

7. Add a quiz `quiz_id = 2` with 1question `question_id = 2` and 4 optioins `choice_id = 5, 6, 7, 8`, also 4 feedbacks `feedback_id = 5, 6, 7, 8`

```sql
insert into quiz(quiz_id, quiz_title, quiz_background, created_by, is_public) values (2, 'Something new', 'quiz overview', 1, true);

insert into question(question_id, question, quiz_id) values (2, 'new question' ,2);

insert into question_choices(choice_id, mark, choice, question_id) values (5, 1, 'option A',2);
insert into question_choices(choice_id, mark, choice, question_id) values (6, 2, 'option B',2);
insert into question_choices(choice_id, mark, choice, question_id) values (7, 3, 'option C',2);
insert into question_choices(choice_id, mark, choice, question_id) values (8, 5, 'option D',2);

insert into feedback(feedback_id, mark_range_min, mark_range_max, feedback_content, quiz_id) values (5, 5, 7, 'Feedback_1', 2);
insert into feedback(feedback_id, mark_range_min, mark_range_max, feedback_content, quiz_id) values (6, 8, 12, 'Feedback_2', 2);
insert into feedback(feedback_id, mark_range_min, mark_range_max, feedback_content, quiz_id) values (7, 13, 18, 'Feedback_3', 2);
insert into feedback(feedback_id, mark_range_min, mark_range_max, feedback_content, quiz_id) values (8, 19, 22, 'Feedback_4', 2);
```

8. Edit quiz `quiz_id = 2`  by changing Feedback_4 `feedback_id = 8`

```sql
update feedback set mark_range_max = 100 where quiz_id = 2 and feedback_id = 8
```

9. Get available quizzes for LEC

```sql
select quiz_id, quiz_title from quiz where is_public = true
```

10. Load selected quiz `quiz_id = 2` with question list for LEC 

```sql
select Q.quiz_id, Q.quiz_title, Q.quiz_background, QUE.question_id, QUE.question, QC.choice_id, QC.mark, QC.choice 
from quiz as Q 
inner join question as QUE
inner join question_choices as QC
on Q.quiz_id = QUE.quiz_id 
and QUE.question_id = QC.question_id
where Q.quiz_id = 2
```

11. Load selected quiz `quiz_id = 2` with feedback list for LEC 

```sql
select Q.quiz_id, Q.quiz_title, Q.quiz_background, F.mark_range_min, F.mark_range_max, F.feedback_content 
from quiz as Q 
inner join feedback as F 
on Q.quiz_id = F.quiz_id
where Q.quiz_id = 2
```

12. Save LEC's `user_id = 2` choices taking `quiz_id = 2`

```sql
insert into user_question_answers(attempt_id, user_id, quiz_id, question_id, choice_id, attempt_time) values (2, 2, 2, 2, 3, '2021-09-10 01:53:56');
```

13. Calculate LEC's  `user_id = 2` final mark taking `quiz_id = 2`

```sql
select sum(mark)
from user_question_answers as UQA
inner join question_choices as QC
on QC.question_id = UQA.question_id and QC.choice_id = UQA.choice_id 
where UQA.quiz_id = 2 and UQA.user_id = 2
```

14. Show the feedback corresponding to this final mark `5`  taking `quiz_id = 2`

```sql
select feedback_id, feedback_content
from feedback
where mark_range_min <= 5 and mark_range_max >= 5 and quiz_id = 2
```

15. Save LEC's reflection diary into their account

```sql
insert into user_reflection(reflection_id, user_id, quiz_id, feedback_id, reflection, reflection_time) values (2, 2, 2, 5, 'I learnt balabala','2021-09-09 01:53:56')
```

16. Save LEC's user experience comment

```sql
update user_reflection set ux_comment = 'Really nice user interface!'
```

17. Save LEC's share email 

```sql
update user_reflection set share_email = 'sth@gmail.com'
```

##Edit
1. Add question order and choice order
2. Combine user_question_answer, user_reflection
tables to result table. Filter by attempt_id.

**quiz_result**
   choices-> list of choice order
```
attempt_id            int, PK 
user_id               int
quiz_id               int
choices               varchar
attempt_times         int
score                 int
reflection            varchar
```

Feedback table to quiz table
feedback-> ArrayList<String> 






