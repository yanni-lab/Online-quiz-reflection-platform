package com.berryst.demo.service.impl;

import com.berryst.demo.mapper.ResultMapper;
import com.berryst.demo.model.Comment;
import com.berryst.demo.model.QuizResult;
import com.berryst.demo.service.ResultService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;

@Slf4j
@Service
public class ResultServiceImpl implements ResultService {
    @Resource
    private ResultMapper resultMapper;

    @Override
    public int saveResult(QuizResult result) {
        if(result.getUserId()==-1){
            log.info("Save result as Anonymous user");
            saveResultAsAnonymous(result);
        }
        QuizResult preResult = resultMapper.getLatestAttempt(result.getUserId(),result.getQuizId());
        if(preResult==null){
            result.setNumberOfAttempt(1);
        }else{
            result.setNumberOfAttempt(preResult.getNumberOfAttempt()+1);
        }
        resultMapper.saveResult(result);
        //return attempt id
        return result.getAttemptId();
    }

//    @Override
//    public int shareResult(QuizResult result, String email) {
//        if(result.getUserId()==-1){
//            saveResultAsAnonymous(result);
//        }
//        QuizResult preResult = resultMapper.getLatestAttempt(result.getUserId(),result.getQuizId());
//        if(preResult==null){
//            result.setNumberOfAttempt(1);
//        }else{
//            result.setNumberOfAttempt(preResult.getNumberOfAttempt()+1);
//        }
//        //return attempt id
//        return resultMapper.saveResult(result);
//    }

    @Override
    public ArrayList<String> getUserFeedback(int userId) {
        return resultMapper.getUserFeedback(userId);
    }

    @Override
    public ArrayList<String> getSupervisorFeedback(int userId) {
        return resultMapper.getSupervisorFeedback(userId);
    }

    @Override
    public QuizResult getResultContent(int attemptId) {
        return resultMapper.getResultContent(attemptId);
    }

    @Override
    public int saveComment(Comment comment) {
        return resultMapper.saveComment(comment);
    }

    @Override
    public ArrayList<String> getComment() {
        return resultMapper.getComment();
    }

    @Override
    public String getFeedbackContent(int quizId, int score) {
        return resultMapper.getFeedbackContent(quizId,score);
    }

    @Override
    public int updateShareWithSupervisor(QuizResult quizResult) {
        log.info("update reflection_available field");
        return resultMapper.updateShareWithSupervisor(quizResult);
    }

    @Override
    public int saveResultAsAnonymous(QuizResult result) {
        return resultMapper.saveResultAsAnonymous(result);
    }
}
