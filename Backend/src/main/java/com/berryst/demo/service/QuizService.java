package com.berryst.demo.service;

import com.berryst.demo.model.Feedback;
import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
import com.berryst.demo.model.Quiz;
import java.util.ArrayList;
import java.util.Map;

public interface QuizService {
    ArrayList<Map> getPublicQuizList();

    Quiz getQuizContent(int quizId);

    ArrayList<Question> getQuestionList(int quizId);

    ArrayList<QuestionChoice> getChoiceList(int questionId);

    ArrayList<Feedback> getFeedbackList(int quizId);

    ArrayList<Map> getSupervisorQuiz(int supervisorId);

    int setQuiz(Quiz quiz);

    int setQuestion(Question question);

    int setChoice(QuestionChoice choice);

    int setFeedback(Feedback feedback);

    int deleteQuiz(int quizId);

    int setQuizPublic(int quizId);

    int setQuizPrivate(int quizId);


}
