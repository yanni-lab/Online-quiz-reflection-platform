package com.berryst.demo.service.impl;

import com.berryst.demo.mapper.QuizMapper;
import com.berryst.demo.mapper.ResultMapper;
import com.berryst.demo.model.QuizResult;
import com.berryst.demo.service.ResultService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
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
        QuizResult preResult = resultMapper.getLatestAttempt(result.getUserId(),result.getQuizId());
        if(preResult==null){
            result.setNumberOfAttempt(1);
        }else{
            result.setNumberOfAttempt(preResult.getNumberOfAttempt()+1);
        }
        return resultMapper.saveResult(result);
    }

    @Override
    public int shareResult(QuizResult result, String email) {
        //Send Email to email
        QuizResult preResult = resultMapper.getLatestAttempt(result.getUserId(),result.getQuizId());
        if(preResult==null){
            result.setNumberOfAttempt(1);
        }else{
            result.setNumberOfAttempt(preResult.getNumberOfAttempt()+1);
        }

        return resultMapper.saveResult(result);
    }

    @Override
    public ArrayList<String> getUserFeedback(int userId) {
        return resultMapper.getUserFeedback(userId);
    }

    @Override
    public ArrayList<String> getSupervisorFeedback(int userId) {
        return resultMapper.getSupervisorFeedback(userId);
    }
}
