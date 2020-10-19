package com.brother.myanmar.chat.handler;

import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.GroupDao;
import com.brother.myanmar.chat.dao.WindowDao;
import com.brother.myanmar.chat.service.RedisCache;
import org.jim.core.ImChannelContext;
import org.jim.core.ImPacket;
import org.jim.core.ImStatus;
import org.jim.core.config.ImConfig;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.message.MessageHelper;
import org.jim.core.packets.*;
import org.jim.core.session.id.impl.UUIDSessionIdGenerator;
import org.jim.core.utils.JsonKit;
import org.jim.server.JimServerAPI;
import org.jim.server.config.ImServerConfig;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;

import java.util.List;
import java.util.Objects;

@RequestPath(value = "/api/group")
public class GroupControlller {

    @RequestPath(value = "/new")
    public HttpResponse newGroup(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if(req == null || req.getFriends() == null || req.getFriends().size()<3){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        if(req.getGroupName() == null) req.setGroupName("我的新群聊");
        User user = new User();
        user.setOpenId(String.valueOf(request.getUserId()));
        user.setName(req.getGroupName());
        user.setAvatar(req.getAvatar());
        user.setPassword("group");
        user.setAccount(UUIDSessionIdGenerator.instance.sessionId(null));
        GroupDao.insertUser(user);
        User newGroup = GroupDao.findUserByAccount(user);
        if(Objects.isNull(newGroup)){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }

        Friend friend = new Friend();
        friend.setMyId(request.getUserId());
        friend.setState(0);
        friend.setFriendId(newGroup.getId());
        friend.setFriendNick(req.getGroupName());
        friend.setApplyTime(System.currentTimeMillis());
        for(int i=0;i<req.getFriends().size();i++){
            friend.setMyId(req.getFriends().get(i));
            GroupDao.insertFriend(friend);
            List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(req.getFriends().get(i)));
            for(int j=0;j<notifyChannels.size();j++){
                JimServerAPI.bindGroup(notifyChannels.get(j), String.valueOf(newGroup.getId()));
            }
        }

        ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(request.getUserId()))
                .groupId(String.valueOf(newGroup.getId())).chatType(ChatType.CHAT_TYPE_PUBLIC.getNumber())
                .msgType(6).content("您被邀请进入群聊 "+req.getGroupName()).build();
        chatBody.setCreateTime(System.currentTimeMillis());
        chatBody.setId(UUIDSessionIdGenerator.instance.sessionId(null));
        ImPacket chatPacket = new ImPacket(Command.COMMAND_CHAT_REQ,new RespBody(Command.COMMAND_CHAT_REQ,chatBody).toByte());
        JimServerAPI.sendToGroup(String.valueOf(newGroup.getId()), chatPacket);

        ImServerConfig imServerConfig = ImConfig.Global.get();
        MessageHelper messageHelper = imServerConfig.getMessageHelper();
        messageHelper.writeMessage("store", "group:"+newGroup.getId(), chatBody);

