package com.berryst.demo.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin
@RestControllerAdvice
public class GlobalExceptionHandler {
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
