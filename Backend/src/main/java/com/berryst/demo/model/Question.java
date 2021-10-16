package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @ClassName Question
 * @Author Shirui Cheng
 * @Description Entity class for quiz question
 * @version: v1.0.0
 * @Date 19:20 2021/10/16
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private int questionId; //ID of a question
    private String question; //question content
    private ArrayList<QuestionChoice> choices; //choice of this question
    private int quizId; //question belong to which quiz
    private int questionOrder; //order of question in this quiz


}
