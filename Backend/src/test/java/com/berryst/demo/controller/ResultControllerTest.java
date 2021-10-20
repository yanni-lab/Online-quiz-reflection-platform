package com.berryst.demo.controller;

import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuizResult;
import com.berryst.demo.service.QuizService;
import com.berryst.demo.service.ResultService;
import com.berryst.demo.utils.DataProcessing;
import com.berryst.demo.utils.EmailService;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @ClassName ResultControllerTest
 * @Author Shirui Cheng
 * @Description Automatic tests for ResultController
 * @version: v1.0.0
 * @Date 21:24 2021/10/16
 **/
@RunWith(SpringRunner.class)
//@WebMvcTest(QuizController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ResultControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ResultService resultServiceMock;

    @MockBean
    private QuizService quizServiceMock;

    @MockBean
    private EmailService emailServiceMock;

    @Test
    public void saveResultTest()
            throws Exception {
        String data = "{\n" +
                "  \"userId\":1,\n" +
                "  \"quizId\":1,\n" +
                "  \"choices\":[2,3,1,2,1],\n" +
                "  \"score\":10,\n" +
                "  \"reflection\":\"testreflection\\nline2\",\n" +
                "  \"reflectionAvailable\":false,\n" +
                "  \"supervisorId\":1,\n" +
                "  \"isSaved\":false\n" +
                "}";

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        QuizResult testResult = objectMapper.readValue(DataProcessing.replaceLineSeparator(data), QuizResult.class);

        Mockito.when(resultServiceMock.saveResult(testResult))
                .thenReturn(1);

        String url = "http://localhost:8080/result/save_result";

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(data)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void shareResultTest()
            throws Exception {
        String data = "{\n" +
                "  \"userId\":1,\n" +
                "  \"quizId\":1,\n" +
                "  \"choices\":[2,3,1,2,1],\n" +
                "  \"score\":10,\n" +
                "  \"reflection\":\"testreflection\",\n" +
                "  \"supervisor_id\":1,\n" +
                "  \"reflectionAvailable\":true,\n" +
                "  \"email\":\"test@gmail.com\",\n" +
                "  \"isSaved\":false\n" +
                "}";

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        QuizResult testResult = objectMapper.readValue(DataProcessing.replaceLineSeparator(data), QuizResult.class);

        Mockito.when(resultServiceMock.saveResult(testResult))
                .thenReturn(1);

        Mockito.when(emailServiceMock.sendMail("test@gmail.com","title",testResult))
                .thenReturn(1);

        String url = "http://localhost:8080/result/share_result";

        JSONObject result = new JSONObject();
        result.put("errorCode", "00000");
        result.put("errorMessage", "Success");

        mvc.perform(MockMvcRequestBuilders.post(url) //url, value
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(data)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(result.toJSONString()))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void getUserResultTest()
            throws Exception {

        String s = "{\n" +
                "            \"reflection_available\": false,\n" +
                "            \"quiz_id\": 1,\n" +
                "            \"reflection_time\": [\n" +
                "                2021,\n" +
                "                10,\n" +
                "                15,\n" +
                "                21,\n" +
                "                55,\n" +
                "                5\n" +
                "            ],\n" +
                "            \"user_id\": 1,\n" +
                "            \"attempt_id\": 2,\n" +
                "            \"quiz_title\": \"Collaborative Learning\",\n" +
                "            \"username\": \"EmmaW\"\n" +
                "        }";

        List<String> list = new ArrayList<String>(Arrays.asList(s, s, s));

        Mockito.when(resultServiceMock.getUserFeedback(1))
                .thenReturn((ArrayList<String>) list);


        String url = "http://localhost:8080/result/get_user_result";
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
    public void getSupervisorResultTest()
            throws Exception {

        String s = "{\n" +
                "            \"reflection_available\": false,\n" +
                "            \"quiz_id\": 1,\n" +
                "            \"reflection_time\": [\n" +
                "                2021,\n" +
                "                10,\n" +
                "                15,\n" +
                "                21,\n" +
                "                55,\n" +
                "                5\n" +
                "            ],\n" +
                "            \"user_id\": 1,\n" +
                "            \"attempt_id\": 2,\n" +
                "            \"quiz_title\": \"Collaborative Learning\",\n" +
                "            \"username\": \"EmmaW\"\n" +
                "        }";

        List<String> list = new ArrayList<String>(Arrays.asList(s, s, s));

        Mockito.when(resultServiceMock.getSupervisorFeedback(1))
                .thenReturn((ArrayList<String>) list);


        String url = "http://localhost:8080/result/get_supervisor_result";
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
    public void getResultContentTest()
            throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        String resultData = "{\n" +
                "  \"userId\":1,\n" +
                "  \"quizId\":1,\n" +
                "  \"choices\":[2,3],\n" +
                "  \"score\":10,\n" +
                "  \"reflection\":\"testreflection\\nline2\",\n" +
                "  \"reflectionAvailable\":false,\n" +
                "  \"supervisorId\":1,\n" +
                "  \"isSaved\":false\n" +
                "}";
        QuizResult resultObj = objectMapper.readValue(DataProcessing.replaceLineSeparator(resultData), QuizResult.class);
        String feedbackData = "This is a test feedback";

        String questionData = "{\n" +
                "            \"questionId\": 1,\n" +
                "            \"question\": \"When the group needs suggestions, I...\",\n" +
                "            \"choices\": [\n" +
                "                {\n" +
                "                    \"choiceId\": 1,\n" +
                "                    \"score\": 1,\n" +
                "                    \"choice\": \"Do not make suggestions\",\n" +
                "                    \"questionId\": 0,\n" +
                "                    \"questionChoiceOrder\": 1\n" +
                "                },\n" +
                "                {\n" +
                "                    \"choiceId\": 2,\n" +
                "                    \"score\": 2,\n" +
                "                    \"choice\": \"Tell the group what to do\",\n" +
                "                    \"questionId\": 0,\n" +
                "                    \"questionChoiceOrder\": 2\n" +
                "                },\n" +
                "                {\n" +
                "                    \"choiceId\": 3,\n" +
                "                    \"score\": 3,\n" +
                "                    \"choice\": \"Discuss my suggestions with the group\",\n" +
                "                    \"questionId\": 0,\n" +
                "                    \"questionChoiceOrder\": 3\n" +
                "                },\n" +
                "                {\n" +
                "                    \"choiceId\": 4,\n" +
                "                    \"score\": 5,\n" +
                "                    \"choice\": \"Make sure everyone's suggestions are heard\",\n" +
                "                    \"questionId\": 0,\n" +
                "                    \"questionChoiceOrder\": 4\n" +
                "                }\n" +
                "            ],\n" +
                "            \"quizId\": 0,\n" +
                "            \"questionOrder\": 1\n" +
                "        }";
        Question questionObj = objectMapper.readValue(DataProcessing.replaceLineSeparator(questionData), Question.class);
        List<Question> questionList = new ArrayList<Question>(Arrays.asList(questionObj, questionObj));

        Mockito.when(resultServiceMock.getResultContent(1))
                .thenReturn(resultObj);

        Mockito.when(resultServiceMock.getFeedbackContent(1, 10))
                .thenReturn(feedbackData);

        Mockito.when(quizServiceMock.getQuestionList(1))
                .thenReturn((ArrayList<Question>) questionList);

        String url = "http://localhost:8080/result/get_result_content";
        JSONObject params = new JSONObject();
        params.put("attemptId", 1);

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
    public void saveCommentTest()
            throws Exception {

        String url = "http://localhost:8080/result/save_comment";
        JSONObject params = new JSONObject();
        params.put("comment", "Test comment\nline2");

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
    public void viewCommentTest()
            throws Exception {

        String url = "http://localhost:8080/result/view_comment";
        JSONObject params = new JSONObject();

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
}