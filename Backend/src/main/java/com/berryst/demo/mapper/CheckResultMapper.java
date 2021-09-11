package com.berryst.demo.mapper;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


@Mapper
@Repository
public interface CheckResultMapper {
    ArrayList getResultUser(int userId);

    ArrayList getResultSupervisor(int quizId, int userId);
}
