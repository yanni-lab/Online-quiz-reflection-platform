package com.berryst.demo.module;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Supervisor {
    private int user_id;
    private String username;
    private String password;
    private String email;

    public Supervisor(int user_id, String username, String password, String email){
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}


