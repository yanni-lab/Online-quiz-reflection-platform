package com.berryst.demo.mapper;

import com.berryst.demo.model.Comment;
import com.berryst.demo.model.QuizResult;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * @ClassName ResultMapper
 * @Author Shirui Cheng
 * @Description Mapper for user_result and comment table
 * @version: v1.0.0
 * @Date 20:29 2021/10/16
 **/
@Mapper
@Repository
public interface ResultMapper {

    QuizResult getResultContent(int attemptId);

    int saveResult(QuizResult quizResult);

    ArrayList<String> getUserFeedback(int userId);

    ArrayList<String> getSupervisorFeedback(int userId);

    QuizResult getLatestAttempt(int userId, int quizId);

    int saveComment(Comment comment);

    ArrayList<String> getComment();

    String getFeedbackContent(int quizId, int score);

    int updateShareWithSupervisor(QuizResult quizResult);

    int saveResultAsAnonymous(QuizResult result);

}
