package com.berryst.demo.service;

import com.berryst.demo.model.Quiz;
import java.util.ArrayList;

public interface QuizService {
    ArrayList getPublicQuizList();

    Quiz getQuizContent(int quizId);

    ArrayList getSuvervisorQuiz(int quizId, int supervisorId);

    int setQuiz(Quiz quiz);

    int deleteQuiz(int quizId);

    int makeQuizPublic(int quizId);

    int makeQuizPrivate(int quizId);

    ArrayList getUserFeedback(int userId);

    ArrayList getSupervisorFeedback(int userId);
}
