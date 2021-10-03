/*Data for the table `user` */
insert into `user`(`user_id`,`username`,`password`,`email`,`is_supervisor`) values (1,'EmmaW','123456','emmaw@gmail.com',true);
insert into `user`(`user_id`,`username`,`password`,`email`,`is_supervisor`) values (2,'jasonwork','123456','jasonx@firefox.com',true);
insert into `user`(`user_id`,`username`,`password`,`email`,`is_supervisor`) values (3,'mario35','123456','mario35@gmail.com',false);
insert into `user`(`user_id`,`username`,`password`,`email`,`is_supervisor`) values (4,'nordpass','123456','nordpass@qq.com',false);

/*Data for the table `user_question_answers` */
insert into `quiz`(`quiz_id`,`quiz_title`,`quiz_background`,`created_by`,`is_public`,`is_available`) values (1, 'Collaborative Learning', 'Collaborative learning is the educational approach of using groups to enhance learning through working together. Groups of two or more learners work together to solve problems, complete tasks, or learn new concepts.###Take this quiz now to find out how well you do in collaborative learning!', 1, true,1);

insert into `quiz`(`quiz_id`,`quiz_title`,`quiz_background`,`created_by`,`is_public`,`is_available`) values (2, 'Leadership', 'What is your leadership style? This quiz will help you to identify the style that you naturally lean toward, and introduce you to alternative approaches that you might find it helpful to develop, and the occasions when they may be appropriate.', 2, true,1);

insert into `quiz`(`quiz_id`,`quiz_title`,`quiz_background`,`created_by`,`is_public`, `is_available`) values (3, 'Resilience', 'How Resilient Are You? This quiz will help you understand and assess how resilient you are, and it provides advice and guidance that you can use to become even more resilient.', 2, true,1);

/*Data for the table `question` */
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (1,'When the group needs suggestions, I...',1,1);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (2,'When the group needs opinions about something, I...',1,2);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (3,'The way I give support for my opinion is...',1,3);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (4,'When I give my opinion...',1,4);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (5,'When I need help when I work in groups...',1,5);

insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (6,'If there is serious conflict within my team...',2,1);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (7,'I trust my team members...',2,2);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (8,'The best way for me to ensure that my team meets its goals is to...',2,3);

insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (9,'When given a new task, I''m confident that I''ll succeed...',3,1);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (10,'When one attempt fails, I learn from it and change my approach next time.',3,2);
insert into `question`(`question_id`,`question`,`quiz_id`,`question_order`) values (11,'When a task doesn''t go to plan, it affects my self belief.',3,3);


