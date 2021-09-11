package com.berryst.demo.service;

import com.berryst.demo.model.QuizResult;

import java.util.ArrayList;

public interface ResultService {
    int saveResult(QuizResult result);

    int shareResult(QuizResult result, String email);

    ArrayList<String> getUserFeedback(int userId);

    ArrayList<String> getSupervisorFeedback(int userId);
}
