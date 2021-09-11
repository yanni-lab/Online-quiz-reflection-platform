package com.berryst.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.berryst.demo.model.QuizResult;


@Mapper
@Repository
public interface SaveResultMapper {
    int saveResult(QuizResult quizResult);
}
