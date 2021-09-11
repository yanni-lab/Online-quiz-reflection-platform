package com.berryst.demo.service.impl;

import com.berryst.demo.model.QuizResult;
import com.berryst.demo.service.ResultService;

import java.util.ArrayList;

public class ResultServiceImpl implements ResultService {
    @Override
    public int saveResult(QuizResult result) {
        return 0;
    }

    @Override
    public int shareResult(QuizResult result, String email) {
        return 0;
    }

    @Override
    public ArrayList<String> getUserFeedback(int userId) {
        return null;
    }

    @Override
    public ArrayList<String> getSupervisorFeedback(int userId) {
        return null;
    }
}
