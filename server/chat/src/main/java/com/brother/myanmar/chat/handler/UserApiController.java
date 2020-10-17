package com.brother.myanmar.chat.handler;


import com.alibaba.fastjson.JSONObject;
import com.brother.myanmar.chat.bean.*;
import com.brother.myanmar.chat.bean.Group;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.GroupDao;
import com.brother.myanmar.chat.dao.SettingsDao;
import com.brother.myanmar.chat.dao.SuperUserDao;
import com.brother.myanmar.chat.dao.UserDao;
import com.brother.myanmar.chat.service.RedisCache;
import com.brother.myanmar.chat.util.AuthUtil;
import org.jim.core.ImChannelContext;
import org.jim.core.ImConst;
import org.jim.core.ImPacket;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.packets.*;
import org.jim.core.session.id.impl.UUIDSessionIdGenerator;
import org.jim.core.utils.JsonKit;
import org.jim.core.utils.Md5;
import org.jim.core.utils.PropUtil;
import org.jim.server.JimServerAPI;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.ChatKit;
import org.jim.server.util.HttpResps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

@RequestPath(value = "/api/user")
public class UserApiController {

    private static Logger logger = LoggerFactory.getLogger(UserApiController.class);

    @RequestPath(value = "/login")
    public HttpResponse login(HttpRequest request) throws Exception {
        String username = request.getParams().get("username") == null ? null : (String)request.getParams().get("username")[0];
        String password = request.getParams().get("password") == null ? null : (String)request.getParams().get("password")[0];
        LoginRes resp = new LoginRes(ImStatus.C10007);
        if(Objects.nonNull(username) && Objects.nonNull(password)) {
            SuperUser searchUser = new SuperUser();
            searchUser.setAccount(username);
            searchUser.setPassword(Md5.sign(password, ImConst.AUTH_KEY, ImConst.CHARSET));

            SuperUser findUser = SuperUserDao.findUserByAccount(searchUser);
            if(findUser!=null && findUser.getPassword().equals(searchUser.getPassword())) {
                String text = findUser.getId()+findUser.getName()+System.currentTimeMillis();
                String token = Md5.sign(text, ImConst.AUTH_KEY, ImConst.CHARSET);
                RedisCache.putSuperToken(token,findUser);
                resp.setToken(token);
                return TokenFilter.crossOrigin(HttpResps.json(request, resp));
            } else {
                resp = new LoginRes(ImStatus.C10008);
                return TokenFilter.crossOrigin(HttpResps.json(request, resp));
            }
        } else {
            resp = new LoginRes(ImStatus.C10008);
            return TokenFilter.crossOrigin(HttpResps.json(request, resp));
        }
    }

