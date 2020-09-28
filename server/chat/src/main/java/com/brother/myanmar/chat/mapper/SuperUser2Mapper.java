package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.SuperUser;

public interface SuperUser2Mapper {

    SuperUser findUserById(SuperUser user);
    SuperUser findUserByAccount(SuperUser user);
    int insertUser(SuperUser user);
    int deleteUser(SuperUser user);
    int updateUser(SuperUser user);
}
