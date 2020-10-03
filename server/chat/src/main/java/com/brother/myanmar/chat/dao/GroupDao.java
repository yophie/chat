package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.mapper.Friend2Mapper;
import com.brother.myanmar.chat.mapper.Group2Mapper;
import com.brother.myanmar.chat.mapper.User2Mapper;

import java.util.List;

public class GroupDao {

    public static Group findGroup(int id){
        Group2Mapper mapper = SqlConnection.getSession().getMapper(Group2Mapper.class);
        Group result = mapper.findGroup(id);
        SqlConnection.getSession().commit();
        return result;
    }

    public static List<Friend> findGroupMembers(int id){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        List<Friend> result = mapper.findGroupMembers(id);
        SqlConnection.getSession().commit();
        return result;
    }

    public static int insertGroup(Group group){
        Group2Mapper mapper = SqlConnection.getSession().getMapper(Group2Mapper.class);
        int rint = mapper.insertGroup(group);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static int updateGroup(Group group){
        Group2Mapper mapper = SqlConnection.getSession().getMapper(Group2Mapper.class);
        int rint = mapper.updateGroup(group);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static int deleteGroup(int id){
        User2Mapper mapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        int rint = mapper.deleteUser(id);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static int insertUser(User user){
        User2Mapper user2Mapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        SqlConnection.getSession().commit();
        return rint;
    }
    public static int insertFriend(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        int rint = mapper.insertFriend(user);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static User findUserByAccount(User suser){
        User2Mapper user2Mapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByAccount(suser);
        SqlConnection.getSession().commit();
        return user;
    }
    public static int deleteFriend(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        int rint = mapper.deleteFriend(user);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static Friend findOneFriend(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        Friend result = mapper.findOneFriend(user);
        SqlConnection.getSession().commit();
        return result;
    }

    public static int getGroupMemberNum(int groupId){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        int result = mapper.getGroupMemberNum(groupId);
        SqlConnection.getSession().commit();
        return result;
    }

}
