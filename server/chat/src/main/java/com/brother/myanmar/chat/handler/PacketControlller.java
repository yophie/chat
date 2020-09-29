package com.brother.myanmar.chat.handler;

import com.brother.myanmar.chat.bean.Packet;
import com.brother.myanmar.chat.bean.PacketResp;
import com.brother.myanmar.chat.bean.PacketState;
import com.brother.myanmar.chat.dao.PacketDao;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.packets.PacketReqBody;
import org.jim.core.packets.RespBody;
import org.jim.core.utils.JsonKit;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;

import java.util.List;
import java.util.Objects;
import java.util.Random;

@RequestPath(value = "/api/packet")
public class PacketControlller {

    @RequestPath(value = "/list")
    public HttpResponse list(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        PacketReqBody req = JsonKit.toBean(request.getBody(), PacketReqBody.class);
        if(req == null || req.getPacketId() == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10024)));
        }
        PacketResp respBody = new PacketResp();
        PacketState packetState = new PacketState();
        packetState.setPacketId(req.getPacketId());
        List<PacketState> drawList = PacketDao.getPacketList(packetState);
        respBody.setDrawList(drawList);
        respBody.setCode(ImStatus.C10025.getCode());
        respBody.setMsg(ImStatus.C10025.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, respBody));
    }

    @RequestPath(value = "/state")
    public HttpResponse state(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        PacketReqBody req = JsonKit.toBean(request.getBody(), PacketReqBody.class);
        if(req == null || req.getPacketId() == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10024)));
        }
        PacketResp respBody = new PacketResp();
        PacketState packetState = new PacketState();
        packetState.setPacketId(req.getPacketId());
        int isOpen = PacketDao.getPacketState(packetState);
        respBody.setState(isOpen);
        respBody.setCode(ImStatus.C10025.getCode());
        respBody.setMsg(ImStatus.C10025.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, respBody));
    }

    @RequestPath(value = "/grap")
    public HttpResponse grap(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;
        PacketReqBody req = JsonKit.toBean(request.getBody(), PacketReqBody.class);
        if(req == null || req.getPacketId() == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10024)));
        }
        PacketResp respBody = new PacketResp();
        Packet packet = new Packet();
        packet.setId(req.getPacketId());
        packet = PacketDao.findPacket(packet);
        PacketState packetState = new PacketState();
        packetState.setPacketId(req.getPacketId());
        packetState.setReciever(request.getUserId());
        packetState.setTime(System.currentTimeMillis());
        if (Objects.isNull(packet) || (packet.getState() == 2)) {
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10024)));
        } else {
            respBody.setId(packet.getId());
            respBody.setAmount(packet.getAmount());
            respBody.setSender(packet.getSender());
            respBody.setType(packet.getType());
            respBody.setTime(packet.getTime());
            List<PacketState> currentDrawList = PacketDao.getPacketList(packetState);
            int grabs = currentDrawList==null ? 0 : currentDrawList.size();
            if (packet.getNum() <= grabs) {
                return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10024)));
            } else {
                if (packet.getType() == null || packet.getType() == 0) {
                    packetState.setAmount(packet.getAmount() / packet.getNum());
                    PacketDao.insertPacketState(packet.getSender(), packetState);
                    if(packet.getNum() == (grabs+1)) {
                        packet.setState(2);
                    }else{
                        packet.setState(1);
                    };
                } else {
                    Random random = new Random();
                    Double res = packet.getAmount();
                    for (PacketState drawed : currentDrawList) {
                        res -= drawed.getAmount();
                    }
                    if (packet.getNum() - 1 == grabs) {
                        packetState.setAmount(res);
                        packet.setState(2);
                    } else {
                        double a = random.nextInt((int) (res * (double) 100));
                        packetState.setAmount(a / (double) 100);
                        packet.setState(1);
                    }
                    PacketDao.insertPacketState(packet.getSender(), packetState);
                }
                PacketDao.updatePacket(packet);
            }
        }
        List<PacketState> drawList = PacketDao.getPacketList(packetState);
        respBody.setDrawList(drawList);
        respBody.setCode(ImStatus.C10025.getCode());
        respBody.setMsg(ImStatus.C10025.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, respBody));
    }


}
