package com.brother.myanmar.chat.handler;

import com.brother.myanmar.chat.bean.Settings;
import com.brother.myanmar.chat.dao.SettingsDao;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.packets.RespBody;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;

@RequestPath(value = "/api/settings")
public class ManagerControlller {

    @RequestPath(value = "/value")
    public HttpResponse value(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        Settings settings = SettingsDao.getSettings();
        settings.setCode(ImStatus.C10037.getCode());
        settings.setMsg(ImStatus.C10037.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, settings));
    }

    @RequestPath(value = "/lowest")
    public HttpResponse lowest(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        if(!request.isSuper()){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10010)));
        }
        Double lowest = request.getParams().get("lowest") == null ? null : Double.parseDouble((String) request.getParams().get("lowest")[0]);
        SettingsDao.updateLowest(lowest);
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10037)));
    }

    @RequestPath(value = "/fee")
    public HttpResponse fee(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        if(!request.isSuper()){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10010)));
        }
        Double lowest = request.getParams().get("fee") == null ? null : Double.parseDouble((String) request.getParams().get("fee")[0]);
        SettingsDao.updateFee(lowest);
        return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10037)));
    }
}
