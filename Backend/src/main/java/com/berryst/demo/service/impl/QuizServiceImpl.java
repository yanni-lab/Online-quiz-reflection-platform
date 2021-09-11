package com.berryst.demo.service.impl;

import com.berryst.demo.mapper.QuizMapper;
import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import org.apache.ibatis.javassist.compiler.ast.Pair;

import javax.annotation.Resource;
import java.util.ArrayList;

public class QuizServiceImpl implements QuizService {
    @Resource
    private QuizMapper quizMapper;

    @Override
    public ArrayList<Pair> getPublicQuizList() {
        return quizMapper.getPublicQuiz();
    }

    @Override
    public Quiz getQuizContent(int quizId) {
        return quizMapper.getQuizContent(quizId);
    }

    @Override
    public ArrayList<Pair> getSuvervisorQuiz(int supervisorId) {
        return quizMapper.getSupervisorQuiz(supervisorId);
    }

    @Override
    public int setQuiz(Quiz quiz) {
        int quizId = quiz.getQuizId();
        quizMapper.deleteQuiz(quizId);
        return quizMapper.addQuiz(quiz);
    }

    @Override
    public int deleteQuiz(int quizId) {
        return quizMapper.deleteQuiz(quizId);
    }

    @Override
    public int makeQuizPublic(int quizId) {
        return quizMapper.makeQuizPublic(quizId);
    }

    @Override
    public int makeQuizPrivate(int quizId) {
        return quizMapper.makeQuizPrivate(quizId);
    }


}
