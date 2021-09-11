package com.berryst.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class User {
    private int user_id;
    private String username;
    private String password;
    private String email;

    public User(int user_id, String username, String password, String email){
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}