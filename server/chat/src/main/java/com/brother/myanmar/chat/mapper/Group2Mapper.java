package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.Group;

public interface Group2Mapper {

    Group findGroup(int id);
    int insertGroup(Group user);
    int deleteGroup(int id);
    int updateGroup(Group user);
}
