package com.berryst.demo.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(JSONException.class)
    @ResponseBody
    public ObjectNode ExceptionHandler(org.json.JSONException e) {
        ObjectMapper objectMapper = new ObjectMapper();

        ObjectNode node = objectMapper.createObjectNode();
        System.out.println(e.toString());

        return node.put("errorCode", "00001");
    }
    @ExceptionHandler(ArrayIndexOutOfBoundsException.class)
    @ResponseBody
    public ObjectNode NullPointerExceptionHandler(ArrayIndexOutOfBoundsException e) {
        ObjectMapper objectMapper = new ObjectMapper();

        ObjectNode node = objectMapper.createObjectNode();
        System.out.println(e.toString());

        return node.put("errorCode", "00001");
    }
}
