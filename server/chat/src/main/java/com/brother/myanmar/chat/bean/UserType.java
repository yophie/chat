package com.brother.myanmar.chat.bean;

import org.jim.core.Status;
import org.jim.core.packets.RespBody;

import java.util.Objects;

public class UserType extends RespBody {
    private Integer userType;//0:group 1:normal

    public UserType(Status status){
        if(Objects.nonNull(status)){
            this.code = status.getCode();
            this.msg = status.getMsg();
        }
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
}
