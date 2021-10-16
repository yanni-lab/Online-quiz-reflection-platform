package com.berryst.demo.mapper;

import com.berryst.demo.model.Feedback;
import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
import com.berryst.demo.model.Quiz;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

/**
 * @ClassName QuizMapper
 * @Author Shirui Cheng
 * @Description Mapper for quiz, question, question_choice and feedback table
 * @version: v1.0.0
 * @Date 19:47 2021/10/16
 **/
@Mapper
@Repository
public interface QuizMapper {
    ArrayList<Map> getPublicQuiz();

    ArrayList<Map> getSupervisorQuiz(int userId);

    int setQuiz(Quiz quiz);

    int setQuestion(Question question);

    int setChoice(QuestionChoice choice);

    int setFeedback(Feedback feedback);

    int deleteQuiz(int quizId);

    Quiz getQuizContent(int quizId);

    ArrayList<Question> getQuestionList(int quizId);

    ArrayList<QuestionChoice> getChoiceList(int questionId);

    ArrayList<Feedback> getFeedbackList(int quizId);

    int setQuizPublic(int quizId);

    int setQuizPrivate(int quizId);


}
