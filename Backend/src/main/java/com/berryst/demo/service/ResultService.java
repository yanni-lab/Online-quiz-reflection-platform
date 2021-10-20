package com.berryst.demo.service;

import com.berryst.demo.model.Comment;
import com.berryst.demo.model.QuizResult;

import java.util.ArrayList;

public interface ResultService {
    int saveResult(QuizResult result);

//    int shareResult(QuizResult result, String email);

    ArrayList<String> getUserFeedback(int userId);

    ArrayList<String> getSupervisorFeedback(int userId);

    QuizResult getResultContent(int attemptId);

    int saveComment(Comment comment);

    ArrayList<String> getComment();

    String getFeedbackContent(int quizId, int score);

    int updateShareWithSupervisor(QuizResult quizResult);

    int saveResultAsAnonymous(QuizResult result);
}
