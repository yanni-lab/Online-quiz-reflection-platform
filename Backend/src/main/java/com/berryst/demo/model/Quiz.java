package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {
    private int quizId;
    private String quizTitle;
    private String quizBackground;
    private int supervisorId;
    private boolean isPublic;
    private ArrayList<Question> questions;
    private ArrayList<Feedback> feedback;

}
