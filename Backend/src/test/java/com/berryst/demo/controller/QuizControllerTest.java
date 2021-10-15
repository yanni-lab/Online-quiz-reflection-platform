package com.berryst.demo.controller;

import com.berryst.demo.service.QuizService;
import net.minidev.json.JSONObject;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.junit.Test;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

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
    @Transactional
    @Rollback(true)
    public void availableQuizTest()
            throws Exception {

//        Mockito.when(quizServiceMock.getPublicQuizList())
//                .thenReturn(Arrays.asList(first, second));

        String url = "http://localhost:8080/quiz/available_quiz";
        JSONObject params = new JSONObject();

        JSONObject result = new JSONObject();
//        result.put("quizList","[{quiz_id=1, quiz_title=Collaborative Learning}, {quiz_id=2, quiz_title=Leadership}, {quiz_id=3, quiz_title=Resilience}]");
        result.put("quizList","[]");
        result.put("errorCode","00000");
        result.put("errorMessage","Success");

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