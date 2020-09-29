package org.jim.core.packets;

public class FriendSocietyReqBody extends Message {

    private static final long serialVersionUID = 5731474214655476287L;

    private Integer type;
    private String Userid;
    private String UserName;
    private String UserAvatar;
    private String content;
    private Long time;

    public String getUserid() {
        return Userid;
    }

    public FriendSocietyReqBody setUserid(String Userid) {
        this.Userid = Userid;
        return this;
    }

    public String getContent() {
        return content;
    }

    public FriendSocietyReqBody setContent(String content) {
        this.content = content;
        return this;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getUserAvatar() {
        return UserAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        UserAvatar = userAvatar;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
