package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.mapper.User2Mapper;
import org.apache.ibatis.session.SqlSession;

public class UserDao {

    SqlSession session = SqlConnection.getSession();

    public int insert(User user){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        session.commit();
        return rint;
    }

    public User findUserById(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserById(suser);
        session.commit();
        return user;
    }

    public User findUserByOpenId(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByOpenId(suser);
        session.commit();
        return user;
    }

    public User findUserByAccount(User suser){
        User2Mapper user2Mapper = session.getMapper(User2Mapper.class);
        User user = user2Mapper.findUserByAccount(suser);
        session.commit();
        return user;
    }

}
