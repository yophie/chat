package com.brother.myanmar.chat.command;

import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.SocietyResp;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.UserDao;
import com.brother.myanmar.chat.service.RedisCache;
import org.jim.core.ImChannelContext;
import org.jim.core.ImPacket;
import org.jim.core.ImStatus;
import org.jim.core.config.ImConfig;
import org.jim.core.packets.Command;
import org.jim.core.packets.FriendSocietyReqBody;
import org.jim.core.packets.Message;
import org.jim.core.packets.RespBody;
import org.jim.server.JimServerAPI;
import org.jim.server.config.ImServerConfig;
import org.jim.server.processor.BaseProcessor;
import org.jim.server.util.ChatKit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

public class FriendSocietyProcessor extends BaseProcessor {

    private static Logger logger = LoggerFactory.getLogger(FriendSocietyProcessor.class);

    private RespBody respBody = new RespBody();

    protected ImServerConfig imServerConfig = ImConfig.Global.get();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        FriendSocietyReqBody req = (FriendSocietyReqBody)message;
        req.setUserid(imChannelContext.getUserId());
        if(Objects.isNull(req.getType())){
            respBody.setCode(ImStatus.C10032.getCode());
            respBody.setMsg(ImStatus.C10032.getMsg());
            return;
        }
        switch (req.getType()){
            case 0:
                //发布朋友圈
                if(Objects.isNull(req.getContent())){
                    respBody.setCode(ImStatus.C10032.getCode());
                    respBody.setMsg(ImStatus.C10032.getMsg());
                    return;
                }
                publish(imChannelContext, req);
                break;
            case 1:
                //获取离线朋友圈消息
                getOfflineMessages(imChannelContext, req);
                break;
            case 2:
                //获取历史朋友圈消息
                getHistoryMessages(imChannelContext, req);
                break;
        }
    }

    private void getOfflineMessages(ImChannelContext imChannelContext, FriendSocietyReqBody req) {
        List<FriendSocietyReqBody> messages = RedisCache.getSociety(imChannelContext.getUserId());
        respBody = new SocietyResp();
        respBody.setCode(ImStatus.C10033.getCode());
        respBody.setMsg(ImStatus.C10033.getMsg());
        ((SocietyResp)respBody).setMessages(messages);
    }

    private void getHistoryMessages(ImChannelContext imChannelContext, FriendSocietyReqBody req) {
        List<FriendSocietyReqBody> messages = RedisCache.getSocietyHistory(imChannelContext.getUserId());
        respBody = new SocietyResp();
        respBody.setCode(ImStatus.C10033.getCode());
        respBody.setMsg(ImStatus.C10033.getMsg());
        ((SocietyResp)respBody).setMessages(messages);
    }

    private void publish(ImChannelContext imChannelContext, FriendSocietyReqBody req){
        req.setCreateTime(System.currentTimeMillis());
        User me = new User();
        me.setId(Integer.parseInt(imChannelContext.getUserId()));
        me = UserDao.findUserById(me);
        req.setUserName(me.getName());
        req.setUserAvatar(me.getAvatar());
        Friend friend = new Friend();
        friend.setMyId(me.getId());
        friend.setState(1);
        List<Friend> friends = UserDao.findFriendByState(friend);
        //开启持久化
        boolean isStore = ImServerConfig.ON.equals(imServerConfig.getIsStore());
        ImPacket chatPacket = new ImPacket(Command.COMMAND_FriendSociety_REQ,new RespBody(Command.COMMAND_FriendSociety_REQ,req).toByte());
        for(int i=0;i<friends.size();i++) {
            String friendId = String.valueOf(friends.get(i).getFriendId());
            boolean isOnline = ChatKit.isOnline(friendId, isStore);
            if(isOnline) {
                JimServerAPI.sendToUser(friendId, chatPacket);
            }
            if(isStore){
                RedisCache.putSocietyHistory(friendId,req);
                if(!isOnline){
                    RedisCache.putSociety(friendId,req);
                }
            }
        }
        respBody.setCode(ImStatus.C10033.getCode());
        respBody.setMsg(ImStatus.C10033.getMsg());
    }

    @Override
    public RespBody getRes(){
        return respBody;
    }
}
