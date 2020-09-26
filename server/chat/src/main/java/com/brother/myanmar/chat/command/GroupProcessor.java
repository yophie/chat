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
import org.jim.core.session.id.impl.UUIDSessionIdGenerator;
import org.jim.server.JimServerAPI;
import org.jim.server.processor.BaseProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

public class GroupProcessor extends BaseProcessor {

    private static Logger logger = LoggerFactory.getLogger(GroupProcessor.class);

    private RespBody respBody = new RespBody();

    private GroupDao dao = new GroupDao();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        GroupReqBody req = (GroupReqBody)message;
        if(Objects.isNull(req.getType()) ||
                (req.getType()==0 && Objects.isNull(req.getGroupId())) ||
                (req.getType()==1 &&(Objects.isNull(req.getFriends()) || req.getFriends().size()<2))){
            respBody.setCode(ImStatus.C10030.getCode());
            respBody.setMsg(ImStatus.C10030.getMsg());
            return;
        }
        switch(req.getType()){
            case 0:
                //建群
                addGroup(imChannelContext, req);
                break;
            case 1:
                //退群
                exitGroup(imChannelContext, req);
                break;
        }
    }

    @Override
    public RespBody getRes(){
        return respBody;
    }

    private void addGroup(ImChannelContext imChannelContext, GroupReqBody req){
        User user = new User();
        user.setOpenId(imChannelContext.getUserId());
        user.setName(req.getGroupName());
        user.setAvatar(req.getAvatar());
        user.setPassword("group");
        user.setAccount(UUIDSessionIdGenerator.instance.sessionId(null));
        dao.insertUser(user);
        User newGroup = dao.findUserByAccount(user);
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
        friend.setApplyTime(System.currentTimeMillis());
        dao.insertFriend(friend);
        JimServerAPI.bindGroup(imChannelContext, String.valueOf(newGroup.getId()));
        for(int i=0;i<req.getFriends().size();i++){
            if(req.getFriends().get(i) == Integer.parseInt(imChannelContext.getUserId()))
                continue;
            friend.setMyId(req.getFriends().get(i));
            dao.insertFriend(friend);
            List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(req.getFriends().get(i)));
            for(int j=0;j<notifyChannels.size();j++){
                JimServerAPI.bindGroup(notifyChannels.get(j), String.valueOf(newGroup.getId()));
            }
        }

        Group group = new Group();
        group.setGroupId(newGroup.getId());
        group.setGroupName(req.getGroupName());
        group.setAvatar(req.getAvatar());
        group.setOwner(Integer.parseInt(imChannelContext.getUserId()));
        dao.insertGroup(group);
        respBody.setCode(ImStatus.C10031.getCode());
        respBody.setMsg(ImStatus.C10031.getMsg());
    }

    private void exitGroup(ImChannelContext imChannelContext, GroupReqBody req){

        Friend friend = new Friend();
        friend.setMyId(Integer.parseInt(imChannelContext.getUserId()));
        friend.setState(0);
        friend.setFriendId(req.getGroupId());
        friend = dao.findOneFriend(friend);
        dao.deleteFriend(friend);

        JimServerAPI.unbindGroup(String.valueOf(req.getGroupId()), imChannelContext);
    }
}
