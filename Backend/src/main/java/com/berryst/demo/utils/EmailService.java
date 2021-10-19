package com.berryst.demo.utils;

import com.berryst.demo.model.QuizResult;
import com.berryst.demo.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @ClassName EmailService
 * @Author Shirui Cheng
 * @Description SpringBoot mail service to send email
 * @version: v1.0.0
 * @Date 18:21 2021/10/16
 **/
@Component
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Resource
    private ResultService resultService;
//    @Value("${spring.mail.username}")
//    private String from;

    public void sendMail(String to, String subject, QuizResult result) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("BerryStreet_Boxjelly@outlook.com");
        message.setTo(to);
        message.setSubject(subject);


        String messageBody = "";
        messageBody = messageBody.concat("Dear user,\n");
        messageBody = messageBody.concat("Here is your feedback:\n\n");
        messageBody = messageBody.concat(resultService.getFeedbackContent(result.getQuizId(), result.getScore()));
        message.setText(messageBody);
        System.out.println(messageBody);
        javaMailSender.send(message);
    }
}