package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @ClassName QuizResult
 * @Author Shirui Cheng
 * @Description Entity class for quiz result
 * @version: v1.0.0
 * @Date 19:29 2021/10/16
 **/
@Data
@NoArgsConstructor
public class QuizResult {
    int attemptId; //unique id of a result
    int userId; //which user take the quiz
    int quizId; //user take which quiz
    Integer[] choices; //user's answer of this quiz, int represent choice order
    int numberOfAttempt; //how many times this user take this quiz
    int score; //total score of all user choice
    String reflection; //user's reflection diary
    boolean reflectionAvailable; //can supervisor view this reflection
    Date attemptTime; //Date when user take this result
    int supervisorId; //which supervisor create the quiz
}
