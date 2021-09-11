package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class Question {
    private int questionId;
    private String question;
    private ArrayList<QuestionChoice> choices;
    private int quizId;
    private int questionOrder;

    public Question(int questionId, String question, ArrayList<QuestionChoice> choices, int quizId, int questionOrder) {
        this.questionId = questionId;
        this.question = question;
        this.choices = choices;
        this.quizId = quizId;
        this.questionOrder = questionOrder;
    }
}
