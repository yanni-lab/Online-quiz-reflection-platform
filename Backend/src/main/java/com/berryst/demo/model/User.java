package com.berryst.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int userId;
    private String username;
    private String password;
    private String email;
    private boolean isSupervisor;
}