package com.berryst.demo.controller;

import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import com.berryst.demo.utils.DataProcessing;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.*;

/**
 * @ClassName QuizControllerTest
 * @Author Shirui Cheng
 * @Description Automatic tests for QuizController
 * @version: v1.0.0
 * @Date 21:24 2021/10/16
 **/
@RunWith(SpringRunner.class)
//@WebMvcTest(QuizController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class QuizControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private QuizService quizServiceMock;

    @Test
    public void getPublicQuizTest()
            throws Exception {

        HashMap first = new HashMap();
        first.put("quiz_id", 1);
        first.put("quiz_title", "Collaborative Learning");
        HashMap second = new HashMap();
        first.put("quiz_id", 2);
        first.put("quiz_title", "Leadership");
        HashMap third = new HashMap();
        first.put("quiz_id", 3);
        first.put("quiz_title", "Resilience");
        List<Map> list = new ArrayList<Map>(Arrays.asList(first, second, third));
        Mockito.when(quizServiceMock.getPublicQuizList())
                .thenReturn((ArrayList<Map>) list);

        String url = "http://localhost:8080/quiz/available_quiz";
        JSONObject params = new JSONObject();

        JSONObject result = new JSONObject();
//        result.put("quizList","[{quiz_id=1, quiz_title=Collaborative Learning}, {quiz_id=2, quiz_title=Leadership}, {quiz_id=3, quiz_title=Resilience}]");
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(JSONObject.toJSONString(params))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void getQuizContentTest()
            throws Exception {
        String data = "{\"quizId\":1,\"quizTitle\":\"Collaborative Learning\",\"quizBackground\":\"Collaborative learning is the educational approach of using groups to enhance learning through working together. Groups of two or more learners work together to solve problems, complete tasks, or learn new concepts.###Take this quiz now to find out how well you do in collaborative learning!\",\"supervisorId\":0,\"questions\":[{\"questionId\":1,\"question\":\"When the group needs suggestions, I...\",\"choices\":[{\"choiceId\":1,\"score\":1,\"choice\":\"Do not make suggestions\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":2,\"score\":2,\"choice\":\"Tell the group what to do\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":3,\"score\":3,\"choice\":\"Discuss my suggestions with the group\",\"questionId\":0,\"questionChoiceOrder\":3},{\"choiceId\":4,\"score\":5,\"choice\":\"Make sure everyone's suggestions are heard\",\"questionId\":0,\"questionChoiceOrder\":4}],\"quizId\":0,\"questionOrder\":1},{\"questionId\":2,\"question\":\"When the group needs opinions about something, I...\",\"choices\":[{\"choiceId\":5,\"score\":1,\"choice\":\"Do not give my opinion\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":6,\"score\":2,\"choice\":\"Give my opinion\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":7,\"score\":4,\"choice\":\"Explain my opinion so the group understands\",\"questionId\":0,\"questionChoiceOrder\":3},{\"choiceId\":8,\"score\":6,\"choice\":\"Give reasons for and against my opinion using evidence\",\"questionId\":0,\"questionChoiceOrder\":4}],\"quizId\":0,\"questionOrder\":2},{\"questionId\":3,\"question\":\"The way I give support for my opinion is...\",\"choices\":[{\"choiceId\":9,\"score\":1,\"choice\":\"I just give my opinion\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":10,\"score\":4,\"choice\":\"I give reasons for my opinion\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":11,\"score\":6,\"choice\":\"I explain how evidence supports my opinion\",\"questionId\":0,\"questionChoiceOrder\":3}],\"quizId\":0,\"questionOrder\":3},{\"questionId\":4,\"question\":\"When I give my opinion...\",\"choices\":[{\"choiceId\":12,\"score\":1,\"choice\":\"I don't ask others what they think of my opinion\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":13,\"score\":3,\"choice\":\"I ask others what they think of my opinion\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":14,\"score\":5,\"choice\":\"I check with others why they think the way they do about my opinion\",\"questionId\":0,\"questionChoiceOrder\":3}],\"quizId\":0,\"questionOrder\":4},{\"questionId\":5,\"question\":\"When I need help when I work in groups...\",\"choices\":[{\"choiceId\":15,\"score\":1,\"choice\":\"I don't ask the group, I ask my teacher\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":16,\"score\":3,\"choice\":\"I ask group members that I like\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":17,\"score\":4,\"choice\":\"I use the group to help me\",\"questionId\":0,\"questionChoiceOrder\":3}],\"quizId\":0,\"questionOrder\":5}],\"feedback\":[{\"feedbackId\":1,\"quizId\":0,\"lowerBound\":5,\"upperBound\":7,\"feedbackContent\":\"At this level, you join in with the group and provide them with opinion. When seeking help from others, you might think that the teacher should be the only source of help. When your peers give you feedback, you probably respond by trying to convince that you are correct, but you would also make the changes suggested.### When engaging with others' thought, you listen and don't interrupt, seeking clarification by stating that you don't understand. You might rely on the teacher to make a plan but able to check the progress of the group.\",\"feedbackOrder\":1},{\"feedbackId\":2,\"quizId\":0,\"lowerBound\":8,\"upperBound\":12,\"feedbackContent\":\"At this level, you give suggestions to the group and are open to discussion about their opinion. When you give your opinion, you ask others what they think of the opinion. When you need help in groups, you tend to ask group members that you are closer with or who you perceive to be the best group member to help you. You tend not to seek feedback or seek it from someone who you know will give you positive feedback. However, if you do receive feedback, you listen and ask questions.### When you disagree with other's opinions, you provide an explanation for why you disagree. When exploring different opinions, you tend to seek peers who have the same opinion as you.### You would enter a discussion to make a group plan. If the group doesn't do well, you will tell the group what they could have done better.\",\"feedbackOrder\":2},{\"feedbackId\":3,\"quizId\":0,\"lowerBound\":13,\"upperBound\":18,\"feedbackContent\":\"At this level, you express your own opinions and make an effort to ensure that you provide evidence and help the group understand. If you need help, you use the group. You initiate feedback, making sure that you seek feedback from someone you know will tell you the truth ensuring the feedback is authentic.### When giving input to others on their learning, you seek clarification and ask questions to fully understand. You make the effort to find out many opinions to have as much information as possible before fully forming your own opinion. When providing help to others, you include an explanation and try to give genuine feedback by checking the standatd the teacher has set and making sure that others feel comfortable to approach you for feedback.### When managing the group, you will join a discussion about how the group is progressing. You check on whether everyone in the group is learning my monitoring progress and making sure the group explores ways to move forward together.\",\"feedbackOrder\":3},{\"feedbackId\":4,\"quizId\":0,\"lowerBound\":19,\"upperBound\":22,\"feedbackContent\":\"At this level, you make sure that when the group needs suggestions that everyone's suggestions are heard. You seek opinions from others about your own perspective, always checking how and why others think about your own opinions. You seek feedback from others on the quality of your work and ask for suggestions for improvement. You ask carious people for feedback so you get a range of feedback and make sure you understand the feedback fully so you can use it to improve.### You genuinely engage in the opinions of others and actively listen and think of questions for clarification. You actively seek the opinion of others to help form your own opinions. You give feedback to others through quality conversation with your peers about the quality of your work. you are able to reflect on the group's learning by initiating discussion on what the group could have done better\",\"feedbackOrder\":4},{\"feedbackId\":5,\"quizId\":0,\"lowerBound\":23,\"upperBound\":26,\"feedbackContent\":\"At this level, you can provide reasons for and against your own opinions and explain how the evidence they provide supports your own opinion. You are open to discussing your own opinion and are able to present others with extensive information from which to critique.### When supporting other's thoughts, you actively show others you are listening by explaining your opinion back to them to check for understanding. You actively seek other's perspectives by engaging in dialogue to explore your opinions and if you question others' opinions you provide counter-evidence to keep the dialogue open.### You harness team work by leading the group to make plans and form opinions together. You lead discussions to make sure everyone in the group is aware of the group's progress.\",\"feedbackOrder\":5}],\"isPublic\":true,\"errorCode\":\"00000\",\"errorMessage\":\"Success\"}";
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        Quiz quiz = objectMapper.readValue(DataProcessing.replaceLineSeparator(data), Quiz.class);

        Mockito.when(quizServiceMock.getQuizContent(1))
                .thenReturn(quiz);

        String url = "http://localhost:8080/quiz/quiz_content";
        JSONObject params = new JSONObject();
        params.put("quizId", 1);

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(JSONObject.toJSONString(params))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void getSupervisorQuizTest()
            throws Exception {
        HashMap first = new HashMap();
        first.put("quiz_id", 1);
        first.put("quiz_title", "Collaborative Learning");
        first.put("is_public", true);

        List<Map> list = new ArrayList<Map>(Arrays.asList(first, first, first));

        Mockito.when(quizServiceMock.getSupervisorQuiz(1))
                .thenReturn((ArrayList<Map>) list);

        String url = "http://localhost:8080/quiz/supervisor_quiz";
        JSONObject params = new JSONObject();
        params.put("userId", 1);

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(JSONObject.toJSONString(params))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void deleteQuizTest()
            throws Exception {
        Mockito.when(quizServiceMock.deleteQuiz(1))
                .thenReturn(1);

        String url = "http://localhost:8080/quiz/delete_quiz";
        JSONObject params = new JSONObject();
        params.put("quizId", 1);

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(JSONObject.toJSONString(params))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void setQuizPublicTest()
            throws Exception {
        Mockito.when(quizServiceMock.setQuizPublic(1))
                .thenReturn(1);

        String url = "http://localhost:8080/quiz/set_public";
        JSONObject params = new JSONObject();
        params.put("quizId", 1);

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(JSONObject.toJSONString(params))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void setQuizPrivateTest()
            throws Exception {
        Mockito.when(quizServiceMock.setQuizPrivate(1))
                .thenReturn(1);

        String url = "http://localhost:8080/quiz/set_private";
        JSONObject params = new JSONObject();
        params.put("quizId", 1);

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(JSONObject.toJSONString(params))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void setQuizTest()
            throws Exception {
        String data = "{\"quizId\":1,\"quizTitle\":\"Collaborative Learning\",\"quizBackground\":\"Collaborative learning is the educational approach of using groups to enhance learning through working together. Groups of two or more learners work together to solve problems, complete tasks, or learn new concepts.###Take this quiz now to find out how well you do in collaborative learning!\",\"supervisorId\":0,\"questions\":[{\"questionId\":1,\"question\":\"When the group needs suggestions, I...\",\"choices\":[{\"choiceId\":1,\"score\":1,\"choice\":\"Do not make suggestions\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":2,\"score\":2,\"choice\":\"Tell the group what to do\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":3,\"score\":3,\"choice\":\"Discuss my suggestions with the group\",\"questionId\":0,\"questionChoiceOrder\":3},{\"choiceId\":4,\"score\":5,\"choice\":\"Make sure everyone's suggestions are heard\",\"questionId\":0,\"questionChoiceOrder\":4}],\"quizId\":0,\"questionOrder\":1},{\"questionId\":2,\"question\":\"When the group needs opinions about something, I...\",\"choices\":[{\"choiceId\":5,\"score\":1,\"choice\":\"Do not give my opinion\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":6,\"score\":2,\"choice\":\"Give my opinion\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":7,\"score\":4,\"choice\":\"Explain my opinion so the group understands\",\"questionId\":0,\"questionChoiceOrder\":3},{\"choiceId\":8,\"score\":6,\"choice\":\"Give reasons for and against my opinion using evidence\",\"questionId\":0,\"questionChoiceOrder\":4}],\"quizId\":0,\"questionOrder\":2},{\"questionId\":3,\"question\":\"The way I give support for my opinion is...\",\"choices\":[{\"choiceId\":9,\"score\":1,\"choice\":\"I just give my opinion\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":10,\"score\":4,\"choice\":\"I give reasons for my opinion\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":11,\"score\":6,\"choice\":\"I explain how evidence supports my opinion\",\"questionId\":0,\"questionChoiceOrder\":3}],\"quizId\":0,\"questionOrder\":3},{\"questionId\":4,\"question\":\"When I give my opinion...\",\"choices\":[{\"choiceId\":12,\"score\":1,\"choice\":\"I don't ask others what they think of my opinion\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":13,\"score\":3,\"choice\":\"I ask others what they think of my opinion\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":14,\"score\":5,\"choice\":\"I check with others why they think the way they do about my opinion\",\"questionId\":0,\"questionChoiceOrder\":3}],\"quizId\":0,\"questionOrder\":4},{\"questionId\":5,\"question\":\"When I need help when I work in groups...\",\"choices\":[{\"choiceId\":15,\"score\":1,\"choice\":\"I don't ask the group, I ask my teacher\",\"questionId\":0,\"questionChoiceOrder\":1},{\"choiceId\":16,\"score\":3,\"choice\":\"I ask group members that I like\",\"questionId\":0,\"questionChoiceOrder\":2},{\"choiceId\":17,\"score\":4,\"choice\":\"I use the group to help me\",\"questionId\":0,\"questionChoiceOrder\":3}],\"quizId\":0,\"questionOrder\":5}],\"feedback\":[{\"feedbackId\":1,\"quizId\":0,\"lowerBound\":5,\"upperBound\":7,\"feedbackContent\":\"At this level, you join in with the group and provide them with opinion. When seeking help from others, you might think that the teacher should be the only source of help. When your peers give you feedback, you probably respond by trying to convince that you are correct, but you would also make the changes suggested.### When engaging with others' thought, you listen and don't interrupt, seeking clarification by stating that you don't understand. You might rely on the teacher to make a plan but able to check the progress of the group.\",\"feedbackOrder\":1},{\"feedbackId\":2,\"quizId\":0,\"lowerBound\":8,\"upperBound\":12,\"feedbackContent\":\"At this level, you give suggestions to the group and are open to discussion about their opinion. When you give your opinion, you ask others what they think of the opinion. When you need help in groups, you tend to ask group members that you are closer with or who you perceive to be the best group member to help you. You tend not to seek feedback or seek it from someone who you know will give you positive feedback. However, if you do receive feedback, you listen and ask questions.### When you disagree with other's opinions, you provide an explanation for why you disagree. When exploring different opinions, you tend to seek peers who have the same opinion as you.### You would enter a discussion to make a group plan. If the group doesn't do well, you will tell the group what they could have done better.\",\"feedbackOrder\":2},{\"feedbackId\":3,\"quizId\":0,\"lowerBound\":13,\"upperBound\":18,\"feedbackContent\":\"At this level, you express your own opinions and make an effort to ensure that you provide evidence and help the group understand. If you need help, you use the group. You initiate feedback, making sure that you seek feedback from someone you know will tell you the truth ensuring the feedback is authentic.### When giving input to others on their learning, you seek clarification and ask questions to fully understand. You make the effort to find out many opinions to have as much information as possible before fully forming your own opinion. When providing help to others, you include an explanation and try to give genuine feedback by checking the standatd the teacher has set and making sure that others feel comfortable to approach you for feedback.### When managing the group, you will join a discussion about how the group is progressing. You check on whether everyone in the group is learning my monitoring progress and making sure the group explores ways to move forward together.\",\"feedbackOrder\":3},{\"feedbackId\":4,\"quizId\":0,\"lowerBound\":19,\"upperBound\":22,\"feedbackContent\":\"At this level, you make sure that when the group needs suggestions that everyone's suggestions are heard. You seek opinions from others about your own perspective, always checking how and why others think about your own opinions. You seek feedback from others on the quality of your work and ask for suggestions for improvement. You ask carious people for feedback so you get a range of feedback and make sure you understand the feedback fully so you can use it to improve.### You genuinely engage in the opinions of others and actively listen and think of questions for clarification. You actively seek the opinion of others to help form your own opinions. You give feedback to others through quality conversation with your peers about the quality of your work. you are able to reflect on the group's learning by initiating discussion on what the group could have done better\",\"feedbackOrder\":4},{\"feedbackId\":5,\"quizId\":0,\"lowerBound\":23,\"upperBound\":26,\"feedbackContent\":\"At this level, you can provide reasons for and against your own opinions and explain how the evidence they provide supports your own opinion. You are open to discussing your own opinion and are able to present others with extensive information from which to critique.### When supporting other's thoughts, you actively show others you are listening by explaining your opinion back to them to check for understanding. You actively seek other's perspectives by engaging in dialogue to explore your opinions and if you question others' opinions you provide counter-evidence to keep the dialogue open.### You harness team work by leading the group to make plans and form opinions together. You lead discussions to make sure everyone in the group is aware of the group's progress.\",\"feedbackOrder\":5}],\"isPublic\":true}";

        Mockito.when(quizServiceMock.setQuiz(new Quiz()))
                .thenReturn(1);

        String url = "http://localhost:8080/quiz/set_quiz";
        org.json.JSONObject params = new org.json.JSONObject(data);

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(params.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }
}