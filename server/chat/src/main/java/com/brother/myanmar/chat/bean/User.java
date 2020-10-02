package com.brother.myanmar.chat.bean;

import org.jim.core.packets.ChatWindowRespBody;

import java.util.List;

public class User extends ChatWindowRespBody {

    private Integer id;
    private String account;
    private String avatar;
    private String phone;
    private String openId;
    private Double money;
    private String password;
    private String name;
    private Double lowest;
    private Double fee;

    private List<Friend> friends;
    private List<Group> groups;
    private List<ChatWindow> windows;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getAccount(){
        return account;
    }
    public void setAccount(String account){
        this.account=account;
    }
    public String getAvatar(){
        return avatar;
    }
    public void setAvatar(String avatar){
        this.avatar=avatar;
    }
    public String getPhone(){
        return phone;
    }
    public void setPhone(String phone){
        this.phone=phone;
    }
    public String getOpenId(){
        return openId;
    }
    public void setOpenId(String openId){
        this.openId=openId;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password=password;
    }
    public Double getMoney(){
        return money;
    }
    public void setMoney(Double money){
        this.money=money;
    }

    public List<Friend> getFriends() {
        return friends;
    }
    public void setFriends(List<Friend> friends) {
        this.friends = friends;
    }
    public List<Group> getGroups() {
        return groups;
    }
    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }
    public List<ChatWindow> getWindows() {
        return windows;
    }
    public void setWindows(List<ChatWindow> windows) {
        this.windows = windows;
    }

    public Double getLowest() {
        return lowest;
    }

    public void setLowest(Double lowest) {
        this.lowest = lowest;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }
}
