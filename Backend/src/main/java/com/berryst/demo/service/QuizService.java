package com.berryst.demo.service;

import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
import com.berryst.demo.model.Quiz;
import org.apache.ibatis.javassist.compiler.ast.Pair;

import java.util.ArrayList;

public interface QuizService {
    ArrayList<Pair> getPublicQuizList();

    Quiz getQuizContent(int quizId);

    ArrayList<Question> getQuestionList(int quizId);

    ArrayList<QuestionChoice> getChoiceList(int questionId);

    ArrayList<Pair> getSuvervisorQuiz(int supervisorId);

    int setQuiz(Quiz quiz);

    int deleteQuiz(int quizId);

    int makeQuizPublic(int quizId);

    int makeQuizPrivate(int quizId);


}
