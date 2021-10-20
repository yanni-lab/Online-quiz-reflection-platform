package com.berryst.demo.controller;

import com.berryst.demo.model.Feedback;
import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import com.berryst.demo.utils.DataProcessing;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Map;

/**
 * @ClassName QuizController
 * @Author Shirui Cheng
 * @Description controller for quiz related events.
 * @version: v1.0.0
 * @Date 21:21 2021/10/16
 **/
@Slf4j
@RestController
@RequestMapping(value = "/quiz")
@CrossOrigin
public class QuizController {
    @Resource
    private QuizService quizService;

    @RequestMapping(value = "/available_quiz", method = RequestMethod.POST)
    public ObjectNode getPublicQuiz() {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        log.info("Successfully retrieved public quiz list");

        node.set("quizList", objectMapper.convertValue(quizService.getPublicQuizList(), ArrayNode.class));

        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;
    }

    @RequestMapping(value = "/quiz_content", method = RequestMethod.POST)
    public ObjectNode getQuizContent(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {
        JSONObject receivedData = new JSONObject(data);
        int quizId = receivedData.getInt("quizId");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(
                JsonReadFeature.ALLOW_UNESCAPED_CONTROL_CHARS.mappedFeature(),
                true
        );
        Quiz thequiz = quizService.getQuizContent(quizId);
        ObjectNode node = objectMapper.readTree(DataProcessing.addLineSeparator(objectMapper.writeValueAsString(thequiz))).deepCopy();

        log.info("Successfully retrieved quiz content - quizId: " + quizId);

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
        for (Map m : quizService.getSupervisorQuiz(userId)) {
            if (m.get("is_public").equals(true)) {
                publicQuizList.add(m);
            } else {
                privateQuizList.add(m);
            }
        }

        log.info("Successfully retrieved quiz created by supervisor - userId: " + userId);

        node.set("publicQuizList", objectMapper.convertValue(publicQuizList, ArrayNode.class));
        node.set("privateQuizList", objectMapper.convertValue(privateQuizList, ArrayNode.class));

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

        if (quizService.deleteQuiz(quizId) == 1) {
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            log.info("Successfully delete quiz - quizId: " + quizId);
        } else {
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

        if (quizService.setQuizPublic(quizId) == 1) {
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            log.info("Successfully set quiz to public - quizId: " + quizId);
        } else {
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

        if (quizService.setQuizPrivate(quizId) == 1) {
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            log.info("Successfully set quiz to private - quizId: " + quizId);
        } else {
            node.put("errorCode", "20000");
            node.put("errorMessage", "Database CRUD failed");
            log.error("Database CRUD failed - set quiz private - quizId: " + quizId);
        }

        return node;
    }

    @RequestMapping(value = "/set_quiz", method = RequestMethod.POST)
    public ObjectNode setQuiz(@RequestBody String data, HttpServletResponse response) throws JSONException, JsonProcessingException {


        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        ObjectNode node = objectMapper.createObjectNode();

        Quiz quiz = objectMapper.readValue(DataProcessing.replaceLineSeparator(data), Quiz.class);
        log.info(data);
        log.info(quiz.toString());
        int questionCount = 1;
        for (Question q : quiz.getQuestions()) {
            q.setQuestionOrder(questionCount);
            questionCount++;
            int choiceCount = 1;
            for (QuestionChoice c : q.getChoices()) {
                c.setQuestionChoiceOrder(choiceCount);
                choiceCount++;
            }
        }

        int feedbackCount = 1;
        for (Feedback f : quiz.getFeedback()) {
            f.setFeedbackOrder(feedbackCount);
            feedbackCount++;
        }
        log.info("Receive set quiz request - quizId: " + quiz.getQuizId());
        int newQuizId = quizService.setQuiz(quiz);
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        log.info("Successfully add/edit quiz - quizId: " + newQuizId);

        return node;
    }

}
