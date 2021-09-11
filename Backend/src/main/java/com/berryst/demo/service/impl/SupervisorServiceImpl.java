package com.berryst.demo.service.impl;

import com.berryst.demo.mapper.SupervisorMapper;
import com.berryst.demo.model.Supervisor;
import com.berryst.demo.service.SupervisorService;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class SupervisorServiceImpl implements SupervisorService {
    @Resource
    SupervisorMapper supervisorMapper;

    @Override
    public List<Supervisor> querySupervisorList() {
        return supervisorMapper.querySupervisorList();
    }

    @Override
    public Supervisor querySupervisorById(int user_id) {
        return supervisorMapper.querySupervisorById(user_id);
    }

    @Override
    public Supervisor querySupervisorByEmail(String email) {
        return supervisorMapper.querySupervisorByEmail(email);
    }

    @Override
    public int addSupervisor(Supervisor user) {
        return supervisorMapper.addSupervisor(user);
    }

    @Override
    public int updateSupervisor(Supervisor user) {
        return supervisorMapper.updateSupervisor(user);
    }

    @Override
    public int deleteSupervisor(int user_id) {
        return supervisorMapper.deleteSupervisor(user_id);
    }
}
