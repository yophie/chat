package com.brother.myanmar.chat.handler;

import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.service.RedisCache;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;

import java.util.Collection;

@RequestPath(value = "/api/chat")
public class ChatWindowController {

    @RequestPath(value = "/list")
    public HttpResponse list(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        Collection<String> keys = RedisCache.keys("store:user:"+request.getUserId());
        Collection<String> groups = RedisCache.keys("store:group:");

        keys.forEach(key->{
            String value = RedisCache.first(key);
        });

        User chatWindowReqBody = new User();
        chatWindowReqBody.setCode(ImStatus.C10027.getCode());
        chatWindowReqBody.setMsg(ImStatus.C10027.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, chatWindowReqBody));
    }
}
