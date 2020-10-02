package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.ChatWindow;
import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.mapper.ChatWindow2Mapper;
import com.brother.myanmar.chat.mapper.Friend2Mapper;
import com.brother.myanmar.chat.mapper.Group2Mapper;

import java.util.List;

public class WindowDao {

    public static int insertWindow(ChatWindow window){
        ChatWindow2Mapper mapper = SqlConnection.getSession().getMapper(ChatWindow2Mapper.class);
        int rint = mapper.insertWindow(window);
        SqlConnection.getSession().commit();
        return rint;
    }
    public static int updateWindow(ChatWindow window){
        ChatWindow2Mapper mapper = SqlConnection.getSession().getMapper(ChatWindow2Mapper.class);
        int rint = mapper.updateWindow(window);
        SqlConnection.getSession().commit();
        return rint;
    }
    public static ChatWindow findWindow(ChatWindow window){
        ChatWindow2Mapper mapper = SqlConnection.getSession().getMapper(ChatWindow2Mapper.class);
        ChatWindow result = mapper.findWindow(window);
        SqlConnection.getSession().commit();
        return result;
    }
    public static List<ChatWindow> getWindowList(ChatWindow window){
        ChatWindow2Mapper mapper = SqlConnection.getSession().getMapper(ChatWindow2Mapper.class);
        List<ChatWindow> result = mapper.getWindowList(window);
        SqlConnection.getSession().commit();
        return result;
    }

    public static List<Friend> findFriend(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        List<Friend> result = mapper.findFriend(user);
        SqlConnection.getSession().commit();
        return result;
    }
    public static List<Friend> findFriendByState(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        List<Friend> result = mapper.findFriendByState(user);
        SqlConnection.getSession().commit();
        return result;
    }
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

    public static Friend findOneFriend(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        Friend result = mapper.findOneFriend(user);
        SqlConnection.getSession().commit();
        return result;
    }
    public static int insertFriend(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        int rint = mapper.insertFriend(user);
        SqlConnection.getSession().commit();
        return rint;
    }
    public static int updateFriend(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        int rint = mapper.updateFriend(user);
        SqlConnection.getSession().commit();
        return rint;
    }
    public static int isGroupMember(Friend user){
        Friend2Mapper mapper = SqlConnection.getSession().getMapper(Friend2Mapper.class);
        int rint = mapper.isGroupMember(user);
        SqlConnection.getSession().commit();
        return rint;
    }

}
