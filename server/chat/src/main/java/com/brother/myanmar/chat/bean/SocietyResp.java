package com.brother.myanmar.chat.bean;

import org.jim.core.packets.FriendSocietyReqBody;
import org.jim.core.packets.RespBody;

import java.util.List;

public class SocietyResp extends RespBody {
    private Integer type;
    private List<FriendSocietyReqBody> messages;

    public List<FriendSocietyReqBody> getMessages() {
        return messages;
    }

    public void setMessages(List<FriendSocietyReqBody> messages) {
        this.messages = messages;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
