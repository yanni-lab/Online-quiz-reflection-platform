package com.berryst.demo.mapper.impl;

import com.berryst.demo.mapper.SupervisorMapper;
import com.berryst.demo.module.Supervisor;
import com.berryst.demo.module.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import javax.annotation.Resource;
import java.util.List;

public class SupervicorMapperImpl implements SupervisorMapper {
    @Resource
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<Supervisor> querySupervisorList() {
        SqlSession session = sqlSessionFactory.openSession();
        List<Supervisor> userList = session.selectList("con.berryst.demo.mapper.SupervisorMapper.querySupervisorList");
        session.close();
        return userList;
    }

    @Override
    public Supervisor querySupervisorById(int user_id) {
        SqlSession session = sqlSessionFactory.openSession();
        Supervisor supervisor = session.selectOne("con.berryst.demo.mapper.SupervisorMapper.querySupervisorById",user_id);
        session.close();
        return supervisor;
    }

    @Override
    public Supervisor querySupervisorByEmail(String email) {
        SqlSession session = sqlSessionFactory.openSession();
        Supervisor supervisor = session.selectOne("con.berryst.demo.mapper.SupervisorMapper.querySupervisorByEmail",email);
        session.close();
        return supervisor;
    }

    @Override
    public int addSupervisor(Supervisor user) {
        SqlSession session = sqlSessionFactory.openSession();
        int result = session.insert("con.berryst.demo.mapper.SupervisorMapper.addSupervisor", user);
        session.close();
        return result;
    }

    @Override
    public int updateSupervisor(Supervisor user) {
        SqlSession session = sqlSessionFactory.openSession();
        int result = session.update("con.berryst.demo.mapper.SupervisorMapper.updateSupervisor", user);
        session.close();
        return result;
    }

    @Override
    public int deleteSupervisor(int user_id) {
        SqlSession session = sqlSessionFactory.openSession();
        int result = session.delete("con.berryst.demo.mapper.SupervisorMapper.deleteSupervisor", user_id);
        session.close();
        return result;
    }
}
