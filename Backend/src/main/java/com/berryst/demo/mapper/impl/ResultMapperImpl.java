package com.berryst.demo.mapper.impl;

import com.berryst.demo.mapper.ResultMapper;
import com.berryst.demo.model.QuizResult;

import java.util.ArrayList;

public class ResultMapperImpl implements ResultMapper {
    @Override
    public ArrayList<QuizResult> getResultUser(int userId) {
        return null;
    }

    @Override
    public ArrayList<QuizResult> getResultSupervisor(int quizId, int userId) {
        return null;
    }

    @Override
    public int saveResult(QuizResult quizResult) {
        return 0;
    }
}