    @RequestPath(value = "/loginwithaccount")
    public HttpResponse loginwithaccount(HttpRequest request) throws Exception {
        User req = JsonKit.toBean(request.getBody(), User.class);
        if(req == null || req.getAccount() == null || req.getPassword() == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10008)));
        }

        User findUser = UserDao.findUserByAccount(req);
        String pass = Md5.sign(req.getPassword(), ImConst.AUTH_KEY, ImConst.CHARSET);
        if(findUser!=null && findUser.getPassword().equals(pass)) {
            return success(request, findUser);
        } else {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10008)));
        }
    }

    @RequestPath(value = "/register")
    public HttpResponse register(HttpRequest request) throws Exception {
        User req = JsonKit.toBean(request.getBody(), User.class);
        if(req == null || req.getAccount() == null || req.getPassword() == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10041)));
        }

        if(req.getAccount() != null) {
            User findUser = UserDao.findUserByAccount(req);
            if (findUser != null)
                return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10039)));
        } else {
            req.setAccount(UUIDSessionIdGenerator.instance.sessionId(null));
        }
        req.setId(null);
        req.setOpenId(null);

        req.setPassword(Md5.sign(req.getPassword(), ImConst.AUTH_KEY, ImConst.CHARSET));
        UserDao.insert(req);
        User respUser = new User();
        respUser.setCode(ImStatus.C10040.getCode());
        respUser.setMsg(ImStatus.C10040.getMsg());
        respUser.setAccount(req.getAccount());
        return TokenFilter.crossOrigin(HttpResps.json(request, respUser));
    }

    @RequestPath(value = "/logout")
    public HttpResponse logout(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        RedisCache.invalidToken(request.getHeader("token"));
        RedisCache.removeSuperToken(request.getHeader("token"));
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10021)));
    }

    @RequestPath(value = "/info")
    public HttpResponse info(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        User me = UserDao.findUserById(request.getUserId());
        Settings settings = SettingsDao.getSettings();
        me.setLowest(settings.getLowest());
        me.setFee(settings.getFee());
        me.setCode(ImStatus.C10003.getCode());
        me.setMsg(ImStatus.C10003.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, me));
    }

    @RequestPath(value = "/userinfo")
    public HttpResponse userinfo(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        Integer userId = request.getParams().get("userId") == null ? null : Integer.parseInt((String)request.getParams().get("userId")[0]);
        User me = UserDao.findUserById(userId);
        me.setCode(ImStatus.C10003.getCode());
        me.setMsg(ImStatus.C10003.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, me));
    }

    @RequestPath(value = "/callback")
    public HttpResponse callback(HttpRequest request) throws Exception {

        String code = request.getParams().get("code") == null ? null : (String) request.getParams().get("code")[0];
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + PropUtil.get("chat.app.id") + "&secret="
                + PropUtil.get("chat.app.secret") + "&code=" + code + "&grant_type=authorization_code";
        JSONObject jsonObject = AuthUtil.doGetJson(url);
        if(jsonObject == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
        }
        String openid = jsonObject.getString("openid");
        if(openid == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
        }
        User searchUser = new User();
        searchUser.setOpenId(openid);
        User findUser = UserDao.findUserByOpenId(searchUser);
        if(findUser != null){
            return success(request, findUser);
        }
        String access_token = jsonObject.getString("access_token");
        if(access_token == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
        }
        String infoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid
                + "&lang=zh_CN";
        JSONObject userInfo = AuthUtil.doGetJson(infoUrl);

        if( userInfo == null ){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
        }
        searchUser.setAccount(UUIDSessionIdGenerator.instance.sessionId(null));
        searchUser.setName(userInfo.getString("nickname"));
        searchUser.setAvatar(userInfo.getString("headimgurl"));
        searchUser.setPassword(access_token.substring(0,49));
        searchUser.setMoney(0.0);
        UserDao.insert(searchUser);
        findUser = UserDao.findUserByOpenId(searchUser);
        return success(request, findUser);
    }

    @RequestPath(value = "/type")
    public HttpResponse type(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        Integer id = request.getParams().get("id") == null ? null : Integer.parseInt((String) request.getParams().get("id")[0]);
        if(id == null) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
        }

        Group group = GroupDao.findGroup(id);
        UserType userType = new UserType(ImStatus.C10003);
        if(group == null){
            userType.setUserType(ChatType.CHAT_TYPE_PRIVATE.getNumber());
            User user = UserDao.findUserById(id);
            if(user==null){
                return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
            }
            userType.setName(user.getName());
        }else{
            userType.setUserType(ChatType.CHAT_TYPE_PUBLIC.getNumber());
            if(group.getOwner() != null && group.getOwner() == request.getUserId()) {
                userType.setIsOwner(true);
            }else {
                userType.setIsOwner(false);
            }
            userType.setName(group.getGroupName());

            userType.setGroupMemberNum(GroupDao.getGroupMemberNum(id));
        }

        return TokenFilter.crossOrigin(HttpResps.json(request, userType));
    }

    @RequestPath(value = "/update")
    public HttpResponse update(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        User req = JsonKit.toBean(request.getBody(), User.class);
        if(req == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
        }
        req.setId(request.getUserId());
        req.setOpenId(null);
        req.setMoney(null);
        if(req.getPassword() != null){
            req.setPassword(Md5.sign(req.getPassword(), ImConst.AUTH_KEY, ImConst.CHARSET));
        }
        UserDao.update(req);
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10047)));
    }

    private org.jim.core.packets.User buildUser(User findUser){
        org.jim.core.packets.User.Builder builder = org.jim.core.packets.User.newBuilder()
                .userId(String.valueOf(findUser.getId()))
                .nick(findUser.getName())
                .avatar(findUser.getAvatar())
                .status(UserStatusType.ONLINE.getStatus());

        Friend me = new Friend();
        me.setMyId(findUser.getId());
        me.setState(0);
        List<Friend> groups = UserDao.findFriendByState(me);
        for(int i=0;i<groups.size();i++){
            builder.addGroup(org.jim.core.packets.Group.newBuilder().groupId(String.valueOf(groups.get(i).getFriendId())).
                    name(groups.get(i).getFriendNick()).build());
        }

        org.jim.core.packets.User user = builder.build();
        return user;
    }

    private HttpResponse success(HttpRequest request, User findUser){
        org.jim.core.packets.User oldUser = RedisCache.getUser(String.valueOf(findUser.getId()));
        if(oldUser!=null){
            if(ChatKit.isOnline(String.valueOf(findUser.getId()), true)) {
                ChatBody chatBody = ChatBody.newBuilder()
                        .msgType(6).content("用户已在其他设备登陆，请确保您的账户安全！").build();
                chatBody.setCreateTime(System.currentTimeMillis());
                chatBody.setId(UUIDSessionIdGenerator.instance.sessionId(null));
                ImPacket chatPacket = new ImPacket(Command.COMMAND_USER_DUP,new RespBody(Command.COMMAND_USER_DUP,chatBody).toByte());

                List<ImChannelContext> notifyChannels = JimServerAPI.getByUserId(String.valueOf(findUser.getId()));
                for (int j = 0; j < notifyChannels.size(); j++) {
                    JimServerAPI.send(notifyChannels.get(j), chatPacket);

                    try {
                        Thread.sleep(100);
                    }catch (Exception e){

                    }
                    JimServerAPI.remove(notifyChannels.get(j),chatBody.getContent());
                }
            }
            String text = oldUser.getUserId()+oldUser.getNick()+oldUser.getCurTime();
            String token = Md5.sign(text, ImConst.AUTH_KEY, ImConst.CHARSET);
            RedisCache.invalidToken(token);
            RedisCache.invalidUser(String.valueOf(findUser.getId()));
        }

        org.jim.core.packets.User user = buildUser(findUser);
        user.setCurTime(System.currentTimeMillis());
        String text = findUser.getId()+findUser.getName()+user.getCurTime();
        String token = Md5.sign(text, ImConst.AUTH_KEY, ImConst.CHARSET);

        RedisCache.putToken(token,user);
        RedisCache.putUser(String.valueOf(findUser.getId()),user);
        LoginRes loginRes = new LoginRes(ImStatus.C10007);
        loginRes.setToken(token);
        return TokenFilter.crossOrigin(HttpResps.json(request, loginRes));
    }

}
