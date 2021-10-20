package com.berryst.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;

//TODO initiate user table with anonymous user

/**
 * @ClassName DemoApplication
 * @Author Han Sun
 * @Description Main function to start SpringBoot Application
 * @version: v1.8.0
 * @Date 18:17 2021/10/16
 **/
@SpringBootApplication
public class DemoApplication {

    public static HashMap<Integer, Long> tokenList = new HashMap<>();

    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
    }

}
