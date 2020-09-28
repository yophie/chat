package com.brother.myanmar.chat.handler;

import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.GroupDao;
import org.jim.core.ImChannelContext;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.packets.GroupReqBody;
import org.jim.core.packets.RespBody;
import org.jim.core.session.id.impl.UUIDSessionIdGenerator;
import org.jim.core.utils.JsonKit;
import org.jim.server.JimServerAPI;
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
        if(req.getGroupName() == null) req.setGroupName("我的新群聊");
        if(req.getFriends() == null || req.getFriends().size()<3){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
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
        GroupDao.insertFriend(friend);
        for(int i=0;i<req.getFriends().size();i++){
            friend.setMyId(req.getFriends().get(i));
            GroupDao.insertFriend(friend);
            List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(req.getFriends().get(i)));
            for(int j=0;j<notifyChannels.size();j++){
                JimServerAPI.bindGroup(notifyChannels.get(j), String.valueOf(newGroup.getId()));
            }
        }

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
        if (req.getGroupId() == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Friend friend = new Friend();
        friend.setMyId(request.getUserId());
        friend.setState(0);
        friend.setFriendId(req.getGroupId());
        friend = GroupDao.findOneFriend(friend);
        GroupDao.deleteFriend(friend);
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10031)));
    }

    @RequestPath(value = "/add")
    public HttpResponse add(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if(req.getGroupId() == null || req.getFriends() == null || req.getFriends().size()<1) {
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
            for(int j=0;j<notifyChannels.size();j++){
                JimServerAPI.bindGroup(notifyChannels.get(j), String.valueOf(group.getGroupId()));
            }
        }
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10031)));
    }

    @RequestPath(value = "/dismiss")
    public HttpResponse dismiss(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if (resp != null) return resp;
        GroupReqBody req = JsonKit.toBean(request.getBody(), GroupReqBody.class);
        if(req.getGroupId() == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        Group group = GroupDao.findGroup(req.getGroupId());
        if(group == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10030)));
        }
        List<Friend> members = GroupDao.findGroupMembers(req.getGroupId());
        for(int i=0;i<members.size();i++) {
            List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(members.get(i).getFriendId()));
            for (int j = 0; j < notifyChannels.size(); j++) {
                JimServerAPI.unbindGroup(String.valueOf(group.getGroupId()), notifyChannels.get(j));
            }
        }
        GroupDao.deleteGroup(req.getGroupId());
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10031)));
    }


}
