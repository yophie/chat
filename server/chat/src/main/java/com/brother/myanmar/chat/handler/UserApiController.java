package com.brother.myanmar.chat.handler;


import com.brother.myanmar.chat.bean.LoginRes;
import com.brother.myanmar.chat.bean.SuperUser;
import com.brother.myanmar.chat.dao.SuperUserDao;
import com.brother.myanmar.chat.service.UserTokenRedis;
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
        String token = request.getParams().get("token") == null ? null : (String)request.getParams().get("token")[0];
        LoginRes resp = new LoginRes(ImStatus.C10007);
        if(Objects.nonNull(token)){
            SuperUser me = UserTokenRedis.getSuperToken(token);
            if(me!=null) {
                resp.setToken(token);
                return TokenFilter.crossOrigin(HttpResps.json(request, resp));
            }
        }
        if(Objects.nonNull(username) && Objects.nonNull(password)) {
            SuperUser searchUser = new SuperUser();
            searchUser.setAccount(username);
            searchUser.setPassword(Md5.sign(password, ImConst.AUTH_KEY, ImConst.CHARSET));

            SuperUser findUser = SuperUserDao.findUserByAccount(searchUser);
            if(findUser!=null && findUser.getPassword().equals(searchUser.getPassword())) {
                String text = findUser.getId()+findUser.getPassword()+System.currentTimeMillis();
                token = Md5.sign(text, ImConst.AUTH_KEY, ImConst.CHARSET);
                UserTokenRedis.putSuperToken(token,findUser);
                resp.setToken(token);
                return TokenFilter.crossOrigin(HttpResps.json(request, resp));
            }
        }
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10008)));
    }

    @RequestPath(value = "/logout")
    public HttpResponse logout(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        UserTokenRedis.removeSuperToken(request.getHeader("token"));
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10021)));
    }

    @RequestPath(value = "/test")
    public HttpResponse abtest(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        HttpResponse ret = HttpResps.html(request, "test OK");
        return TokenFilter.crossOrigin(ret);
    }
}
