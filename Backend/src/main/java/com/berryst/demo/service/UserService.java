package com.berryst.demo.service;

import com.berryst.demo.module.User;

import java.util.List;

public interface UserService {

    List<User> queryUserList();

    User queryUserById(int user_id);

    User queryUserByEmail(String email);

    int addUser(User user);

    int updateUser(User user);

    int deleteUser(int user_id);
}
