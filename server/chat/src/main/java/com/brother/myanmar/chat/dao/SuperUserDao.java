package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.SuperUser;
import com.brother.myanmar.chat.mapper.SuperUser2Mapper;
import org.apache.ibatis.session.SqlSession;

public class SuperUserDao {

    SqlSession session = SqlConnection.getSession();

    public int insert(SuperUser user){
        SuperUser2Mapper user2Mapper = session.getMapper(SuperUser2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        session.commit();
        return rint;
    }

    public SuperUser findUserById(SuperUser suser){
        SuperUser2Mapper user2Mapper = session.getMapper(SuperUser2Mapper.class);
        SuperUser user = user2Mapper.findUserById(suser);
        session.commit();
        return user;
    }

    public SuperUser findUserByAccount(SuperUser suser){
        SuperUser2Mapper user2Mapper = session.getMapper(SuperUser2Mapper.class);
        SuperUser user = user2Mapper.findUserByAccount(suser);
        session.commit();
        return user;
    }

}
