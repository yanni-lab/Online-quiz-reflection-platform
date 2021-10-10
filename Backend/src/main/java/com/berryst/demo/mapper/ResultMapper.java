package com.berryst.demo.mapper;

import java.util.ArrayList;
import java.util.Map;

import com.berryst.demo.model.Comment;
import com.berryst.demo.model.QuizResult;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


@Mapper
@Repository
public interface ResultMapper {

    QuizResult getResultContent(int attemptId);

    int saveResult(QuizResult quizResult);

    ArrayList<String> getUserFeedback(int userId);

    ArrayList<String> getSupervisorFeedback(int userId);

    QuizResult getLatestAttempt (int userId, int quizId);

    int saveComment(Comment comment);

    ArrayList<String> getComment();

    String getFeedbackContent(int quizId, int score);

    int updateShareWithSupervisor(QuizResult quizResult);

    int saveResultAsAnonymous(QuizResult result);

}
