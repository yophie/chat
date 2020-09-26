package com.brother.myanmar.chat.bean;

import org.jim.core.packets.ChatWindowRespBody;

import java.util.List;

public class Group extends ChatWindowRespBody {

    private Integer groupId;
    private String groupName;
    private Integer owner;
    private String avatar;
    private List<Friend> members;

    public Integer getGroupId() {
        return groupId;
    }
    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }
    public String getGroupName(){
        return groupName;
    }
    public void setGroupName(String groupName){
        this.groupName=groupName;
    }
    public List<Friend> getMembers() {
        return members;
    }
    public void setMembers(List<Friend> members) {
        this.members = members;
    }

    public Integer getOwner() {
        return owner;
    }

    public void setOwner(Integer owner) {
        this.owner = owner;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
