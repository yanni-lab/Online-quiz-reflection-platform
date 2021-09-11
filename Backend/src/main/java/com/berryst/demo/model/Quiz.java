package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class Quiz {
    private int quizId;
    private String quizTitle;
    private String quizBackground;
    private int supervisorId;
    private boolean isPublic;
    private ArrayList<Question> questions;
    private String feedback;

    public Quiz(int quizId, String quizTitle, String quizBackground, int supervisorId, boolean isPublic, ArrayList<Question> questions) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.quizBackground = quizBackground;
        this.supervisorId = supervisorId;
        this.isPublic = isPublic;
        this.questions = questions;
    }
}
