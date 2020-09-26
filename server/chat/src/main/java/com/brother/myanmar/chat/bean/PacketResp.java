package com.brother.myanmar.chat.bean;

import org.jim.core.packets.RespBody;

import java.util.List;

public class PacketResp extends RespBody {
    private List<PacketState> drawList;
    private Integer state;

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
}
