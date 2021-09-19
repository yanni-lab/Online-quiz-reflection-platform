package com.berryst.demo.controller;

import com.berryst.demo.DemoApplication;
import com.berryst.demo.model.Quiz;
import com.berryst.demo.model.User;
import com.berryst.demo.service.QuizService;
import com.berryst.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.ibatis.javassist.compiler.ast.Pair;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping(value="/test")
@CrossOrigin
public class TestController {
    @Resource
    private UserService userService;

    @Resource
    private QuizService quizService;

    @RequestMapping(value="/available_quiz",method= RequestMethod.GET)
    public ObjectNode getPublicQuiz() throws JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
        node.put("quizList", quizService.getPublicQuizList().toString());
        node.put("errorCode",1);
        return node;
    }

    @RequestMapping(value="/quiz_content",method= RequestMethod.GET)
    public ObjectNode getQuizContent(int quizId) throws JSONException {
//        JSONObject receivedData = new JSONObject(data);

//        int quizId = receivedData.getInt("quizId");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.convertValue(quizService.getQuizContent(quizId), ObjectNode.class);
        node.put("errorCode",1);


        return node;
    }
}