        Group group = new Group();
        group.setGroupId(newGroup.getId());
        group.setGroupName(req.getGroupName());
        group.setAvatar(req.getAvatar());
        group.setOwner(request.getUserId());
        GroupDao.insertGroup(group);
        group.setCode(ImStatus.C10031.getCode());
        group.setMsg(ImStatus.C10031.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, group));
    }

    @RequestPath(value = "/exit")
    public HttpResponse exit(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if (req == null || req.getGroupId() == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Friend friend = new Friend();
        friend.setMyId(request.getUserId());
        friend.setState(0);
        friend.setFriendId(req.getGroupId());
        friend = GroupDao.findOneFriend(friend);
        if(friend == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10043)));
        }
        GroupDao.deleteFriend(friend);
        List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(friend.getMyId()));

        ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(request.getUserId()))
                .groupId(String.valueOf(friend.getFriendId())).chatType(ChatType.CHAT_TYPE_PUBLIC.getNumber())
                .msgType(6).content("您已退出群聊").build();
        chatBody.setCreateTime(System.currentTimeMillis());
        chatBody.setId(UUIDSessionIdGenerator.instance.sessionId(null));
        ImPacket chatPacket = new ImPacket(Command.COMMAND_GROUP_NOTIFY,new RespBody(Command.COMMAND_GROUP_NOTIFY,chatBody).toByte());

        for(int j=0;j<notifyChannels.size();j++){
            JimServerAPI.unbindGroup(String.valueOf(friend.getFriendId()), notifyChannels.get(j));
            JimServerAPI.send(notifyChannels.get(j), chatPacket);
        }
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10031)));
    }

    @RequestPath(value = "/add")
    public HttpResponse add(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if(req == null || req.getGroupId() == null || req.getFriends() == null || req.getFriends().size()<1) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Group group = GroupDao.findGroup(req.getGroupId());
        if(group == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }

        Friend friend = new Friend();
        friend.setState(0);
        friend.setFriendId(group.getGroupId());
        friend.setFriendNick(group.getGroupName());
        friend.setApplyTime(System.currentTimeMillis());

        for(int i=0;i<req.getFriends().size();i++){
            friend.setMyId(req.getFriends().get(i));
            GroupDao.insertFriend(friend);
            List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(req.getFriends().get(i)));

            ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(request.getUserId())).groupId(String.valueOf(group.getGroupId()))
                    .to(String.valueOf(friend.getMyId())).chatType(ChatType.CHAT_TYPE_PUBLIC.getNumber())
                    .msgType(6).content("您被邀请进入群聊 "+req.getGroupName()).build();
            chatBody.setCreateTime(System.currentTimeMillis());
            chatBody.setId(UUIDSessionIdGenerator.instance.sessionId(null));
            ImPacket chatPacket = new ImPacket(Command.COMMAND_CHAT_REQ,new RespBody(Command.COMMAND_CHAT_REQ,chatBody).toByte());

            for(int j=0;j<notifyChannels.size();j++){
                JimServerAPI.bindGroup(notifyChannels.get(j), String.valueOf(group.getGroupId()));
                JimServerAPI.send(notifyChannels.get(j), chatPacket);
            }
        }
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10031)));
    }

    @RequestPath(value = "/kick")
    public HttpResponse kick(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if(req == null || req.getGroupId() == null || req.getFriends() == null || req.getFriends().size()<1) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Group group = GroupDao.findGroup(req.getGroupId());
        if(group == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        if(group.getOwner() != request.getUserId()){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10042)));
        }
        Friend friend = new Friend();
        List<Integer> friends = req.getFriends();
        for(int i=0;i< friends.size();i++) {
            friend.setMyId(friends.get(i));
            friend.setState(0);
            friend.setFriendId(req.getGroupId());
            friend = GroupDao.findOneFriend(friend);
            if (friend == null) {
                continue;
            }
            GroupDao.deleteFriend(friend);
            List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(friend.getMyId()));

            ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(request.getUserId()))
                    .groupId(String.valueOf(friend.getFriendId())).chatType(ChatType.CHAT_TYPE_PUBLIC.getNumber())
                    .msgType(6).content("您已被移除出群聊 "+group.getGroupName()).build();
            chatBody.setCreateTime(System.currentTimeMillis());
            chatBody.setId(UUIDSessionIdGenerator.instance.sessionId(null));
            ImPacket chatPacket = new ImPacket(Command.COMMAND_GROUP_NOTIFY,new RespBody(Command.COMMAND_GROUP_NOTIFY,chatBody).toByte());

            for(int j=0;j<notifyChannels.size();j++){
                JimServerAPI.unbindGroup(String.valueOf(group.getGroupId()), notifyChannels.get(j));
                JimServerAPI.send(notifyChannels.get(j), chatPacket);
            }
        }
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10031)));
    }

    @RequestPath(value = "/dismiss")
    public HttpResponse dismiss(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if(req == null || req.getGroupId() == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Group group = GroupDao.findGroup(req.getGroupId());
        if((group == null || group.getOwner() != request.getUserId()) && !request.isSuper()) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        List<Friend> members = GroupDao.findGroupMembers(req.getGroupId());
        GroupDao.deleteGroup(req.getGroupId());

        ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(request.getUserId()))
                .groupId(String.valueOf(req.getGroupId())).chatType(ChatType.CHAT_TYPE_PUBLIC.getNumber())
                .msgType(6).content(group.getGroupName()+" 被解散了").build();
        chatBody.setCreateTime(System.currentTimeMillis());
        chatBody.setId(UUIDSessionIdGenerator.instance.sessionId(null));
        ImPacket chatPacket = new ImPacket(Command.COMMAND_GROUP_DIS,new RespBody(Command.COMMAND_GROUP_DIS,chatBody).toByte());

        for(int i=0;i<members.size();i++) {
            List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(members.get(i).getMyId()));
            for (int j = 0; j < notifyChannels.size(); j++) {
                JimServerAPI.unbindGroup(String.valueOf(group.getGroupId()), notifyChannels.get(j));
                JimServerAPI.send(notifyChannels.get(j), chatPacket);
            }
        }
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10031)));
    }

    @RequestPath(value = "/info")
    public HttpResponse info(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if (req == null || req.getGroupId() == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Group group = GroupDao.findGroup(req.getGroupId());
        if (group == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        if(group.getOwner() == request.getUserId()){
            group.setIsOwner(true);
        }else {
            group.setIsOwner(false);
        }
        group.setMembers(GroupDao.findGroupMembers(req.getGroupId()));
        group.setCode(ImStatus.C10031.getCode());
        group.setMsg(ImStatus.C10031.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, group));
    }

    @RequestPath(value = "/update")
    public HttpResponse update(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        Group req = JsonKit.toBean(request.getBody(), Group.class);
        if (req == null || req.getGroupId() == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Group group = WindowDao.findGroup(req.getGroupId());
        if (group == null || group.getOwner() != request.getUserId()) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }

        Group updateGroup = new Group();
        updateGroup.setGroupId(req.getGroupId());
        updateGroup.setGroupName(req.getGroupName());
        updateGroup.setAvatar(req.getAvatar());
        updateGroup.setType(req.getType());
        GroupDao.updateGroup(updateGroup);
        if(req.getType()!=null) {
            if (req.getType() == 1) {
                RedisCache.forbidden(String.valueOf(req.getGroupId()), true);
                RedisCache.setGroupOwner(String.valueOf(req.getGroupId()), String.valueOf(group.getOwner()));
            } else if (req.getType() == 0) {
                RedisCache.forbidden(String.valueOf(req.getGroupId()), false);
            }
        }else{
            List<Friend> members = GroupDao.findGroupMembers(req.getGroupId());

            ChatBody chatBody = ChatBody.newBuilder().from(String.valueOf(request.getUserId()))
                    .groupId(String.valueOf(req.getGroupId())).chatType(ChatType.CHAT_TYPE_PUBLIC.getNumber())
                    .msgType(6).content(updateGroup.getGroupName()).build();
            chatBody.setCreateTime(System.currentTimeMillis());
            chatBody.setId(UUIDSessionIdGenerator.instance.sessionId(null));
            ImPacket chatPacket = new ImPacket(Command.COMMAND_GROUP_UPDATE,new RespBody(Command.COMMAND_GROUP_UPDATE,chatBody).toByte());

            for(int i=0;i<members.size();i++) {
                List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(members.get(i).getMyId()));
                for (int j = 0; j < notifyChannels.size(); j++) {
                    JimServerAPI.unbindGroup(String.valueOf(group.getGroupId()), notifyChannels.get(j));
                    JimServerAPI.send(notifyChannels.get(j), chatPacket);
                }
            }
        }
        updateGroup.setCode(ImStatus.C10031.getCode());
        updateGroup.setMsg(ImStatus.C10031.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, updateGroup));
    }

    @RequestPath(value = "/invite")
    public HttpResponse invite(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        Integer groupId = request.getParams().get("groupId") == null ? null : Integer.parseInt((String) request.getParams().get("groupId")[0]);
        Friend user = new Friend();
        List<Friend> friends;
        user.setMyId(request.getUserId());
        user.setState(1);
        friends = WindowDao.findFriendByState(user);
        List<Friend> groupMembers = GroupDao.findGroupMembers(groupId);
        for(int i=0;i<friends.size();i++){
            friends.get(i).setIsGroupMember(isGroupMember(groupMembers, friends.get(i).getFriendId()));
        }
        User chatWindowReqBody = new User();
        chatWindowReqBody.setCode(ImStatus.C10031.getCode());
        chatWindowReqBody.setMsg(ImStatus.C10031.getMsg());
        chatWindowReqBody.setFriends(friends);
        return TokenFilter.crossOrigin(HttpResps.json(request, chatWindowReqBody));
    }

    private boolean isGroupMember(List<Friend> members, Integer id){
        if(members==null) return false;
        for(int i=0;i<members.size();i++){
            if(id==members.get(i).getMyId()){
                return true;
            }
        }
        return false;
    }

}
