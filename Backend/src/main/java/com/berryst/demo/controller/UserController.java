package com.berryst.demo.controller;

import com.berryst.demo.DemoApplication;
import com.berryst.demo.model.User;
import com.berryst.demo.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.Date;

@RestController
@RequestMapping(value="/user")
public class UserController {
    @Resource
    private UserService userService;


    @RequestMapping(value="/register",method= RequestMethod.GET)
    public String register(boolean isSupervisor, String username, String password, String email){
        User user = new User(1, username, password, email,isSupervisor);
        User exist_u = userService.queryUserByEmail(email);
        if (exist_u == null){
            userService.addUser(user);
            User curUser = userService.queryUserByEmail(email);
            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = curUser.getUserId()+":"+curTime.getTime();
            DemoApplication.tokenList.put(curUser.getUserId(), curTime.getTime());
            return token;//succeed
        }
        else{
            return "User already exist!";//user's email already exist
        }
    }

    @RequestMapping(value="/login",method= RequestMethod.GET)
    public String login(String username, String password){
        User exist_u = userService.queryUserByUsername(username);
        if (exist_u.getPassword().equals(password)){
            Timestamp curTime = new Timestamp(new Date().getTime());
            String token = exist_u.getUserId()+":"+curTime.getTime();
            DemoApplication.tokenList.remove(exist_u.getUserId());
            DemoApplication.tokenList.put(exist_u.getUserId(), curTime.getTime());
            return token;//succeed
        }
        else{
            return "Wrong username or password!";//log in failed
        }
    }
}
