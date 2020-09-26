package com.brother.myanmar.chat.command;

import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.GroupDao;
import org.jim.core.ImChannelContext;
import org.jim.core.ImStatus;
import org.jim.core.packets.GroupReqBody;
import org.jim.core.packets.Message;
import org.jim.core.packets.RespBody;
import org.jim.server.processor.BaseProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;

public class GroupProcessor extends BaseProcessor {

    private static Logger logger = LoggerFactory.getLogger(GroupProcessor.class);

    private RespBody respBody = new RespBody();

    private GroupDao dao = new GroupDao();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        GroupReqBody req = (GroupReqBody)message;
        if(Objects.isNull(req.getFriends()) || req.getFriends().size()==0){
            respBody.setCode(ImStatus.C10030.getCode());
            respBody.setMsg(ImStatus.C10030.getMsg());
            return;
        }
        User user = new User();
        user.setOpenId(imChannelContext.getUserId());
        user.setName(req.getGroupName());
        user.setAvatar(req.getAvatar());
        dao.insertUser(user);
        User newGroup = dao.findUserByOpenId(user);
        if(Objects.isNull(newGroup)){
            respBody.setCode(ImStatus.C10030.getCode());
            respBody.setMsg(ImStatus.C10030.getMsg());
            return;
        }

        Friend friend = new Friend();
        friend.setMyId(Integer.parseInt(imChannelContext.getUserId()));
        friend.setState(0);
        friend.setFriendId(newGroup.getId());
        friend.setFriendNick(req.getGroupName());
        dao.insertFriend(friend);
        for(int i=0;i<req.getFriends().size();i++){
            friend.setMyId(req.getFriends().get(i));
            dao.insertFriend(friend);
        }

        Group group = new Group();
        group.setGroupId(newGroup.getId());
        group.setGroupName(req.getGroupName());
        group.setAvatar(req.getAvatar());
        group.setOwner(Integer.parseInt(imChannelContext.getUserId()));
        dao.insertGroup(group);


    }

    @Override
    public RespBody getRes(){
        return respBody;
    }
}
