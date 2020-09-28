package com.brother.myanmar.chat.handler;

import com.brother.myanmar.chat.bean.SuperUser;
import com.brother.myanmar.chat.service.UserTokenRedis;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.http.Method;
import org.jim.core.packets.RespBody;
import org.jim.core.packets.User;
import org.jim.server.util.HttpResps;

import java.util.Objects;

public class TokenFilter {

    public static HttpResponse filter(HttpRequest request){
        if(request.getRequestLine().getMethod().equals(Method.OPTIONS))
            return crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10010)));
        if(request.getUserId() != null) return null;
        String token = request.getHeader("authorization");
        if(token != null && token.length()>0) {
            SuperUser user = UserTokenRedis.getSuperToken(token);
            if (Objects.nonNull(user)) {
                request.setUserId(user.getId());
                return null;
            }
            User normalUser = UserTokenRedis.getToken(token);
            if (Objects.nonNull(normalUser)) {
                request.setUserId(Integer.parseInt(normalUser.getUserId()));
                return null;
            }
        }
        return crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10010)));
    }

    public static HttpResponse crossOrigin(HttpResponse ret){
        ret.addHeader("Access-Control-Allow-Origin","*");
        ret.addHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS,DELETE");
        ret.addHeader("Access-Control-Allow-Headers","Authorization");
        return ret;
    }
}
