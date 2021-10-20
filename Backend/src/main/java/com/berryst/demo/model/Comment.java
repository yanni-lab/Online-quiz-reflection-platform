package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @ClassName Comment
 * @Author Shirui Cheng
 * @Description Entity class for user comment
 * @version: v1.0.0
 * @Date 19:13 2021/10/16
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    Date commentTime; //Time of a comment
    private int commentId; //ID of a comment
    private String comment; //Content of a comment
}
