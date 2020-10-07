package com.brother.myanmar.chat.handler;


import com.alibaba.fastjson.JSONObject;
import com.brother.myanmar.chat.bean.*;
import com.brother.myanmar.chat.dao.GroupDao;
import com.brother.myanmar.chat.dao.SettingsDao;
import com.brother.myanmar.chat.dao.SuperUserDao;
import com.brother.myanmar.chat.dao.UserDao;
import com.brother.myanmar.chat.service.RedisCache;
import com.brother.myanmar.chat.util.AuthUtil;
import org.jim.core.ImConst;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.packets.RespBody;
import org.jim.core.packets.UserStatusType;
import org.jim.core.session.id.impl.UUIDSessionIdGenerator;
import org.jim.core.utils.Md5;
import org.jim.core.utils.PropUtil;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;

import java.util.List;
import java.util.Objects;

@RequestPath(value = "/api/user")
public class UserApiController {

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
                String text = findUser.getId()+findUser.getPassword()+System.currentTimeMillis();
                String token = Md5.sign(text, ImConst.AUTH_KEY, ImConst.CHARSET);
                RedisCache.putSuperToken(token,findUser);
                resp.setToken(token);
                return TokenFilter.crossOrigin(HttpResps.json(request, resp));
            }
        } else {
            return TokenFilter.crossOrigin(HttpResps.json(request, resp));
        }
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10008)));
    }

    @RequestPath(value = "/logout")
    public HttpResponse logout(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
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
        User searchUser = new User();
        searchUser.setOpenId(openid);
        User findUser = UserDao.findUserByOpenId(searchUser);
        if(findUser != null){
            String text = findUser.getId()+findUser.getPassword()+System.currentTimeMillis();
            String token = Md5.sign(text, ImConst.AUTH_KEY, ImConst.CHARSET);
            RedisCache.putToken(token,buildUser(findUser));
            LoginRes loginRes = new LoginRes(ImStatus.C10007);
            loginRes.setToken(token);
            return TokenFilter.crossOrigin(HttpResps.json(request, loginRes));
        }
        String access_token = jsonObject.getString("access_token");
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
        UserDao.insert(searchUser);
        findUser = UserDao.findUserByOpenId(searchUser);
        String text = findUser.getId()+findUser.getPassword()+System.currentTimeMillis();
        String token = Md5.sign(text, ImConst.AUTH_KEY, ImConst.CHARSET);
        org.jim.core.packets.User user = buildUser(findUser);
        RedisCache.putToken(token,user);
        RedisCache.putUser(String.valueOf(findUser.getId()),user);
        LoginRes loginRes = new LoginRes(ImStatus.C10007);
        loginRes.setToken(token);
        return TokenFilter.crossOrigin(HttpResps.json(request, loginRes));
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
            userType.setUserType(1);
            User user = UserDao.findUserById(id);
            if(user==null){
                return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10004)));
            }
            userType.setName(user.getName());
        }else{
            userType.setUserType(0);
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

}
