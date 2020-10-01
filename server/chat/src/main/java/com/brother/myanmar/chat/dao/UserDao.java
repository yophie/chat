package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.mapper.Friend2Mapper;
import com.brother.myanmar.chat.mapper.User2Mapper;

import java.util.List;

public class UserDao {

    public static int insert(User user){
        User2Mapper user2Mapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static User findUserById(User suser){
        User2Mapper user2Mapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        User user = user2Mapper.findUserById(suser);
        SqlConnection.getSession().commit();
        return user;
    }

    public static User findUserByOpenId(User suser){
        User2Mapper user2Mapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByOpenId(suser);
        SqlConnection.getSession().commit();
        return user;
    }

    public static User findUserByAccount(User suser){
        User2Mapper user2Mapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByAccount(suser);
        SqlConnection.getSession().commit();
        return user;
    }
    public static List<Friend> findFriendByState(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        List<Friend> result = mapper.findFriendByState(user);
        SqlConnection.getSession().commit();
        return result;
    }

}
