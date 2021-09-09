package com.berryst.demo.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supervisor {
    private int user_id;
    private String username;
    private String password;
    private String email;
}


