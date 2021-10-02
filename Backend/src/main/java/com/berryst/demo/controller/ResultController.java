package com.berryst.demo.controller;

import com.berryst.demo.model.QuizResult;
import com.berryst.demo.service.ResultService;
import com.berryst.demo.utils.EmailService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping(value = "/result")
@CrossOrigin
public class ResultController {
    @Resource
    private ResultService resultService;

    @Resource
    private EmailService emailService;

    @RequestMapping(value = "/save_result", method = RequestMethod.POST)
    public ObjectNode saveResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        ObjectNode node = objectMapper.createObjectNode();

        QuizResult result = objectMapper.readValue(data, QuizResult.class);

        resultService.saveResult(result);

        log.info("Successfully save new result");
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");

        return node;
    }

    @RequestMapping(value = "/share_result", method = RequestMethod.POST)
    public ObjectNode shareResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        String email = receivedData.getString("email");

        QuizResult result = objectMapper.readValue(data, QuizResult.class);

        resultService.shareResult(result,email);

        log.info("Successfully share new result");
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");

        //TODO Edit email
//        emailService.sendMail(email,"Berry Street", "Here is your quiz result");
        return node;
    }

    @RequestMapping(value = "/get_user_result", method = RequestMethod.POST)
    public ObjectNode getUserResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int userId = receivedData.getInt("userId");

        node.put("userResult", resultService.getUserFeedback(userId).toString());

        log.info("Successfully retrieved result on user - UserId: "+userId);
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;
    }

    @RequestMapping(value = "/get_supervisor_result", method = RequestMethod.POST)
    public ObjectNode getSupervisorResult(@RequestBody String data, HttpServletResponse response) throws JsonProcessingException, JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        int userId = receivedData.getInt("userId");

        node.put("supervisorResult", resultService.getSupervisorFeedback(userId).toString());

        log.info("Successfully retrieved result on supervisor - SupervisorId: "+userId);
        node.put("errorCode", "00000");
        node.put("errorMessage", "Success");
        return node;

    }

}
