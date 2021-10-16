package com.berryst.demo.mapper;

import com.berryst.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @ClassName UserMapper
 * @Author Han Sun
 * @Description Dao for CRUD on user table
 * @version: v1.0.0
 * @Date 20:30 2021/10/16
 **/
@Mapper
@Repository
public interface UserMapper {
    List<User> queryUserList();

    User queryUserById(int user_id);

    User queryUserByEmail(String email);

    List<User> queryUserByUsername(String username);

    int addUser(User user);

    int updateUser(User user);

    int deleteUser(int user_id);

    int resetPassword(int userId, String password);
}
