package com.brother.myanmar.chat.bean;

import org.jim.core.Status;
import org.jim.core.packets.RespBody;

public class LoginRes extends RespBody {
    private String token;

    public LoginRes(Status status){
        super(status);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
