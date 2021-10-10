package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionChoice {
    private int choiceId;
    private int score;
    private String choice;
    private int questionId;
    private int questionChoiceOrder;
}
