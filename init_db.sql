/*Data for the table `user` */
insert into `user`(`user_id`,`username`,`password`,`email`,`is_supervisor`) values (1,'supervisor','123456','supervisor@gmail.com',true);
insert into `user`(`user_id`,`username`,`password`,`email`,`is_supervisor`) values (2,'user','123456','user@gmail.com',false);

/*Data for the table `question` */
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (1,'When the group needs suggestions, I...',1,1);

/*Data for the table `question_choices` */
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (1, 1, 'Do not make suggestions',1,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (2, 2, 'Tell the group what to do',1,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (3, 3, 'Discuss my suggestions with the group',1,3);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (4, 5, 'Make sure everyone''s suggestions are heard',1,4);

/*Data for the table `user_result` */
insert into `user_result`(`attempt_id`,`user_id`,`quiz_id`,`choices`,`attempt_times`,`score`,`reflection`,`reflection_time`,`supervisor_id`) values (1, 2, 1, '2', 1, 2, 'I learnt that there is so much more I can do to be better at collaborative learning. I will try to speak up more often and bring my point across confidently next time.', '2021-09-09 01:53:56', 1);

/*Data for the table `user_question_answers` */
insert into `quiz`(`quiz_id`,`quiz_title`,`quiz_background`,`created_by`,`is_public`,`feedback`) values (1, 'Collaborative Learning', 'Collaborative learning is the educational approach of using groups to enhance learning through working together. Groups of two or more learners work together to solve problems, complete tasks, or learn new concepts.\nTake this quiz now to find out how well you do in collaborative learning!', 1, true, '5-7, feedback1, 8-12, feedback2, 13-18, feedback3, 19-22, feedback4');
