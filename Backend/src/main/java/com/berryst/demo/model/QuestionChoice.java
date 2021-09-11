package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionChoice {
    private int choiceId;
    private int mark;
    private String choice;
    private int questionId;

    public QuestionChoice(int choiceId, int mark, String choice, int questionId) {
        this.choiceId = choiceId;
        this.mark = mark;
        this.choice = choice;
        this.questionId = questionId;
    }
}
