package com.berryst.demo.controller;

import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/service")
@CrossOrigin
public class QuizController {
    @Resource
    private QuizService quizService;

    @RequestMapping(value = "/available_quiz", method = RequestMethod.POST)
    public ObjectNode getPublicQuiz(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
//        String quizList = objectMapper.writeValueAsString(quizService.getPublicQuizList());

        log.info("Successfully retrieved public quiz list");

        node.put("quizList", quizService.getPublicQuizList().toString());
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;
    }

    @RequestMapping(value = "/quiz_content", method = RequestMethod.POST)
    public ObjectNode getQuizContent(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);
        int quizId = receivedData.getInt("quizId");

        ObjectMapper objectMapper = new ObjectMapper();
        Quiz thequiz = quizService.getQuizContent(quizId);
        ObjectNode node = objectMapper.convertValue(thequiz, ObjectNode.class);

        log.info("Successfully retrieved quiz content - quizId: " + quizId);

        node.put("feedback", thequiz.getFeedback().replace("###", "\\n"));
        node.put("quizBackground", thequiz.getQuizBackground().replace("###", "\\n"));
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");

        return node;
    }

    @RequestMapping(value = "/supervisor_quiz", method = RequestMethod.POST)
    public ObjectNode getSupervisorQuiz(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int userId = receivedData.getInt("userId");

        log.debug(quizService.getSupervisorQuiz(userId).toString());
        ArrayList<Map> publicQuizList = new ArrayList<Map>();
        ArrayList<Map> privateQuizList = new ArrayList<Map>();
        for(Map m:quizService.getSupervisorQuiz(userId)){
            if(m.get("is_public").equals(true)){
                publicQuizList.add(m);
            }else{
                privateQuizList.add(m);
            }
        }

        log.info("Successfully retrieved quiz created by supervisor - userId: " + userId);

        node.put("publicQuizList", publicQuizList.toString());
        node.put("privateQuizList", privateQuizList.toString());
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");

        return node;
    }

    @RequestMapping(value = "/delete_quiz", method = RequestMethod.POST)
    public ObjectNode deleteQuiz(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int quizId = receivedData.getInt("quizId");

        if(quizService.deleteQuiz(quizId)==1){
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            log.info("Successfully delete quiz - quizId: " + quizId);
        }else{
            node.put("errorCode", "20000");
            node.put("errorMessage", "Database CRUD failed");
            log.error("Database CRUD failed - delete quiz - quizId: " + quizId);
        }

        return node;
    }

    @RequestMapping(value = "/set_public", method = RequestMethod.POST)
    public ObjectNode setQuizPublic(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int quizId = receivedData.getInt("quizId");

        if(quizService.setQuizPublic(quizId)==1){
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            log.info("Successfully set quiz to public - quizId: " + quizId);
        }else{
            node.put("errorCode", "20000");
            node.put("errorMessage", "Database CRUD failed");
            log.error("Database CRUD failed - set quiz public - quizId: " + quizId);
        }

        return node;
    }

    @RequestMapping(value = "/set_private", method = RequestMethod.POST)
    public ObjectNode setQuizPrivate(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int quizId = receivedData.getInt("quizId");

        if(quizService.setQuizPrivate(quizId)==1){
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            log.info("Successfully set quiz to private - quizId: " + quizId);
        }else{
            node.put("errorCode", "20000");
            node.put("errorMessage", "Database CRUD failed");
            log.error("Database CRUD failed - set quiz private - quizId: " + quizId);
        }

        return node;
    }

    @RequestMapping(value = "/set_quiz", method = RequestMethod.POST)
    public ObjectNode setQuiz(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        Quiz quiz = objectMapper.readValue(data, Quiz.class);
        log.info("Receive set quiz request - quizId: "+quiz.getQuizId());
        quizService.setQuiz(quiz);

        int newQuizId = quizService.setQuiz(quiz);
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        log.info("Successfully add/edit quiz - quizId: " + newQuizId);

        return node;
    }

}
