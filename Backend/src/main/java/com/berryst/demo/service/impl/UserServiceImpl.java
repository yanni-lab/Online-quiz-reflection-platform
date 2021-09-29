package com.berryst.demo.service.impl;

import com.berryst.demo.DemoApplication;
import com.berryst.demo.mapper.UserMapper;
import com.berryst.demo.model.User;
import com.berryst.demo.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.Date;
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
    public User queryUserById(int userId) {
        return userMapper.queryUserById(userId);
    }

    @Override
    public User queryUserByEmail(String email) {
        return userMapper.queryUserByEmail(email);
    }

    @Override
    public User queryUserByUsername(String username) {
        return userMapper.queryUserByUsername(username);
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
    public int deleteUser(int userId) {
        return userMapper.deleteUser(userId);
    }

    @Override
    public boolean checkToken(int userId) {
        if (!DemoApplication.tokenList.containsKey(userId)){
            return false;
        }
        long timestamp = DemoApplication.tokenList.get(userId);
        Timestamp curTime = new Timestamp(new Date().getTime());
        long interval = curTime.getTime()-timestamp;
        if (interval < 3600000){
            return true;
        }
        else{
            DemoApplication.tokenList.remove(userId);
            return false;
        }
    }

    //TODO: Implement resetPassword Function
    @Override
    public int resetPassword(int userId, String password) {
        return userMapper.resetPassword(userId, password);
    }
}
