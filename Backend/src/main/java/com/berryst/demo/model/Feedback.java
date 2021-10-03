package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    private int feedbackId;
    private int quizId;
    private int lowerBound;
    private int upperBound;
    private String feedbackContent;
    private int feedbackOrder;
}
