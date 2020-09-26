package com.brother.myanmar.chat.bean;

import org.jim.core.packets.ChatWindowRespBody;

public class Friend extends ChatWindowRespBody {

    private Integer id;
    private Integer myId;
    private Integer friendId;
    private String friendNick;
    private Integer state;//0:group,1:approved,2:applying,3:reject
    private Long applyTime;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getMyId() {
        return myId;
    }
    public void setMyId(Integer myId) {
        this.myId = myId;
    }
    public Integer getFriendId() {
        return friendId;
    }
    public void setFriendId(Integer friendId) {
        this.friendId = friendId;
    }
    public Integer getState() {
        return state;
    }
    public void setState(Integer state) {
        this.state = state;
    }
    public Long getApplyTime(){
        return applyTime;
    }
    public void setApplyTime(Long applyTime){
        this.applyTime=applyTime;
    }
    public String getFriendNick(){
        return friendNick;
    }
    public void setFriendNick(String friendNick){
        this.friendNick=friendNick;
    }
}