/*Data for the table `question_choices` */
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (1, 1, 'Do not make suggestions',1,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (2, 2, 'Tell the group what to do',1,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (3, 3, 'Discuss my suggestions with the group',1,3);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (4, 5, 'Make sure everyone''s suggestions are heard',1,4);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (5, 1, 'Do not give my opinion',2,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (6, 2, 'Give my opinion',2,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (7, 4, 'Explain my opinion so the group understands',2,3);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (8, 6, 'Give reasons for and against my opinion using evidence',2,4);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (9, 1, 'I just give my opinion',3,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (10, 4, 'I give reasons for my opinion',3,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (11, 6, 'I explain how evidence supports my opinion',3,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (12, 1, 'I don''t ask others what they think of my opinion',4,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (13, 3, 'I ask others what they think of my opinion',4,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (14, 5, 'I check with others why they think the way they do about my opinion',4,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (15, 1, 'I don''t ask the group, I ask my teacher',5,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (16, 3, 'I ask group members that I like',5,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (17, 4, 'I use the group to help me',5,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (18, 1, 'I remind everyone that we have goals to meet',6,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (19, 3, 'I bring my people together so that we can talk it through',6,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (20, 4, 'I let them work by themselves so that they don''t have to bother one another',6,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (21, 1, 'Very much',7,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (22, 3, 'A fair amount',7,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (23, 4, 'Not at all',7,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (24, 1, 'Lead from the front',8,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (25, 3, 'Encourage participation from everyone',8,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (26, 4, 'Delegate often and widely',8,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (27, 1, 'Agree',9,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (28, 5, 'Neither Agree Nor Disagree',9,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (29, 10, 'Disagree',9,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (30, 1, 'Agree',10,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (31, 5, 'Neither Agree Nor Disagree',10,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (32, 10, 'Disagree',10,3);

insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (33, 1, 'Agree',11,1);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (34, 5, 'Neither Agree Nor Disagree',11,2);
insert into `question_choices`(`choice_id`,`score`,`choice`,`question_id`,`question_choice_order`) values (35, 10, 'Disagree',11,3);

/*Data for the table `feedback` */
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (1,5,7,'At this level, you join in with the group and provide them with opinion. When seeking help from others, you might think that the teacher should be the only source of help. When your peers give you feedback, you probably respond by trying to convince that you are correct, but you would also make the changes suggested.### When engaging with others'' thought, you listen and don''t interrupt, seeking clarification by stating that you don''t understand. You might rely on the teacher to make a plan but able to check the progress of the group.',1,1);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (2,8,12,'At this level, you give suggestions to the group and are open to discussion about their opinion. When you give your opinion, you ask others what they think of the opinion. When you need help in groups, you tend to ask group members that you are closer with or who you perceive to be the best group member to help you. You tend not to seek feedback or seek it from someone who you know will give you positive feedback. However, if you do receive feedback, you listen and ask questions.### When you disagree with other''s opinions, you provide an explanation for why you disagree. When exploring different opinions, you tend to seek peers who have the same opinion as you.### You would enter a discussion to make a group plan. If the group doesn''t do well, you will tell the group what they could have done better.',1,2);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (3,13,18,'At this level, you express your own opinions and make an effort to ensure that you provide evidence and help the group understand. If you need help, you use the group. You initiate feedback, making sure that you seek feedback from someone you know will tell you the truth ensuring the feedback is authentic.### When giving input to others on their learning, you seek clarification and ask questions to fully understand. You make the effort to find out many opinions to have as much information as possible before fully forming your own opinion. When providing help to others, you include an explanation and try to give genuine feedback by checking the standatd the teacher has set and making sure that others feel comfortable to approach you for feedback.### When managing the group, you will join a discussion about how the group is progressing. You check on whether everyone in the group is learning my monitoring progress and making sure the group explores ways to move forward together.',1,3);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (4,19,22,'At this level, you make sure that when the group needs suggestions that everyone''s suggestions are heard. You seek opinions from others about your own perspective, always checking how and why others think about your own opinions. You seek feedback from others on the quality of your work and ask for suggestions for improvement. You ask carious people for feedback so you get a range of feedback and make sure you understand the feedback fully so you can use it to improve.### You genuinely engage in the opinions of others and actively listen and think of questions for clarification. You actively seek the opinion of others to help form your own opinions. You give feedback to others through quality conversation with your peers about the quality of your work. you are able to reflect on the group''s learning by initiating discussion on what the group could have done better',1,4);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (5,23,26,'At this level, you can provide reasons for and against your own opinions and explain how the evidence they provide supports your own opinion. You are open to discussing your own opinion and are able to present others with extensive information from which to critique.### When supporting other''s thoughts, you actively show others you are listening by explaining your opinion back to them to check for understanding. You actively seek other''s perspectives by engaging in dialogue to explore your opinions and if you question others'' opinions you provide counter-evidence to keep the dialogue open.### You harness team work by leading the group to make plans and form opinions together. You lead discussions to make sure everyone in the group is aware of the group''s progress.',1,5);

insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (6,1,8,'You most commonly adopt an authoritarian or autocratic leadership style. You rarely consult your team members and, instead, tend to tell them what you want, when you want it, and how you want it done.### This style works well in a crisis, when a task must be completed quickly. However, you will likely demoralize, demotivate and aggravate people if you use it all the time. This can translate into high absenteeism and turnover rates. You will also miss out on a wealth of ideas, thereby stifling innovation and creativity.',2,1);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (7,9,16,'You lean toward a democratic or participative style of leadership. You tend to set the parameters for the work and have the final say on decisions, but you actively involve your team members in the process.### This style can build trust between you and your people, as they will likely feel engaged and valued. But it is not great in a high-pressure situation that requires a fast turnaround, as it will slow you down. And, if you dislike disagreement or conflict, you might struggle with how people respond to consultation.',2,2);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (8,17,25,'Your default leadership style is probably delegating or laissez faire. You give your team members free rein in how they work toward their goals.### This is an ideal approach when your people are highly skilled and motivated, and when you''re working with contractors and freelancers who you trust. But if a team member is inexperienced or untrustworthy, or if you lose sight of what''s going on, this approach can backfire catastrophically.',2,3);

insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (9,1,15,'You have little resilience in the workplace, and this may affect your ability to do your job. However, don''t let this get the better of you! It''s important to identify the causes of this, so that you can take specific action. Perhaps your confidence is shaky, or you have a negative outlook. Maybe you don''t have effective strategies to cope with stress, or you''re trying to deal with issues that are beyond your control. Don''t give up - there are lots of tools that you can use to unlock resilience and become a positive, productive team member.',3,1);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (10,16,30,'You''re not easily defeated, but there''s still plenty of room for improvement. Perhaps you need strong goals to focus your efforts, or it could help to reframe your problems as challenges. Maybe you need to address the strength of your working relationships. Have a look through your answers, and try to pinpoint where you need to focus your efforts. You may need to build your skills in just one or two areas, or make small changes in several.',3,2);
insert into `feedback`(`feedback_id`,`lower_bound`,`upper_bound`,`feedback_content`, `quiz_id`, `feedback_order`) values (11,31,45,'Well done, you''re a resilient team member and you''re prepared to keep trying until you succeed! You most likely have a solid network of colleagues who you can rely on for support, you deal effectively with stress, and you''re flexible in your approach. You''re goal oriented, you have a positive disposition and strong values, and you''re willing to take on challenges and help people out. However, there is always room for improvement.',3,3);


/*Data for the table `user_result` */
-- insert into `user_result`(`attempt_id`,`user_id`,`quiz_id`,`choices`,`attempt_times`,`score`,`reflection`,`reflection_time`,`supervisor_id`) values (1, 2, 1, '2', 1, 2, 'I learnt that there is so much more I can do to be better at collaborative learning. I will try to speak up more often and bring my point across confidently next time.', '2021-09-09 01:53:56', 1);

/*Data for the table `comment` */
insert into `comment`(`comment`,`comment_time`) values ('1. This is a test user comment.','2021-09-09 01:53:56');
insert into `comment`(`comment`,`comment_time`) values ('2. This is a test user comment.','2021-09-10 01:53:56');
insert into `comment`(`comment`,`comment_time`) values ('3. This is a test user comment.','2021-09-11 01:53:56');
insert into `comment`(`comment`,`comment_time`) values ('4. This is a test user comment.','2021-09-12 01:53:56');