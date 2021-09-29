package com.berryst.demo.service;

import com.berryst.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> queryUserList();

    User queryUserById(int userId);

    User queryUserByEmail(String email);

    User queryUserByUsername(String username);

    int addUser(User user);

    int updateUser(User user);

    int deleteUser(int userId);

    boolean checkToken(int userId);

    int resetPassword(int userId, String password);
}
