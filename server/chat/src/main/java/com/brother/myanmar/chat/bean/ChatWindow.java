package com.brother.myanmar.chat.bean;

import org.jim.core.packets.ChatWindowRespBody;

public class ChatWindow extends ChatWindowRespBody {

    private Integer chatId;
    private String windowName;
    private Integer owner;
    private Integer userGroupId;
    private String lastMessage;
    private Long lastTime;
    private Integer chatType;
    private Integer unReadNum;
    private Integer lastUserId;
    private String lastName;
    private String lastAvatar;

    public Integer getChatId() {
        return chatId;
    }

    public ChatWindow setChatId(Integer chatId) {
        this.chatId = chatId;
        return this;
    }

    public String getWindowName() {
        return windowName;
    }

    public ChatWindow setWindowName(String windowName) {
        this.windowName = windowName;
        return this;
    }

    public Integer getOwner() {
        return owner;
    }

    public ChatWindow setOwner(Integer owner) {
        this.owner = owner;
        return this;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public ChatWindow setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
        return this;
    }

    public Long getLastTime() {
        return lastTime;
    }

    public ChatWindow setLastTime(Long lastTime) {
        this.lastTime = lastTime;
        return this;
    }

    public Integer getChatType() {
        return chatType;
    }

    public ChatWindow setChatType(Integer chatType) {
        this.chatType = chatType;
        return this;
    }

    public Integer getUnReadNum() {
        return unReadNum;
    }

    public ChatWindow setUnReadNum(Integer unReadNum) {
        this.unReadNum = unReadNum;
        return this;
    }

    public Integer getLastUserId() {
        return lastUserId;
    }

    public ChatWindow setLastUserId(Integer lastUserId) {
        this.lastUserId = lastUserId;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public ChatWindow setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getLastAvatar() {
        return lastAvatar;
    }

    public ChatWindow setLastAvatar(String lastAvatar) {
        this.lastAvatar = lastAvatar;
        return this;
    }

    public Integer getUserGroupId() {
        return userGroupId;
    }

    public ChatWindow setUserGroupId(Integer userGroupId) {
        this.userGroupId = userGroupId;
        return this;
    }
}
