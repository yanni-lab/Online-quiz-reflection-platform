package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class Question {
    private int questionId;
    private String question;
    private ArrayList choices;
    private int quizId;

    public Question(int questionId, String question, ArrayList choices, int quizId) {
        this.questionId = questionId;
        this.question = question;
        this.choices = choices;
        this.quizId = quizId;
    }
}
