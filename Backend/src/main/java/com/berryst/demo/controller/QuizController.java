package com.berryst.demo.controller;

import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.ibatis.javassist.compiler.ast.Pair;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

@RestController
@RequestMapping(value="/service")
@CrossOrigin
public class QuizController {
    @Resource
    private QuizService quizService;

    @RequestMapping(value="/available_quiz",method= RequestMethod.POST)
    public ObjectNode getPublicQuiz(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
        String quizList = objectMapper.writeValueAsString(quizService.getPublicQuizList());
        node.put("quizList", quizList);
        node.put("errorCode",1);
        return node;
    }

    @RequestMapping(value="/quiz_content",method= RequestMethod.POST)
    public ObjectNode getQuizContent(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {
        JSONObject receivedData = new JSONObject(data);
        int quizId = receivedData.getInt("quizId");

        ObjectMapper objectMapper = new ObjectMapper();
        Quiz thequiz = quizService.getQuizContent(quizId);
        ObjectNode node = objectMapper.convertValue(thequiz, ObjectNode.class);

        node.put("feedback", thequiz.getFeedback().replace("###","\\n"));
        node.put("quizBackground", thequiz.getQuizBackground().replace("###","\\n"));
        node.put("errorCode",1);

        return node;
    }
}
