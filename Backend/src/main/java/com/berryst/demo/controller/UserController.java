package com.berryst.demo.controller;

import com.berryst.demo.DemoApplication;
import com.berryst.demo.model.User;
import com.berryst.demo.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping(value="/user")
@CrossOrigin
public class UserController {
    @Resource
    private UserService userService;


    @RequestMapping(value="/register",method= RequestMethod.POST)
    public HashMap<String, String> register(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);
        String username = receivedData.getString("username");
        String password = receivedData.getString("password");
        String email = receivedData.getString("email");
        boolean isSupervisor = receivedData.getBoolean("isSupervisor");

        HashMap<String, String> resultMap = new HashMap<String, String>();
        User user = new User(1, username, password, email,isSupervisor);
        User exist_u = userService.queryUserByEmail(email);
        if (exist_u == null){
            userService.addUser(user);
            User curUser = userService.queryUserByEmail(email);
            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = curUser.getUserId()+":"+curTime.getTime();
            DemoApplication.tokenList.put(curUser.getUserId(), curTime.getTime());
            resultMap.put("token",token);
            return resultMap;//succeed
        }
        else{
            resultMap.put("token",null);
            return resultMap;//user's email already exist
        }
    }

    @RequestMapping(value="/login",method= RequestMethod.POST)
    public HashMap<String, String> login(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);

        String username = receivedData.getString("username");
        String password = receivedData.getString("password");

        HashMap<String, String> resultMap = new HashMap<String, String>();
        User exist_u = userService.queryUserByUsername(username);
        if (exist_u.getPassword().equals(password)){
            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = exist_u.getUserId()+":"+curTime.getTime();
            DemoApplication.tokenList.remove(exist_u.getUserId());
            DemoApplication.tokenList.put(exist_u.getUserId(), curTime.getTime());
            resultMap.put("token",token);
            return resultMap;//succeed
        }
        else{
            resultMap.put("token",null);
            return resultMap;//log in failed
        }
    }
}
