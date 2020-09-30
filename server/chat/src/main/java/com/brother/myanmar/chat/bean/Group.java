package com.brother.myanmar.chat.bean;

import org.jim.core.packets.ChatWindowRespBody;

import java.util.List;

public class Group extends ChatWindowRespBody {

    private Integer groupId;
    private String groupName;
    private String avatar;
    private Integer type;//0:正常 1：禁言
    private Integer owner;
    private String ownerName;
    private String ownerAccount;
    private String ownerAvatar;
    private Boolean isOwner;
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

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerAvatar() {
        return ownerAvatar;
    }

    public void setOwnerAvatar(String ownerAvatar) {
        this.ownerAvatar = ownerAvatar;
    }

    public String getOwnerAccount() {
        return ownerAccount;
    }

    public void setOwnerAccount(String ownerAccount) {
        this.ownerAccount = ownerAccount;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Boolean getIsOwner() {
        return isOwner;
    }

    public void setIsOwner(Boolean isOwner) {
        this.isOwner = isOwner;
    }
}
