package com.berryst.demo.mapper;

import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
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

    ArrayList<Question> getQuestionList(int quizId);

    ArrayList<QuestionChoice> getChoiceList(int questionId);

    int makeQuizPublic(int quizId);

    int makeQuizPrivate(int quizId);


}
