package com.berryst.demo.service.impl;


import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;

import java.util.ArrayList;

public class QuizServiceImpl implements QuizService {
    @Override
    public ArrayList getPublicQuizList() {
        return null;
    }

    @Override
    public Quiz getQuizContent(int quizId) {
        return null;
    }

    @Override
    public ArrayList getSuvervisorQuiz(int quizId, int supervisorId) {
        return null;
    }

    @Override
    public int setQuiz(Quiz quiz) {
        return 0;
    }

    @Override
    public int deleteQuiz(int quizId) {
        return 0;
    }

    @Override
    public int makeQuizPublic(int quizId) {
        return 0;
    }

    @Override
    public int makeQuizPrivate(int quizId) {
        return 0;
    }

    @Override
    public ArrayList getUserFeedback(int userId) {
        return null;
    }

    @Override
    public ArrayList getSupervisorFeedback(int userId) {
        return null;
    }

}
