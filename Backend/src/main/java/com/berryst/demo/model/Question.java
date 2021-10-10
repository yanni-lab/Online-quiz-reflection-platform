package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private int questionId;
    private String question;
    private ArrayList<QuestionChoice> choices;
    private int quizId;
    private int questionOrder;


}
