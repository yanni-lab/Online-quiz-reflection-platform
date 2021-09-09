package com.berryst.demo.controller;

import com.berryst.demo.mapper.SupervisorMapper;
import com.berryst.demo.pojo.Supervisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupervisorController {
    @Autowired
    private SupervisorMapper supervisorMapper;

    @GetMapping(value = "/querySupervisorList", produces = {"application/json;charset=utf-8"})
    public List<Supervisor> queryUserList() {
        List<Supervisor> supervisorList = supervisorMapper.querySupervisorList();
        for (Supervisor supervisor: supervisorList) {
            System.out.println(supervisor);
        }
        return supervisorList;
    }

    @GetMapping(value = "/querySupervisorById", produces = {"application/json;charset=utf-8"})
    public Supervisor querySupervisorById() {
        Supervisor supervisor = supervisorMapper.querySupervisorById(1);
        return supervisor;
    }

    @GetMapping(value = "/addSupervisor", produces = {"application/json;charset=utf-8"})
    public int addSupervisor() {
        Supervisor supervisor = new Supervisor(2, "test", "test123", "test@xxx.com");
        return supervisorMapper.addSupervisor(supervisor);
    }

    @GetMapping(value = "/updateSupervisor", produces = {"application/json;charset=utf-8"})
    public int updateSupervisor() {
        Supervisor supervisor = new Supervisor(2, "updated", "update123", "update@xxx.com");
        return supervisorMapper.updateSupervisor(supervisor);
    }

    @GetMapping(value = "/deleteSupervisor", produces = {"application/json;charset=utf-8"})
    public int deleteSupervisor() {
        return supervisorMapper.deleteSupervisor(2);
    }

}
