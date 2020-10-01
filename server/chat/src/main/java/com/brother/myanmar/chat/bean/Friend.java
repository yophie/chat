package com.brother.myanmar.chat.bean;

import org.jim.core.packets.ChatWindowRespBody;

public class Friend extends ChatWindowRespBody {

    private Integer id;
    private Integer myId;
    private String myName;
    private String myAvatar;
    private Integer friendId;
    private String friendNick;
    private String friendAvatar;
    private Integer state;//0:group,1:approved,2:applying,3:reject
    private Long applyTime;
    private Boolean isGroupMember;

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

    public String getFriendAvatar() {
        return friendAvatar;
    }

    public void setFriendAvatar(String friendAvatar) {
        this.friendAvatar = friendAvatar;
    }

    public Boolean getIsGroupMember() {
        return isGroupMember;
    }

    public void setIsGroupMember(Boolean isGroupMember) {
        this.isGroupMember = isGroupMember;
    }

    public String getMyName() {
        return myName;
    }

    public void setMyName(String myName) {
        this.myName = myName;
    }

    public String getMyAvatar() {
        return myAvatar;
    }

    public void setMyAvatar(String myAvatar) {
        this.myAvatar = myAvatar;
    }
}
