package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.mapper.Friend2Mapper;
import com.brother.myanmar.chat.mapper.Group2Mapper;
import com.brother.myanmar.chat.mapper.User2Mapper;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class GroupDao {

    static SqlSession session = SqlConnection.getSession();
    public static Group findGroup(int id){
        Group2Mapper mapper = session.getMapper(Group2Mapper.class);
        Group result = mapper.findGroup(id);
        session.commit();
        return result;
    }

    public static List<Friend> findGroupMembers(int id){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        List<Friend> result = mapper.findGroupMembers(id);
        session.commit();
        return result;
    }

    public static int insertGroup(Group group){
        Group2Mapper mapper = session.getMapper(Group2Mapper.class);
        int rint = mapper.insertGroup(group);
        session.commit();
        return rint;
    }

    public static int deleteGroup(int id){
        User2Mapper mapper = session.getMapper(User2Mapper.class);
        int rint = mapper.deleteUser(id);
        session.commit();
        return rint;
    }

    public static int insertUser(User user){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        session.commit();
        return rint;
    }
    public static int insertFriend(Friend user){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        int rint = mapper.insertFriend(user);
        session.commit();
        return rint;
    }

    public static User findUserByAccount(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByAccount(suser);
        session.commit();
        return user;
    }
    public static int deleteFriend(Friend user){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        int rint = mapper.deleteFriend(user);
        session.commit();
        return rint;
    }

    public static Friend findOneFriend(Friend user){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        Friend result = mapper.findOneFriend(user);
        session.commit();
        return result;
    }

}
