package com.berryst.demo.mapper;

import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.berryst.demo.model.Quiz;

import java.util.ArrayList;
import java.util.Map;

@Mapper
@Repository
public interface QuizMapper {
    ArrayList<Map> getPublicQuiz();

    ArrayList<Map> getSupervisorQuiz(int supervisorid);

    int setQuiz(Quiz quiz);

    int setQuestion(Question question);

    int setChoice(QuestionChoice choice);

    int deleteQuiz(int quizId);

    Quiz getQuizContent(int quizId);

    ArrayList<Question> getQuestionList(int quizId);

    ArrayList<QuestionChoice> getChoiceList(int questionId);

    int setQuizPublic(int quizId);

    int setQuizPrivate(int quizId);


}
