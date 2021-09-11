package com.berryst.demo;

import com.berryst.demo.controller.QuizController;
import com.berryst.demo.model.Question;
import com.berryst.demo.service.QuizService;
import org.apache.ibatis.javassist.compiler.ast.Pair;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testng.annotations.Test;

@RunWith(SpringRunner.class)
@WebMvcTest(QuizController.class)
public class QuizControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private QuizService service;

    // write test cases here
    @Test
    public void givenEmployees_whenGetEmployees_thenReturnJsonArray()
            throws Exception {

//        Employee alex = new Employee("alex");
//
//        List<Employee> allEmployees = Arrays.asList(alex);
//
//        given(service.getAllEmployees()).willReturn(allEmployees);
        System.out.println("1111111");
        String url = "http://localhost:8080/service/available_quiz";
        mvc.perform(MockMvcRequestBuilders.get(url) //url, value
//                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("{'code':'200'}"))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }
}