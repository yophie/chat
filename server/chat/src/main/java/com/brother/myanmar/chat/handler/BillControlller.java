package com.brother.myanmar.chat.handler;

import com.brother.myanmar.chat.bean.Bill;
import com.brother.myanmar.chat.bean.BillResp;
import com.brother.myanmar.chat.bean.Settings;
import com.brother.myanmar.chat.dao.BillDao;
import com.brother.myanmar.chat.dao.SettingsDao;
import com.github.pagehelper.PageInfo;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.utils.JsonKit;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;

@RequestPath(value = "/api/bill")
public class BillControlller {

    @RequestPath(value = "/list")
    public HttpResponse list(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        Bill req = JsonKit.toBean(request.getBody(), Bill.class);
        if(req == null) req = new Bill();
        if(req.getPageNo() == null) req.setPageNo(1);
        if(req.getPageSize() == null) req.setPageSize(Integer.MAX_VALUE);
        if(!request.isSuper()) {
            //normal user just can search self's bill
            req.setUserId(request.getUserId());
        }
        //state; // 0:applying 1:approved 2:reject
        //type; // 0:send packet 1:grab packet 2:cash in 3:cash out
        PageInfo<Bill> bills = BillDao.findBill(req);
        BillResp billResp = new BillResp();
        billResp.setCode(ImStatus.C10035.getCode());
        billResp.setMsg(ImStatus.C10035.getMsg());
        billResp.setBillList(bills);
        return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
    }

    @RequestPath(value = "/invest")
    public HttpResponse invest(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        BillResp billResp = new BillResp();
        Bill req = JsonKit.toBean(request.getBody(), Bill.class);
        if(req == null || !request.isSuper() || req.getUserId() == null || req.getAmount() == null || req.getAmount() <= 0){
            billResp.setCode(ImStatus.C10034.getCode());
            billResp.setMsg(ImStatus.C10034.getMsg());
            return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
        }
        req.setUserId(req.getUserId());
        req.setType(2);
        req.setState(1);
        req.setApplyTime(System.currentTimeMillis());
        BillDao.insertBill(req);
        billResp.setCode(ImStatus.C10035.getCode());
        billResp.setMsg(ImStatus.C10035.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
    }

    @RequestPath(value = "/cashout")
    public HttpResponse cashout(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        BillResp billResp = new BillResp();
        Bill req = JsonKit.toBean(request.getBody(), Bill.class);
        Settings settings = SettingsDao.getSettings();
        if(req.getAmount() == null || req.getAmount() < settings.getFee()){
            billResp.setCode(ImStatus.C10034.getCode());
            billResp.setMsg(ImStatus.C10034.getMsg());
            return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
        }
        req.setFee(settings.getFee());
        req.setAmount(0-req.getAmount());
        req.setApprovalAmount(req.getAmount() * (1 - req.getFee()));
        req.setUserId(request.getUserId());
        req.setType(3);
        req.setState(0);
        req.setApplyTime(System.currentTimeMillis());
        BillDao.insertBill(req);
        billResp.setCode(ImStatus.C10035.getCode());
        billResp.setMsg(ImStatus.C10035.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
    }

    @RequestPath(value = "/audit")
    public HttpResponse audit(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        BillResp billResp = new BillResp();
        Bill req = JsonKit.toBean(request.getBody(), Bill.class);
        if(!request.isSuper() || req.getId() == null || req.getState() == null || req.getState() <1 || req.getState() > 2){
            billResp.setCode(ImStatus.C10034.getCode());
            billResp.setMsg(ImStatus.C10034.getMsg());
            return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
        }
        req.setApprovalTime(System.currentTimeMillis());
        if(BillDao.updateBill(req)<0){
            billResp.setCode(ImStatus.C10034.getCode());
            billResp.setMsg(ImStatus.C10034.getMsg());
            return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
        }
        billResp.setApprovalTime(req.getApprovalTime());
        billResp.setCode(ImStatus.C10035.getCode());
        billResp.setMsg(ImStatus.C10035.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, billResp));
    }
}
