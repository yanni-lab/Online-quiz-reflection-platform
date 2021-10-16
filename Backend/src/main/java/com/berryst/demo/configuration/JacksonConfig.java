package com.berryst.demo.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @ClassName JacksonConfig
 * @Author Shirui Cheng
 * @Description Configuration for jackson package
 * @version: v1.0.0
 * @Date 18:48 2021/10/16
 **/
@Configuration
public class JacksonConfig {
    @Bean("objectMapper")
    public ObjectMapper myMapper() {
        return new ObjectMapper().disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }
}
