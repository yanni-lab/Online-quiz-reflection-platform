package com.berryst.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * @ClassName DemoApplicationTests
 * @Author Shirui Cheng
 * @Description Unit tests for Spring Boot application
 * @version: v1.0.0
 * @Date 21:22 2021/10/16
 **/
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    DataSource dataSource;

    @Test
    void dataSourceTest() throws SQLException {
        System.out.println(dataSource.getClass());
        System.out.println(dataSource.getConnection());
    }

    @Test
    void contextLoads() {

    }

}
