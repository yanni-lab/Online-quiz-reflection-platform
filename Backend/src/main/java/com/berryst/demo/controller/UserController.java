package com.berryst.demo.controller;

import com.berryst.demo.model.Supervisor;
import com.berryst.demo.model.User;
import com.berryst.demo.service.SupervisorService;
import com.berryst.demo.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(value="/user")
public class UserController {
    @Resource
    private UserService userService;

    @Resource
    private SupervisorService supervisorService;


    @RequestMapping(value="/register",method= RequestMethod.GET)
    public int register(boolean isSupervisor, String username, String password, String email){
        if (!isSupervisor){
            User user = new User(1, username, password, email);
            User exist_u = userService.queryUserByEmail(email);
            if (exist_u == null){
                int result = userService.addUser(user);
                return result;//succeed
            }
            else{
                return 0;//user's email already exist
            }
        }
        else{
            Supervisor supervisor = new Supervisor(1,username,password,email);
            Supervisor exist_s = supervisorService.querySupervisorByEmail(email);
            if (exist_s == null){
                int result = supervisorService.addSupervisor(supervisor);
                return 1;//succeed
            }
            else{
                return 0;//supervisor's email already exist
            }
        }

    }


}
