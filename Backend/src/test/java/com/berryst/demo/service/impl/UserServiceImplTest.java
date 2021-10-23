package com.berryst.demo.service.impl;

import com.berryst.demo.model.User;
import com.berryst.demo.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.CoreMatchers.is;

@RunWith(SpringRunner.class)
@SpringBootTest

public class UserServiceImplTest {

    @Autowired
    private UserService userService;

//    @Test
//   public void queryUserList() {
//       Assert.assertThat(userService.queryUserList().toString(),
//                is("[User(userId=1, username=EmmaW, password=123456, email=emmaw@gmail.com, isSupervisor=true), User(userId=2, username=jasonwork, password=123456, email=jasonx@firefox.com, isSupervisor=true), User(userId=3, username=mario35, password=123456, email=mario35@gmail.com, isSupervisor=false), User(userId=4, username=nordpass, password=123456, email=nordpass@qq.com, isSupervisor=false)]"));
//    }

//    @Test
//    public void queryUserById() {
//    }

    @Test
    public void queryUserByEmail() {
        Assert.assertThat(userService.queryUserByEmail("emmaw@gmail.com").toString(),
                is("User(userId=1, username=EmmaW, password=123456, email=emmaw@gmail.com, isSupervisor=true)"));
        Assert.assertNull(userService.queryUserByEmail("notexist@gmail.com"));
    }

    @Test
    public void queryUserByUsername() {
        Assert.assertThat(userService.queryUserByUsername("EmmaW").get(0).toString(),
                is("User(userId=1, username=EmmaW, password=123456, email=emmaw@gmail.com, isSupervisor=true)"));
        Assert.assertNull(userService.queryUserByEmail("notexist"));
    }

    @Test
    public void addUser() {
        User u = new User();
    }

    @Test
    public void updateUser() {
    }

    @Test
    public void deleteUser() {
    }

    @Test
    public void checkToken() {
    }

    @Test
    public void resetPassword() {
        Assert.assertThat(userService.resetPassword(20, "reset"),
                is(1));
    }

    @Test
    public void duplicateUserName() {
        User user1 = new User(1, "Test", "123456", "test1@gmail.com", true);
        userService.addUser(user1);
        User user2 = new User(1, "Test", "123456", "test2@gmail.com", true);
        userService.addUser(user2);
        System.out.println(userService.queryUserByUsername("Test").toString());

    }
}