package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.User;

public interface User2Mapper {

    User findUserById(int id);
    User findUserByOpenId(User user);
    User findUserByAccount(User user);
    int insertUser(User user);
    int deleteUser(int id);
    int updateUser(User user);
    int updateUserMoney(User user);
}
