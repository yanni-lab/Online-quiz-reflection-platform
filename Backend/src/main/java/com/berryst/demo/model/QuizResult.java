package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

@Data
@NoArgsConstructor
public class QuizResult {
    int attemptId;
    int userId;
    int quizId;
    Integer[] choices;
    int numberOfAttempt;
    int score;
    String reflection;
    boolean reflectionAvailable;
    Date attemptTime;
    int supervisorId;

}
