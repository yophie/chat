package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.SuperUser;
import com.brother.myanmar.chat.mapper.SuperUser2Mapper;

public class SuperUserDao {

    public static int insert(SuperUser user){
        SuperUser2Mapper user2Mapper = SqlConnection.getSession().getMapper(SuperUser2Mapper.class);
        int rint = user2Mapper.insertUser(user);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static SuperUser findUserById(SuperUser suser){
        SuperUser2Mapper user2Mapper = SqlConnection.getSession().getMapper(SuperUser2Mapper.class);
        SuperUser user = user2Mapper.findUserById(suser);
        SqlConnection.getSession().commit();
        return user;
    }

    public static SuperUser findUserByAccount(SuperUser suser){
        SuperUser2Mapper user2Mapper = SqlConnection.getSession().getMapper(SuperUser2Mapper.class);
        SuperUser user = user2Mapper.findUserByAccount(suser);
        SqlConnection.getSession().commit();
        return user;
    }

}
