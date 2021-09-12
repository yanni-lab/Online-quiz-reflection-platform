package com.berryst.demo.controller;

import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
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

@RestController
@RequestMapping(value="/service")
@CrossOrigin
public class QuizController {
    @Resource
    private QuizService quizService;

    @RequestMapping(value="/available_quiz",method= RequestMethod.POST)
    public ObjectNode getPublicQuiz(@RequestBody String data, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
        node.put("quizList", quizService.getPublicQuizList().toString());
        node.put("errorCode",1);
        return node;
    }

    @RequestMapping(value="/quiz_content",method= RequestMethod.POST)
    public ObjectNode getQuizContent(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);
        int quizId = receivedData.getInt("quizId");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.convertValue(quizService.getQuizContent(quizId), ObjectNode.class);
        node.put("errorCode",1);

        return node;
    }
}
