package org.jim.core.packets;

public class ChatWindowRespBody extends RespBody {

    private static final long serialVersionUID = 5731474214655476287L;
    /**
     * 用户id;
     */
    private String Userid;
    /**
     * 消息类型;(如：0:friend、1:group)
     */
    private Integer chatType;

    public String getUserid() {
        return Userid;
    }

    public ChatWindowRespBody setUserid(String Userid) {
        this.Userid = Userid;
        return this;
    }

    public Integer getChatType() {
        return chatType;
    }

    public ChatWindowRespBody setChatType(Integer chatType) {
        this.chatType = chatType;
        return this;
    }
}
