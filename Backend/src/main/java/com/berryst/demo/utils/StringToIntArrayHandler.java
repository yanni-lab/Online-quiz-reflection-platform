package com.berryst.demo.utils;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName StringToIntArrayHandler
 * @Author Shirui Cheng
 * @Description Java Integer array and MySQL String convertor
 * @version: v1.0.0
 * @Date 18:22 2021/10/16
 **/
public class StringToIntArrayHandler extends BaseTypeHandler<Integer[]> {

    private static final String splitCharset = ",";


    /**
     * @return a
     * @Author Shirui Cheng
     * @Decription Integer array to MySQL String, using predefined separator to separate elements in String
     * @Date 18:23 2021/10/6
     * @Param
     **/
    private static String arrayToString(Integer[] array) {
        StringBuilder res = new StringBuilder();
        if (array != null && array.length > 0) {
            for (Object o : array) {
                res.append(splitCharset).append(o.toString());
            }
            res.append(splitCharset);
        }
        return res.length() > 0 ? res.toString() : null;
    }

    /**
     * @return a
     * @Author Shirui Cheng
     * @Decription MySQL String to Integer array, using predefined separator to separate elements in String
     * @Date 18:23 2021/10/6
     * @Param
     **/
    private static Integer[] stringToArray(String str) {
        List<Integer> list = new ArrayList<>();
        if (str != null) {
            String[] array = str.split(splitCharset);
            if (array.length > 0) {
                for (String o : array) {
                    if (o != null && o.length() > 0) {
                        list.add(Integer.parseInt(o));
                    }
                }
            }
        }
        return list.toArray(new Integer[0]);
    }

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Integer[] objects, JdbcType jdbcType) throws SQLException {
        String str = arrayToString(objects);
        ps.setString(i, str);
    }

    @Override
    public Integer[] getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String str = rs.getString(columnName);
        return stringToArray(str);
    }

    // --- private methods ---

    @Override
    public Integer[] getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String str = rs.getString(columnIndex);
        return stringToArray(str);
    }

    @Override
    public Integer[] getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String str = cs.getString(columnIndex);
        return stringToArray(str);
    }
}