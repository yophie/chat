package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;

import java.util.List;

public interface Group2Mapper {

    Group findGroup(int id);
    int insertGroup(Group user);
    int deleteGroup(int id);
    int updateGroup(Group user);
    List<Friend> findFriendState(Friend user);
}
