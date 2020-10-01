package com.brother.myanmar.chat.handler;


import com.brother.myanmar.chat.bean.LoginRes;
import com.brother.myanmar.chat.bean.Settings;
import com.brother.myanmar.chat.bean.SuperUser;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.SettingsDao;
import com.brother.myanmar.chat.dao.SuperUserDao;
import com.brother.myanmar.chat.dao.UserDao;
import com.brother.myanmar.chat.service.RedisCache;
import org.jim.core.ImConst;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.packets.RespBody;
import org.jim.core.utils.Md5;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;

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

        User me = new User();
        me.setId(request.getUserId());
        me = UserDao.findUserById(me);
        Settings settings = SettingsDao.getSettings();
        me.setLowest(settings.getLowest());
        me.setFee(settings.getFee());
        me.setCode(ImStatus.C10003.getCode());
        me.setMsg(ImStatus.C10003.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, me));
    }

    @RequestPath(value = "/callback")
    public HttpResponse callback(HttpRequest request) throws Exception {
        /*HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        String code = request.getParams().get("code") == null ? null : (String)request.getParams().get("code")[0];
        String code = request.getParameter("code");
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + AuthUtil.APPID + "&secret="
                + AuthUtil.APPSECRET + "&code=" + code + "&grant_type=authorization_code";
        JSONObject jsonObject = AuthUtil.doGetJson(url);
        String openid = jsonObject.getString("openid");
        String token = jsonObject.getString("access_token");
        String infoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + token + "&openid=" + openid
                + "&lang=zh_CN";
        JSONObject userInfo = AuthUtil.doGetJson(infoUrl);

        if( userInfo != null ){
            // 这里是把授权成功后，获取到的东西放到 info 里面，前端可以通过 EL 表达式直接获取相关信息
            request.setAttribute("info", userInfo);
            // 这里是授权成功返回的页面
            request.getRequestDispatcher("/success.jsp").forward(request, response);
        }else{
            request.getRequestDispatcher("/fail.jsp").forward(request, response);
        }

        me.setCode(ImStatus.C10003.getCode());
        me.setMsg(ImStatus.C10003.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, me));*/
        return null;
    }

}
