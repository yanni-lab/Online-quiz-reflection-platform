package com.berryst.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;

@SpringBootApplication
//TODO initiate user table with anonymous user
public class DemoApplication {

    public static HashMap<Integer, Long> tokenList = new HashMap<>();
    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
    }

}
