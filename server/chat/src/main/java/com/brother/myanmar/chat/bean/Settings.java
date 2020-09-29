package com.brother.myanmar.chat.bean;

import org.jim.core.packets.RespBody;

public class Settings extends RespBody {
    private Double lowest;
    private Double fee;

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
