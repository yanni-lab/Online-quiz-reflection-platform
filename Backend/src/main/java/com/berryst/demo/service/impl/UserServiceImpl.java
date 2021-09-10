package com.berryst.demo.service.impl;

import com.berryst.demo.mapper.UserMapper;
import com.berryst.demo.module.User;
import com.berryst.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public List<User> queryUserList() {
        return userMapper.queryUserList();
    }

    @Override
    public User queryUserById(int user_id) {
        return userMapper.queryUserById(user_id);
    }

    @Override
    public User queryUserByEmail(String email) {
        return userMapper.queryUserByEmail(email);
    }

    @Override
    public int addUser(User user) {
        return userMapper.addUser(user);
    }

    @Override
    public int updateUser(User user) {
        return userMapper.updateUser(user);
    }

    @Override
    public int deleteUser(int user_id) {
        return userMapper.deleteUser(user_id);
    }

}
