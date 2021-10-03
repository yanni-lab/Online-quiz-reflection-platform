CREATE DATABASE `berry_street`;
USE `berry_street`;

/*Table structure for table `user` */
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique user id',
`username` varchar(30) NOT NULL COMMENT 'log in username',
`password` varchar(30) NOT NULL COMMENT 'log in password',
`email` varchar(30) NOT NULL COMMENT 'log in email',
`is_supervisor` boolean COMMENT 'whether the user is supervisor',
PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `quiz` */
DROP TABLE IF EXISTS `quiz`;
CREATE TABLE `quiz` (
`quiz_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique quiz id',
`quiz_title` varchar(30) NOT NULL COMMENT 'quiz title',
`quiz_background` varchar(300) NOT NULL COMMENT 'quiz background',
`created_by` int(10) NOT NULL COMMENT 'user_id from `supervisor` table',
`is_public` boolean COMMENT 'whether the quiz is public',
# `feedback` varchar(10000) NOT NULL COMMENT 'feedback of the quiz',
`is_available` boolean COMMENT 'the quiz is deleted or not',
PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `question` */
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
`question_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique question id',
`question` varchar(100) NOT NULL COMMENT 'question content',
`quiz_id` int(10) NOT NULL COMMENT 'quiz_id from `quiz` table',
`question_order` int(10) NOT NULL COMMENT 'question order',
PRIMARY KEY (`question_id`),
FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*Table structure for table `question_choices` */
DROP TABLE IF EXISTS `question_choices`;
CREATE TABLE `question_choices` (
`choice_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique choice id',
`score` int(10) NOT NULL COMMENT 'corresponding score for each choice',
`choice` varchar(100) NOT NULL COMMENT 'choice content',
`question_id` int(10) NOT NULL COMMENT 'question_id from `question` table',
`question_choice_order` int(10) NOT NULL COMMENT 'question choice order',
PRIMARY KEY (`choice_id`),
FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `feedback` */
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
`feedback_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique feedback id',
`lower_bound` int(10) NOT NULL COMMENT 'lower bound of feedback',
`upper_bound` int(10) NOT NULL COMMENT 'upper bound of feedback',
`feedback_content` varchar(10000) NOT NULL COMMENT 'feedback content',
`quiz_id` int(10) NOT NULL COMMENT 'quiz_id from `quiz` table',
`feedback_order` int(10) NOT NULL COMMENT 'feedback order',
PRIMARY KEY (`feedback_id`),
FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `user_result` */
DROP TABLE IF EXISTS `user_result`;
CREATE TABLE `user_result` (
`attempt_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique attempt id',
`user_id` int(10) NOT NULL COMMENT 'user_id from `user` table',
`quiz_id` int(10) NOT NULL COMMENT 'quiz_id from `quiz` table',
`choices` varchar(100) NOT NULL COMMENT 'list of choice order',
`attempt_times` int(10) NOT NULL COMMENT 'attempt times',
`score` int(10) NOT NULL COMMENT 'user score',
`reflection` varchar(3000) COMMENT 'user''s reflection diary',
`reflection_time` datetime DEFAULT NULL COMMENT 'reflection time',
`supervisor_id` int(10) NOT NULL COMMENT 'supervisor''s user_id from `user` table',
PRIMARY KEY (`attempt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `comment` */
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
`comment_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique comment id',
`user_id` int(10) NOT NULL COMMENT 'user_id from `user` table',
`comment` varchar(3000) COMMENT 'user''s comment on website',
`comment_time` datetime DEFAULT NULL COMMENT 'comment time',
PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;