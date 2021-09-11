package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class QuizResult {
    int attemptId;
    int userId;
    int quizId;
    ArrayList choices;
    int numberOfAttempt;
    int score;
    String Reflection;

}
