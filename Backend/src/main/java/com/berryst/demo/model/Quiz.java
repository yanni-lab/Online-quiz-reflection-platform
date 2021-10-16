package com.berryst.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @ClassName Quiz
 * @Author Shirui Cheng
 * @Description Entity class for quiz
 * @version: v1.0.0
 * @Date 19:27 2021/10/16
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {
    private int quizId; //ID of quiz
    private String quizTitle; //Name of quiz
    private String quizBackground; //quiz background
    private int supervisorId; //which supervisor create this quiz
    @JsonProperty("isPublic")
    private boolean isPublic; //is quiz public or private
    private ArrayList<Question> questions; //question list of a quiz
    private ArrayList<Feedback> feedback; //feedback list of a quiz

}
