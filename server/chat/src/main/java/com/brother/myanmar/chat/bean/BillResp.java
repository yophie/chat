package com.brother.myanmar.chat.bean;

import com.github.pagehelper.PageInfo;
import org.jim.core.packets.RespBody;

public class BillResp extends RespBody {
    private PageInfo<Bill> billList;

    public PageInfo<Bill> getBillList() {
        return billList;
    }

    public void setBillList(PageInfo<Bill> billList) {
        this.billList = billList;
    }
}
