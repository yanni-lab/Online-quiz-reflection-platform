package com.berryst.demo.controller;

import com.berryst.demo.DemoApplication;
import com.berryst.demo.model.User;
import com.berryst.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/user")
@CrossOrigin
public class UserController {
    @Resource
    private UserService userService;


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ObjectNode register(@RequestBody String data, HttpServletResponse response) throws JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();


        JSONObject receivedData = new JSONObject(data);
        String username = receivedData.getString("username");
        String password = receivedData.getString("password");
        String email = receivedData.getString("email");
        boolean isSupervisor = receivedData.getBoolean("isSupervisor");

        log.info("Receive register request: " + receivedData);

        User user = new User(1, username, password, email, isSupervisor);
        User existUser = userService.queryUserByEmail(email);

        if (existUser == null) {
            userService.addUser(user);
            User curUser = userService.queryUserByEmail(email);
            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = curUser.getUserId() + ":" + curTime.getTime();
            DemoApplication.tokenList.put(curUser.getUserId(), curTime.getTime());

            node.put("token", token);
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");

            log.info("Successfully registered - User: " + username);
        } else {
            //user's email already exist
            node.put("token", "");
            node.put("errorCode", "10002");
            node.put("errorMessage", "User email already registered");

            log.warn("User email already registered - Email: " + email);
        }

        return node;
    }

    //TODO: Login when user has same username and password?
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ObjectNode login(@RequestBody String data, HttpServletResponse response) throws JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        String username = receivedData.getString("username");
        String password = receivedData.getString("password");

        List<User> existUsers = userService.queryUserByUsername(username);

        if (existUsers != null) {
            User matchUser = null;
            for (User user : existUsers) {
                if(user.getPassword().equals(password)){
                    matchUser = user;
                    break;
                }
            }
            if (matchUser == null) {
                //Incorrect Password
                node.put("token", "");
                node.put("errorCode", "10004");
                node.put("errorMessage", "Incorrect Password");

                log.warn("Login password not match - User: " + username);

                return node;
            }

            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = matchUser.getUserId() + ":" + curTime.getTime();
            DemoApplication.tokenList.remove(matchUser.getUserId());
            DemoApplication.tokenList.put(matchUser.getUserId(), curTime.getTime());

            node.put("token", token);
            node.put("errorCode", "00000");
            node.put("errorMessage", "Success");

            log.info("Successfully login - User: " + username);


        } else {
            //Username not found
            node.put("token", "");
            node.put("errorCode", "10003");
            node.put("errorMessage", "Fail to find user when login");

            log.warn("Fail to find user when login with username - User: " + username);
        }
        return node;
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.POST)
    public ObjectNode resetPassword(@RequestBody String data, HttpServletResponse response) throws JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();

        JSONObject receivedData = new JSONObject(data);
        String username = receivedData.getString("username");
        String email = receivedData.getString("email");
        String password = receivedData.getString("password");

        User user = userService.queryUserByEmail(email);
        if (user != null && user.getUsername().equals(username)) {
            if (userService.resetPassword(user.getUserId(), password) == 1) {
                node.put("errorCode", "00000");
                node.put("errorMessage", "Success");
                log.info("Successfully reset password - Email: " + email);
            } else {
                //Database error
                node.put("errorCode", "20000");
                node.put("errorMessage", "Database CRUD failed");
                log.error("Database CRUD failed - reset password - Email: " + email);
            }
        } else {
            //Incorrect username or email address
            node.put("errorCode", "00005");
            node.put("errorMessage", "Incorrect username or email address");

            log.warn("Reset password failed: username and email not match - Email: " + email);
        }

        return node;
    }
}
