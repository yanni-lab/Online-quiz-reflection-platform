package com.berryst.demo.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

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
//    @Value("${spring.mail.username}")
//    private String from;

    public void sendMail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("BerryStreet_Boxjelly@outlook.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }
}