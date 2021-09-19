package com.berryst.demo.service.impl;

import com.berryst.demo.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.CoreMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest

public class UserServiceImplTest {

    @Autowired
    private UserService userService;

    @Test
    public void queryUserList() {
//        System.out.println(userService.queryUserList());
        Assert.assertThat(userService.queryUserList().toString(), is("[User(userId=1, username=supervisor, password=123456, email=supervisor@gmail.com, isSupervisor=true), User(userId=2, username=user, password=123456, email=user@gmail.com, isSupervisor=false), User(userId=3, username=, password=, email=, isSupervisor=false), User(userId=4, username=, password=, email=, isSupervisor=false), User(userId=5, username=, password=, email=, isSupervisor=false), User(userId=6, username=a, password=123, email=abc@gmail.com, isSupervisor=false)]"));
    }

//    @Test
//    void queryUserById() {
//    }
//
//    @Test
//    void queryUserByEmail() {
//    }
//
//    @Test
//    void queryUserByUsername() {
//    }
//
//    @Test
//    void addUser() {
//    }
//
//    @Test
//    void updateUser() {
//    }
//
//    @Test
//    void deleteUser() {
//    }
//
//    @Test
//    void checkToken() {
//    }
}