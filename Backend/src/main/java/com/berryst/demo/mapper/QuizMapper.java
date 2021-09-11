package com.berryst.demo.mapper;

import com.berryst.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.berryst.demo.model.Quiz;

import java.util.ArrayList;

@Mapper
@Repository
public interface QuizMapper {
    ArrayList getPublicQuiz();

    ArrayList getSupervisorQuiz(int userID);

    int addQuiz(Quiz quiz);

    int editQuiz(Quiz quiz);

    int deleteQuiz(int quizId);

    Quiz getQuizContent(int quizId);

    int makeQuizPublic(int quizId);

    int makeQuizPrivate(int quizId);


}
