package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.User;

public interface User2Mapper {

    User findUserById(User user);
    User findUserByOpenId(User user);
    User findUserByAccount(User user);
    int insertUser(User user);
    int deleteUser(User user);
    int updateUser(User user);
}
