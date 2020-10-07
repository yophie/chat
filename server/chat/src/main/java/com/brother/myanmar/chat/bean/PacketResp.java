package com.brother.myanmar.chat.bean;

import org.jim.core.packets.RespBody;

import java.util.List;

public class PacketResp extends RespBody {
    private List<PacketState> drawList;
    private String id;
    private Integer type;//0:normal 1:luck
    private Double amount;
    private Integer num;
    private Long time;
    private Integer state;//0:new 1:part 2:finished
    private Integer sender;
    private String senderName;
    private String senderAccount;
    private String senderAvatar;

    private Double queryAmount;

    private Integer surplus;

    public List<PacketState> getDrawList() {
        return drawList;
    }

    public void setDrawList(List<PacketState> drawList) {
        this.drawList = drawList;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public Integer getSender() {
        return sender;
    }

    public void setSender(Integer sender) {
        this.sender = sender;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderAccount() {
        return senderAccount;
    }

    public void setSenderAccount(String senderAccount) {
        this.senderAccount = senderAccount;
    }

    public String getSenderAvatar() {
        return senderAvatar;
    }

    public void setSenderAvatar(String senderAvatar) {
        this.senderAvatar = senderAvatar;
    }

    public Double getQueryAmount() {
        return queryAmount;
    }

    public void setQueryAmount(Double queryAmount) {
        this.queryAmount = queryAmount;
    }

    public Integer getSurplus() {
        return surplus;
    }

    public void setSurplus(Integer surplus) {
        this.surplus = surplus;
    }
}
