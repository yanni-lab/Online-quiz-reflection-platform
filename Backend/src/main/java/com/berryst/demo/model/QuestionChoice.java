package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionChoice {
    private int choiceId;
    private int score;
    private String choice;
    private int questionId;
    private int questionChoiceOrder;

    public QuestionChoice(int choiceId, int score, String choice, int questionId, int questionChoiceOrder) {
        this.choiceId = choiceId;
        this.score = score;
        this.choice = choice;
        this.questionId = questionId;
        this.questionChoiceOrder = questionChoiceOrder;
    }
}
