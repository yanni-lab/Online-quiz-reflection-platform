package com.berryst.demo.mapper;

import com.berryst.demo.pojo.Supervisor;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

// Dao for CRUD
@Mapper
@Repository
public interface SupervisorMapper {
    List<Supervisor> querySupervisorList();

    Supervisor querySupervisorById(int user_id);

    int addSupervisor(Supervisor user);

    int updateSupervisor(Supervisor user);

    int deleteSupervisor(int user_id);
}
