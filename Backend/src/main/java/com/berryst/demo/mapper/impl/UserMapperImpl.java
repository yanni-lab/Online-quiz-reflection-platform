package com.berryst.demo.mapper.impl;

import javax.annotation.Resource;
import com.berryst.demo.mapper.UserMapper;
import com.berryst.demo.model.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class UserMapperImpl implements UserMapper {
    @Resource
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<User> queryUserList() {
        SqlSession session = sqlSessionFactory.openSession();
        List<User> userList = session.selectList("con.berryst.demo.mapper.UserMapper.queryUserList");
        session.close();
        return userList;
    }

    @Override
    public User queryUserById(int user_id) {
        SqlSession session = sqlSessionFactory.openSession();
        User user = session.selectOne("con.berryst.demo.mapper.UserMapper.queryUserById",user_id);
        session.close();
        return user;
    }

    @Override
    public User queryUserByEmail(String email) {
        SqlSession session = sqlSessionFactory.openSession();
        User user = session.selectOne("con.berryst.demo.mapper.UserMapper.queryUserByEmail",email);
        session.close();
        return user;
    }

    @Override
    public int addUser(User user) {
        SqlSession session = sqlSessionFactory.openSession();
        int result = session.insert("con.berryst.demo.mapper.UserMapper.addUser", user);
        session.close();
        return result;
    }

    @Override
    public int updateUser(User user) {
        SqlSession session = sqlSessionFactory.openSession();
        int result = session.update("con.berryst.demo.mapper.UserMapper.updateUser", user);
        session.close();
        return result;
    }

    @Override
    public int deleteUser(int user_id) {
        SqlSession session = sqlSessionFactory.openSession();
        int result = session.delete("con.berryst.demo.mapper.UserMapper.deleteUser", user_id);
        session.close();
        return result;
    }
}
