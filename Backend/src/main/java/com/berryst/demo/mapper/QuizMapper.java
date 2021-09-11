package com.berryst.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.javassist.compiler.ast.Pair;
import org.springframework.stereotype.Repository;
import com.berryst.demo.model.Quiz;

import java.util.ArrayList;

@Mapper
@Repository
public interface QuizMapper {
    ArrayList<Pair> getPublicQuiz();

    ArrayList<Pair> getSupervisorQuiz(int supervisorid);

    int addQuiz(Quiz quiz);

    int editQuiz(Quiz quiz);

    int deleteQuiz(int quizId);

    Quiz getQuizContent(int quizId);

    int makeQuizPublic(int quizId);

    int makeQuizPrivate(int quizId);


}
