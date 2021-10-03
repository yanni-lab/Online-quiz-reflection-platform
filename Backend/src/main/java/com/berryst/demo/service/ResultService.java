package com.berryst.demo.service;

import com.berryst.demo.model.Comment;
import com.berryst.demo.model.QuizResult;

import java.util.ArrayList;
import java.util.Map;

public interface ResultService {
    int saveResult(QuizResult result);

    int shareResult(QuizResult result, String email);

    ArrayList<String> getUserFeedback(int userId);

    ArrayList<String> getSupervisorFeedback(int userId);

    int saveComment(Comment comment);

    ArrayList<Map> getComment();
}
