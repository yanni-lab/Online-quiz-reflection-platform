package com.berryst.demo.mapper.impl;

import com.berryst.demo.mapper.QuizMapper;
import com.berryst.demo.model.Quiz;
import org.apache.ibatis.javassist.compiler.ast.Pair;

import java.util.ArrayList;

public class QuizMapperImpl implements QuizMapper {
    @Override
    public ArrayList<Pair> getPublicQuiz() {

        return null;
    }

    @Override
    public ArrayList<Pair> getSupervisorQuiz(int supervisorId) {
        return null;
    }

    @Override
    public int addQuiz(Quiz quiz) {
        return 0;
    }

    @Override
    public int editQuiz(Quiz quiz) {
        return 0;
    }

    @Override
    public int deleteQuiz(int quizId) {
        return 0;
    }

    @Override
    public Quiz getQuizContent(int quizId) {
        return null;
    }

    @Override
    public int makeQuizPublic(int quizId) {
        return 0;
    }

    @Override
    public int makeQuizPrivate(int quizId) {
        return 0;
    }
}