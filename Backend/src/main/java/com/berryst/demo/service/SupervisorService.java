package com.berryst.demo.service;

import com.berryst.demo.module.Supervisor;

import java.util.List;

public interface SupervisorService {
    List<Supervisor> querySupervisorList();

    Supervisor querySupervisorById(int user_id);

    Supervisor querySupervisorByEmail(String email);

    int addSupervisor(Supervisor user);

    int updateSupervisor(Supervisor user);

    int deleteSupervisor(int user_id);
}
