package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.Friend;

import java.util.List;

public interface Friend2Mapper {

    List<Friend> findFriend(Friend user);
    List<Friend> findFriendByState(Friend user);
    int insertFriend(Friend user);
    int deleteFriend(Friend user);
    int updateFriend(Friend user);
    List<Friend> findGroupMembers(int i);
    Friend findOneFriend(Friend user);
}
