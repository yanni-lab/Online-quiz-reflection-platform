package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @ClassName Feedback
 * @Author Shirui Cheng
 * @Description Entity Class for Quiz Feedback
 * @version: v1.0.0
 * @Date 19:17 2021/10/16
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    private int feedbackId; //ID of a feedback
    private int quizId; //feedback belong to which quiz
    private int lowerBound; //lower bound of feedback score range
    private int upperBound; //upper bound of feedback score range
    private String feedbackContent; //detailed content of a feedback
    private int feedbackOrder; //The order of a feedback
}
