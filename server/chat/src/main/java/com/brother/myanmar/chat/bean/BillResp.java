package com.brother.myanmar.chat.bean;

import org.jim.core.packets.RespBody;

import java.util.List;

public class BillResp extends RespBody {
    private List<Bill> billList;

    public List<Bill> getBillList() {
        return billList;
    }

    public void setBillList(List<Bill> billList) {
        this.billList = billList;
    }
}
