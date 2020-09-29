package com.brother.myanmar.chat.command;

import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.WindowDao;
import org.jim.core.ImChannelContext;
import org.jim.core.ImPacket;
import org.jim.core.ImStatus;
import org.jim.core.packets.*;
import org.jim.server.JimServerAPI;
import org.jim.server.processor.chat.BaseChatListProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ChatListProcessor extends BaseChatListProcessor {

    private static Logger logger = LoggerFactory.getLogger(ChatListProcessor.class);

    private ChatWindowRespBody chatWindowReqBody = new ChatWindowRespBody();

    private WindowDao dao = new WindowDao();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        ChatWindowReqBody req = (ChatWindowReqBody)message;
        if(Objects.isNull(req.getType())){
            chatWindowReqBody.setCode(ImStatus.C10014.getCode());
            chatWindowReqBody.setMsg(ImStatus.C10014.getMsg());
            return;
        }
        Friend user = new Friend();
        List<Friend> friends;
        Friend friend;
        switch(req.getType()){
            case 0:
                //0:chat list
                break;
            case 1:
                //1:friend list
                user.setMyId(Integer.parseInt(imChannelContext.getUserId()));
                user.setState(1);
                friends = dao.findFriendByState(user);
                chatWindowReqBody = new User();
                chatWindowReqBody.setCode(ImStatus.C10027.getCode());
                chatWindowReqBody.setMsg(ImStatus.C10027.getMsg());
                ((User)chatWindowReqBody).setFriends(friends);
                break;
            case 2:
                //2:group list
                user.setMyId(Integer.parseInt(imChannelContext.getUserId()));
                user.setState(0);
                friends = dao.findFriendByState(user);
                List<Group> groups = new ArrayList<>(friends.size());
                for(int i=0;i<groups.size();i++){
                    friend = friends.get(i);
                    Group group = dao.findGroup(friend.getFriendId());
                    group.setMembers(dao.findGroupMembers(friend.getFriendId()));
                    groups.add(group);
                }
                chatWindowReqBody = new User();
                chatWindowReqBody.setCode(ImStatus.C10027.getCode());
                chatWindowReqBody.setMsg(ImStatus.C10027.getMsg());
                ((User)chatWindowReqBody).setGroups(groups);
                break;
            case 3:
                //3:new friend list
                user.setMyId(Integer.parseInt(imChannelContext.getUserId()));
                friends = dao.findFriend(user);
                chatWindowReqBody = new User();
                chatWindowReqBody.setCode(ImStatus.C10027.getCode());
                chatWindowReqBody.setMsg(ImStatus.C10027.getMsg());
                ((User)chatWindowReqBody).setFriends(friends);
                break;
            case 4:
                //4:apply
                if(Objects.isNull(req.getApplyUser()) || req.getApplyUser().equals(user.getMyId())) {
                    chatWindowReqBody.setCode(ImStatus.C10028.getCode());
                    chatWindowReqBody.setMsg(ImStatus.C10028.getMsg());
                    break;
                }
                user.setMyId(Integer.parseInt(imChannelContext.getUserId()));
                user.setFriendId(req.getApplyUser());
                friend = dao.findOneFriend(user);
                if(friend != null) {
                    chatWindowReqBody.setCode(ImStatus.C10028.getCode());
                    chatWindowReqBody.setMsg(ImStatus.C10028.getMsg());
                }else {
                    user.setMyId(req.getApplyUser());
                    user.setFriendId(Integer.parseInt(imChannelContext.getUserId()));
                    user.setState(2);
                    user.setApplyTime(System.currentTimeMillis());
                    dao.insertFriend(user);
                    chatWindowReqBody.setCode(ImStatus.C10029.getCode());
                    chatWindowReqBody.setMsg(ImStatus.C10029.getMsg());

                    ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(user.getFriendId()))
                        .to(String.valueOf(user.getMyId())).chatType(ChatType.CHAT_TYPE_PRIVATE.getNumber())
                        .msgType(6).packetType(0).content("加个朋友呗。").build();
                    ImPacket chatPacket = new ImPacket(Command.COMMAND_CHAT_REQ,new RespBody(Command.COMMAND_CHAT_REQ,chatBody).toByte());
                    JimServerAPI.sendToUser(String.valueOf(req.getApplyUser()), chatPacket);
                }
                break;
            case 5:
                //5:response apply
                if(Objects.isNull(req.getState()) || Objects.isNull(req.getApplyUser())) {
                    chatWindowReqBody.setCode(ImStatus.C10028.getCode());
                    chatWindowReqBody.setMsg(ImStatus.C10028.getMsg());
                    break;
                }
                user.setMyId(Integer.parseInt(imChannelContext.getUserId()));
                user.setFriendId(req.getApplyUser());
                friend = dao.findOneFriend(user);
                if(friend == null) {
                    chatWindowReqBody.setCode(ImStatus.C10028.getCode());
                    chatWindowReqBody.setMsg(ImStatus.C10028.getMsg());
                }else {
                    friend.setState(req.getState());
                    dao.updateFriend(friend);
                    if(req.getState()==1){
                        friend.setFriendId(friend.getMyId());
                        friend.setMyId(req.getApplyUser());
                        dao.insertFriend(friend);
                    }
                    chatWindowReqBody.setCode(ImStatus.C10029.getCode());
                    chatWindowReqBody.setMsg(ImStatus.C10029.getMsg());

                    ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(user.getFriendId()))
                            .to(String.valueOf(user.getMyId())).chatType(ChatType.CHAT_TYPE_PRIVATE.getNumber())
                            .msgType(6).packetType(1).content("好友验证结束").build();
                    ImPacket chatPacket = new ImPacket(Command.COMMAND_CHAT_REQ,new RespBody(Command.COMMAND_CHAT_REQ,chatBody).toByte());
                    JimServerAPI.sendToUser(String.valueOf(req.getApplyUser()), chatPacket);
                }
                break;
        }
    }

    @Override
    public ChatWindowRespBody getRes(){
        return chatWindowReqBody;
    }
}
