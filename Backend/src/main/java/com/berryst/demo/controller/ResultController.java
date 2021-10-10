package com.berryst.demo.controller;

import com.berryst.demo.model.*;
import com.berryst.demo.service.QuizService;
import com.berryst.demo.service.ResultService;
import com.berryst.demo.utils.DataProcessing;
import com.berryst.demo.utils.EmailService;
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
import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping(value = "/result")
@CrossOrigin
public class ResultController {
    @Resource
    private ResultService resultService;

    @Resource
    private QuizService quizService;

    @Resource
    private EmailService emailService;

    @RequestMapping(value = "/save_result", method = RequestMethod.POST)
    public ObjectNode saveResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        ObjectNode node = objectMapper.createObjectNode();
        JSONObject receivedData = new JSONObject(data);

        QuizResult result = objectMapper.readValue(DataProcessing.replaceLineSeparator(data), QuizResult.class);
        if(receivedData.getBoolean("isSaved")){
            log.info("Result has already saved with attemptId: "+result.getAttemptId());
            resultService.updateShareWithSupervisor(result);
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            return node;
        }
        int attemptId = resultService.saveResult(result);
        node.put("attemptId",attemptId);

        log.info("Successfully save new result");
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");

        return node;
    }

    //userId =-1 represent anonymous user
    @RequestMapping(value = "/share_result", method = RequestMethod.POST)
    public ObjectNode shareResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        String email = receivedData.getString("email");

        QuizResult result = objectMapper.readValue(DataProcessing.replaceLineSeparator(data), QuizResult.class);

        if(receivedData.getBoolean("isSaved")){
            log.info("Result has already saved with attemptId: "+result.getAttemptId());
            resultService.updateShareWithSupervisor(result);
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");
            //TODO Edit email

            //emailAddr, Title, Content
//        emailService.sendMail("email","Berry Street Quiz Result", "Here is your quiz result");
            return node;
        }

        int attemptId = resultService.saveResult(result);
        node.put("attemptId",attemptId);

        //TODO Edit email
        //emailAddr, Title, Content
//        emailService.sendMail("email","Berry Street Quiz Result", "Here is your quiz result");

        log.info("Successfully share new result");
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");

        return node;
    }

    @RequestMapping(value = "/get_user_result", method = RequestMethod.POST)
    public ObjectNode getUserResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int userId = receivedData.getInt("userId");

        node.put("userResult", resultService.getUserFeedback(userId).toString());
        node.set("userResult",objectMapper.convertValue(resultService.getUserFeedback(userId), ArrayNode.class));

        log.info("Successfully retrieved result on user - UserId: "+userId);
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;
    }

    @RequestMapping(value = "/get_supervisor_result", method = RequestMethod.POST)
    public ObjectNode getSupervisorResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int userId = receivedData.getInt("userId");

        node.set("supervisorResult",objectMapper.convertValue(resultService.getSupervisorFeedback(userId), ArrayNode.class));

        log.info("Successfully retrieved result on supervisor - SupervisorId: "+userId);
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;

    }

    @RequestMapping(value = "/get_result_content", method = RequestMethod.POST)
    public ObjectNode getResultContent(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(
                JsonReadFeature.ALLOW_UNESCAPED_CONTROL_CHARS.mappedFeature(),
                true
        );

        JSONObject receivedData = new JSONObject(data);
        int attemptId = receivedData.getInt("attemptId");

        QuizResult result = resultService.getResultContent(attemptId);
        ObjectNode node = objectMapper.convertValue(result, ObjectNode.class);

        node.put("feedback",resultService.getFeedbackContent(result.getQuizId(),result.getScore()));

        ArrayList<HashMap> choices = new ArrayList<>();

        ArrayList<Question> questionList = quizService.getQuestionList(result.getQuizId());
        for(int i=0;i< result.getChoices().length;i++){
            Question q = questionList.get(i);
            QuestionChoice c = q.getChoices().get(result.getChoices()[i]);
            choices.add(new HashMap<String,String>(){{
                            put("question",q.getQuestion());
                            put("choice",c.getChoice());
                        }}
                    );
        }

        node.set("choices",objectMapper.convertValue(choices, ArrayNode.class));

        node = objectMapper.readTree(DataProcessing.addLineSeparator(objectMapper.writeValueAsString(node))).deepCopy();

        log.info("Successfully retrieved result content - attemptId: "+attemptId);
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;
    }

    @RequestMapping(value = "/save_comment", method = RequestMethod.POST)
    public ObjectNode saveComment(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        ObjectNode node = objectMapper.createObjectNode();

        Comment comment = objectMapper.readValue(DataProcessing.replaceLineSeparator(data), Comment.class);

        resultService.saveComment(comment);

        log.info("Successfully save new comment");
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");

        return node;
    }

    @RequestMapping(value = "/view_comment", method = RequestMethod.POST)
    public ObjectNode getPublicQuiz() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        ObjectNode node = objectMapper.createObjectNode();

        log.info("Successfully retrieved comment list");

        node.set("commentList",objectMapper.convertValue(resultService.getComment(), ArrayNode.class));

        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;
    }
}
