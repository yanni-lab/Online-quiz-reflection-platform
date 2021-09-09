package com.berryst.demo.controller;

import com.berryst.demo.mapper.UserMapper;
import com.berryst.demo.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserMapper userMapper;

    @GetMapping(value = "/queryUserList", produces = {"application/json;charset=utf-8"})
    public List<User> queryUserList() {
        List<User> userList = userMapper.queryUserList();
        for (User user: userList) {
            System.out.println(user);
        }
        return userList;
    }

    @GetMapping(value = "/queryUserById", produces = {"application/json;charset=utf-8"})
    public User queryUserById() {
        User user = userMapper.queryUserById(1);
        return user;
    }

    @GetMapping(value = "/addUser", produces = {"application/json;charset=utf-8"})
    public int addUser() {
        User user = new User(2, "test", "test123", "test@xxx.com");
        return userMapper.addUser(user);
    }

    @GetMapping(value = "/updateUser", produces = {"application/json;charset=utf-8"})
    public int updateUser() {
        User user = new User(2, "updated", "update123", "update@xxx.com");
        return userMapper.updateUser(user);
    }

    @GetMapping(value = "/deleteUser", produces = {"application/json;charset=utf-8"})
    public int deleteUser() {
        return userMapper.deleteUser(2);
    }

}
