package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.mapper.Friend2Mapper;
import com.brother.myanmar.chat.mapper.User2Mapper;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class UserDao {

    static SqlSession session = SqlConnection.getSession();

    public static int insert(User user){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        session.commit();
        return rint;
    }

    public static User findUserById(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserById(suser);
        session.commit();
        return user;
    }

    public static User findUserByOpenId(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByOpenId(suser);
        session.commit();
        return user;
    }

    public static User findUserByAccount(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByAccount(suser);
        session.commit();
        return user;
    }
    public static List<Friend> findFriendByState(Friend user){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        List<Friend> result = mapper.findFriendByState(user);
        session.commit();
        return result;
    }

}
