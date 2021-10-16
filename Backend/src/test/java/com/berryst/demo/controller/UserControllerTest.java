package com.berryst.demo.controller;

import com.berryst.demo.model.User;
import com.berryst.demo.service.UserService;
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

/**
 * @ClassName UserControllerTest
 * @Author Shirui Cheng
 * @Description Automatic tests for UserController
 * @version: v1.0.0
 * @Date 21:24 2021/10/16
 **/
@RunWith(SpringRunner.class)
//@WebMvcTest(QuizController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService userServiceMock;

    @Test
    public void registerTest()
            throws Exception {

        User first = new User();
        first.setUserId(4);
        first.setEmail("test@gmail.com");
        first.setPassword("123456");
        first.setUsername("testuser1");
        first.setSupervisor(true);

        Mockito.when(userServiceMock.queryUserByEmail("test@gmail.com"))
                .thenReturn(null)
                .thenReturn(first);

        String url = "http://localhost:8080/user/register";

        JSONObject params = new JSONObject();
        params.put("username", "testuser1");
        params.put("password", "123456");
        params.put("email", "test@gmail.com");
        params.put("isSupervisor", true);

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
    public void loginTest()
            throws Exception {

        User first = new User();
        first.setUserId(4);
        first.setEmail("test@gmail.com");
        first.setPassword("123456");
        first.setUsername("testuser1");
        first.setSupervisor(true);

        Mockito.when(userServiceMock.queryUserByEmail("test@gmail.com"))
                .thenReturn(first);

        String url = "http://localhost:8080/user/login";

        JSONObject params = new JSONObject();
        params.put("password", "123456");
        params.put("email", "test@gmail.com");

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
    public void resetPasswordTest()
            throws Exception {

        User first = new User();
        first.setUserId(4);
        first.setEmail("test@gmail.com");
        first.setPassword("123456");
        first.setUsername("testuser1");
        first.setSupervisor(true);

        Mockito.when(userServiceMock.queryUserByEmail("test@gmail.com"))
                .thenReturn(first);

        Mockito.when(userServiceMock.resetPassword(4, "123456"))
                .thenReturn(1);

        String url = "http://localhost:8080/user/reset_password";

        JSONObject params = new JSONObject();
        params.put("username", "testuser1");
        params.put("password", "123456");
        params.put("email", "test@gmail.com");

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
    public void updateUserTest()
            throws Exception {

        String url = "http://localhost:8080/user/update_user";

        JSONObject params = new JSONObject();
        params.put("username", "testuser1");
        params.put("password", "123456");
        params.put("email", "test@gmail.com");
        params.put("userId", 4);

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
    public void deleteUserTest()
            throws Exception {

        String url = "http://localhost:8080/user/delete_user";

        JSONObject params = new JSONObject();
        params.put("userId", 4);

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