package com.berryst.demo.utils;

/**
 * @ClassName DataProcessing
 * @Author Shirui Cheng
 * @Description Replace line separator for MySQL database
 * @version: v1.0.0
 * @Date 18:19 2021/10/16
 **/
public class DataProcessing {
    public static String replaceLineSeparator(String s) {
        s = s.replace("\\n", "<br/>");
        s = s.replace("\\r", "<br/>");
        return s;
    }

    public static String addLineSeparator(String s) {
        return s.replace("<br/>", "\n");
    }
}
