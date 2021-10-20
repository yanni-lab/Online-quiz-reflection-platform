package com.berryst.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @ClassName User
 * @Author Han Sun
 * @Description Entity class for user
 * @version: v1.0.0
 * @Date 19:29 2021/10/16
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int userId;
    private String username;
    private String password;
    private String email;
    @JsonProperty("isSupervisor")
    private boolean isSupervisor;
}