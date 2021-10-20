package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @ClassName QuestionChoice
 * @Author Shirui Cheng
 * @Description Entity class for question choice
 * @version: v1.0.0
 * @Date 19:23 2021/10/16
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionChoice {
    private int choiceId; //Id of a choice
    private int score; //score of a choice
    private String choice; //choice content
    private int questionId; //choice belong to which question
    private int questionChoiceOrder; //order of choice in this question
}
