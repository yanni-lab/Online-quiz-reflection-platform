package com.berryst.demo.controller;

import com.berryst.demo.DemoApplication;
import com.berryst.demo.model.User;
import com.berryst.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin
public class UserController {
    @Resource
    private UserService userService;


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ObjectNode register(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);
        String username = receivedData.getString("username");
        String password = receivedData.getString("password");
        String email = receivedData.getString("email");
        boolean isSupervisor = receivedData.getBoolean("isSupervisor");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        User user = new User(1, username, password, email, isSupervisor);
        User exist_u = userService.queryUserByEmail(email);
        if (exist_u == null) {
            userService.addUser(user);
            User curUser = userService.queryUserByEmail(email);
            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = curUser.getUserId() + ":" + curTime.getTime();
            DemoApplication.tokenList.put(curUser.getUserId(), curTime.getTime());
            node.put("token", token);
            node.put("errorCode", 1);
            return node;//succeed
        } else {
            node.put("token", "");
            node.put("errorCode", 2);
            return node;//user's email already exist
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ObjectNode login(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);

        String username = receivedData.getString("username");
        String password = receivedData.getString("password");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        //TODO: Verify multiple user with same username
        User exist_u = userService.queryUserByUsername(username);
        if (exist_u != null && exist_u.getPassword().equals(password)) {
            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = exist_u.getUserId() + ":" + curTime.getTime();
            DemoApplication.tokenList.remove(exist_u.getUserId());
            DemoApplication.tokenList.put(exist_u.getUserId(), curTime.getTime());
            node.put("token", token);
            node.put("errorCode", 1);
            return node;//succeed
        } else {
            node.put("token", "");
            node.put("errorCode", 2);
            return node;//log in failed
        }
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.POST)
    public ObjectNode resetPassword(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);

        String username = receivedData.getString("username");
        String email = receivedData.getString("email");
        String password = receivedData.getString("email");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        User user = userService.queryUserByEmail(email);
        if (user != null && user.getUsername().equals(username)){
            int error = userService.resetPassword(user.getUserId(), password);
            if(error == 1){
                node.put("errorCode", "00000");

            }else{
                //Database error
                node.put("errorCode", "00001");
            }
        }else{
            //Incorrect username or email address
            node.put("errorCode", "00001");
        }

        return node;
    }
}
