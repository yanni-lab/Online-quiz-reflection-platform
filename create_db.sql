CREATE DATABASE `berry_street`;
USE `berry_street`;

/*Table structure for table `user` */
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique user id',
`username` varchar(30) NOT NULL COMMENT 'log in username',
`password` varchar(30) NOT NULL COMMENT 'log in password',
`email` varchar(30) NOT NULL COMMENT 'log in email',
PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */
insert into `user`(`user_id`,`username`, `password`,`email`) values (1,'user','123456','example@gmail.com');


/*Table structure for table `supervisor` */
DROP TABLE IF EXISTS `supervisor`;
CREATE TABLE `supervisor` (
`user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique supervisor id',
`username` varchar(30) NOT NULL COMMENT 'log in username',
`password` varchar(30) NOT NULL COMMENT 'log in password',
`email` varchar(30) NOT NULL COMMENT 'log in email',
PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `supervisor` */
insert into `supervisor`(`user_id`,`username`,`password`,`email`) values (1,'supervisor','123456','example@gmail.com');


/*Table structure for table `question` */
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
`question_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique question id',
`question` varchar(100) NOT NULL COMMENT 'question content',
`quiz_id` int(10) NOT NULL COMMENT 'quiz_id from `quiz` table',
PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `question` */
insert into `question`(`question_id`,`question`,`quiz_id`) values (1,'When the group needs suggestions, I...',1);


/*Table structure for table `question_choices` */
DROP TABLE IF EXISTS `question_choices`;
CREATE TABLE `question_choices` (
`choice_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique choice id',
`mark` int(10) NOT NULL COMMENT 'corresponding mark for each choice',
`choice` varchar(100) NOT NULL COMMENT 'choice content',
`question_id` int(10) NOT NULL COMMENT 'question_id from `question` table',
PRIMARY KEY (`choice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `question_choices` */
insert into `question_choices`(`choice_id`,`mark`,`choice`,`question_id`) values (1, 1, 'Do not make suggestions',1);
insert into `question_choices`(`choice_id`,`mark`,`choice`,`question_id`) values (2, 2, 'Tell the group what to do',1);
insert into `question_choices`(`choice_id`,`mark`,`choice`,`question_id`) values (3, 3, 'Discuss my suggestions with the group',1);
insert into `question_choices`(`choice_id`,`mark`,`choice`,`question_id`) values (4, 5, 'Make sure everyone''s suggestions are heard',1);


/*Table structure for table `user_question_answers` */
DROP TABLE IF EXISTS `user_question_answers`;
CREATE TABLE `user_question_answers` (
`attempt_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique attempt id',
`user_id` int(10) NOT NULL COMMENT 'user_id from `user` table',
`quiz_id` int(10) NOT NULL COMMENT 'quiz_id from `quiz` table',
`question_id` int(10) NOT NULL COMMENT 'question_id from `question` table',
`choice_id` int(10) NOT NULL COMMENT 'choice_id from `choice` table',
`attempt_time` datetime DEFAULT NULL COMMENT 'attempt time',
PRIMARY KEY (`attempt_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_question_answers` */
insert into `user_question_answers`(`attempt_id`,`user_id`,`quiz_id`,`question_id`,`choice_id`,`attempt_time`) values (1, 1, 1, 1, 1, '2021-09-09 01:53:56');


/*Table structure for table `quiz` */
DROP TABLE IF EXISTS `quiz`;
CREATE TABLE `quiz` (
`quiz_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique quiz id',
`quiz_title` varchar(30) NOT NULL COMMENT 'quiz title',
`quiz_background` varchar(300) NOT NULL COMMENT 'quiz background',
`created_by` int(10) NOT NULL COMMENT 'user_id from `supervisor` table',
`is_public` boolean COMMENT 'whether the quiz is public',
PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_question_answers` */
insert into `quiz`(`quiz_id`,`quiz_title`,`quiz_background`,`created_by`,`is_public`) values (1, 'Collaborative Learning', 'Collaborative learning is the educational approach of using groups to enhance learning through working together. Groups of two or more learners work together to solve problems, complete tasks, or learn new concepts.\nTake this quiz now to find out how well you do in collaborative learning!', 1, true);


/*Table structure for table `feedback` */
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
`feedback_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique feedback id',
`mark_range_min` int(10) NOT NULL COMMENT 'from this number',
`mark_range_max` int(10) NOT NULL COMMENT 'to this number',
`feedback_content` varchar(1000) NOT NULL COMMENT 'feedback content',
`quiz_id` int(10) NOT NULL COMMENT 'quiz_id from `quiz` table',
PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_question_answers` */
insert into `feedback`(`feedback_id`,`mark_range_min`,`mark_range_max`,`feedback_content`,`quiz_id`) values (1, 5, 7, 'At this level, you join in with the group and provide them with opinion. When seeking help from others, you might think that the teacher should be the only source of help. When your peers give you feedback, you probably respond by trying to convince that you are correct, but you would also make the changes suggested.\n\nWhenengaging with others'' thought, you listen and don''t interrupt, seeking clarification by stating that you don''t understand. You might rely on the teacher to make a plan but able to check the progress of the group.', 1);
insert into `feedback`(`feedback_id`,`mark_range_min`,`mark_range_max`,`feedback_content`,`quiz_id`) values (2, 8, 12, 'At this level, you give suggestions to the group and are open to discussion about their opinion. When you give your opinion, you ask others what they think of the opinion. When you need help in groups, you tend to ask group members that you are closer with or who you perceive to be the best group member to help you. You tend not to seek feedback or seek it from someone who you know will give you positive feedback. However, if you do receive feedback, you listen and ask questions.\n\nWhen you disagree with other''s opinions, you provide an explanation for why you disagree. When exploring different opinions, you tend to seek peers who have the same opinion as you.\n\nYou would enter a discussion to make a group plan. If the group doesn''t do well, you will tell the group what they could have done better.', 1);
insert into `feedback`(`feedback_id`,`mark_range_min`,`mark_range_max`,`feedback_content`,`quiz_id`) values (3, 13, 18, 'At this level, you express your own opinions and make an effort to ensure that you provide evidence and help the group understand. If you need help, you use the group. You initiate feedback, making sure that you seek feedback from someone you know will tell you the truth ensuring the feedback is authentic.\n\nWhen giving input to others on their learning, you seek clarification and ask questions to fully understand. You make the effort to find out many opinions to have as much information as possible before fully forming your own opinion. When providing help to others, you include an explanation and try to give genuine feedback by checking the standatd the teacher has set and making sure that others feel comfortable to approach you for feedback.\n\nWhen managing the group, you will join a discussion about how the group is progressing. You check on whether everyone in the group is learning my monitoring progress and making sure the group explores ways to move forward together.', 1);
insert into `feedback`(`feedback_id`,`mark_range_min`,`mark_range_max`,`feedback_content`,`quiz_id`) values (4, 19, 22, 'At this level, you make sure that when the group needs suggestions that everyone''s suggestions are heard. You seek opinions from others about your own perspective, always checking how and why others think about your own opinions. You seek feedback from others on the quality of your work and ask for suggestions for improvement. You ask carious people for feedback so you get a range of feedback and make sure you understand the feedback fully so you can use it to improve.\n\nYou geuinely engage in the opinions of others and actively listen and think of questions for clarification. You actively seek the opinion of others to help form your own opinions. You give feedback to others through quality conversation with your peers about the quality of your work. you are able to reflect on the group''s learning by initating discussion on what the group could have done better.', 1);


/*Table structure for table `user_reflection` */
DROP TABLE IF EXISTS `user_reflection`;
CREATE TABLE `user_reflection` (
`reflection_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique attempt id',
`user_id` int(10) NOT NULL COMMENT 'user_id from `user` table',
`quiz_id` int(10) NOT NULL COMMENT 'quiz_id from `quiz` table',
`feedback_id` int(10) NOT NULL COMMENT 'feedback_id from `feedback` table',
`reflection` varchar(1000) COMMENT 'user''s reflection diary',
`share_email` varchar(30) COMMENT 'the email address the user would like to share feedback to',
`ux_comment` varchar(1000) COMMENT 'user experience comment',
`reflection_time` datetime DEFAULT NULL COMMENT 'reflection time',
PRIMARY KEY (`reflection_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_reflection` */
insert into `user_reflection`(`reflection_id`,`user_id`,`quiz_id`,`feedback_id`,`reflection`, `share_email`, `ux_comment`, `reflection_time`) values (1, 1, 1, 2, 'I learnt that there is so much more I can do to be better at collaborative learning. I will try to speak up more often and bring my point across confidently next time.', 'share_example@gmail.com', 'Really nice user interface!', '2021-09-09 01:53:56');
