package org.jim.core.packets;

public class ChatWindowReqBody extends Message {

    private static final long serialVersionUID = 5731474214655476287L;
    /**
     * 用户id;
     */
    private String Userid;
    /**
     * 消息类型;(如：0:chat list、1:friend list 2:group list 3:new friend list 4:apply 5:response apply)
     */
    private Integer type;

    private Integer applyUser;

    private Integer state;//1:approved,2:applying,3:reject

    public String getUserid() {
        return Userid;
    }

    public ChatWindowReqBody setUserid(String Userid) {
        this.Userid = Userid;
        return this;
    }

    public Integer getType() {
        return type;
    }

    public ChatWindowReqBody setType(Integer type) {
        this.type = type;
        return this;
    }

    public Integer getApplyUser() {
        return applyUser;
    }

    public ChatWindowReqBody setApplyUser(Integer applyUser) {
        this.applyUser = applyUser;
        return this;
    }

    public Integer getState() {
        return state;
    }

    public ChatWindowReqBody setState(Integer state) {
        this.state = state;
        return this;
    }
}
