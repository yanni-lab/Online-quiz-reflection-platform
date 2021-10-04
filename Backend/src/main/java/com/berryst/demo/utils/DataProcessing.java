package com.berryst.demo.utils;

public class DataProcessing {
    //TODO Filter input and output from database
    public static String replaceLineSeparator(String s){
        s= s.replace("\\n", "<br/>");
        s= s.replace("\\r", "<br/>");
        return s;
    }

    public static String addLineSeparator(String s){
        return s.replace("<br/>", "\n");
    }
}
