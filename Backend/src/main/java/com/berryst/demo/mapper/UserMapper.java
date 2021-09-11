package com.berryst.demo.mapper;

import com.berryst.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

// Dao for CRUD
@Mapper
@Repository
public interface UserMapper {
    List<User> queryUserList();

    User queryUserById(int user_id);

    User queryUserByEmail(String email);

    User queryUserByUsername(String username);

    int addUser(User user);

    int updateUser(User user);

    int deleteUser(int user_id);
}
