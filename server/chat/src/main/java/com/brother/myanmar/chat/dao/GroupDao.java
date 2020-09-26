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

    SqlSession session = SqlConnection.getSession();
    public Group findGroup(int id){
        Group2Mapper mapper = session.getMapper(Group2Mapper.class);
        Group result = mapper.findGroup(id);
        session.commit();
        return result;
    }

    public List<Friend> findGroupMembers(int id){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        List<Friend> result = mapper.findGroupMembers(id);
        session.commit();
        return result;
    }

    public int insertGroup(Group group){
        Group2Mapper mapper = session.getMapper(Group2Mapper.class);
        int rint = mapper.insertGroup(group);
        session.commit();
        return rint;
    }

    public int insertUser(User user){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        session.commit();
        return rint;
    }
    public int insertFriend(Friend user){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        int rint = mapper.insertFriend(user);
        session.commit();
        return rint;
    }

    public User findUserByAccount(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByAccount(suser);
        session.commit();
        return user;
    }
    public int deleteFriend(Friend user){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        int rint = mapper.deleteFriend(user);
        session.commit();
        return rint;
    }

    public Friend findOneFriend(Friend user){
        Friend2Mapper mapper = session.getMapper(Friend2Mapper.class);
        Friend result = mapper.findOneFriend(user);
        session.commit();
        return result;
    }

}
