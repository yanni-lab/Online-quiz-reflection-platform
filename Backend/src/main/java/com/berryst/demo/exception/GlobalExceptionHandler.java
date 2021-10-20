package com.berryst.demo.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @ClassName GlobalExceptionHandler
 * @Author Shirui Cheng
 * @Description GlobalExceptionHandler to catch exception from all controllers
 * @version: v1.0.0
 * @Date 18:50 2021/10/16
 **/
@Slf4j
@CrossOrigin
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * @return ObjectNode as json type return
     * @Author Shirui Cheng
     * @Decription Catch JSONException
     * @Date 18:52 2021/10/6
     * @Param org.json.JSONException e
     **/
    @ExceptionHandler(JSONException.class)
    @ResponseBody
    public ObjectNode JSONExceptionHandler(org.json.JSONException e) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
        node.put("errorCode", "10001");
        node.put("errorMessage", "JSONException");

        log.error("JSON Exception on Input");

        return node;
    }

    /**
     * @return ObjectNode as json type return
     * @Author Shirui Cheng
     * @Decription General exception handler to catch all kinds of exceptions
     * @Date 18:51 2021/10/6
     * @Param Exception e
     **/
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ObjectNode GeneralExceptionHandler(Exception e) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
        node.put("errorCode", "10000");
        node.put("errorMessage", e.toString());

        log.error("Unknown Error" + e.toString());

        return node;
    }
}
