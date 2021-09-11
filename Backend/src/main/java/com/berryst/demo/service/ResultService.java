package com.berryst.demo.service;

import com.berryst.demo.model.QuizResult;

public interface ResultService {
    int saveResult(QuizResult result);

    int shareResult(QuizResult result, String email);
}
