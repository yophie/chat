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
        Packet packet = new Packet();
        packet.setId(req.getPacketId());
        packet = PacketDao.findPacket(packet);
        if(packet == null){
            return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10024)));
        }
        respBody.setId(packet.getId());
        respBody.setType(packet.getType());
        respBody.setTime(packet.getTime());
        respBody.setAmount(packet.getAmount());
        respBody.setNum(packet.getNum());
        respBody.setSender(packet.getSender());
        respBody.setSenderName(packet.getSenderName());
        respBody.setSenderAccount(packet.getSenderAccount());
        respBody.setSenderAvatar(packet.getSenderAvatar());

        PacketState packetState = new PacketState();
        packetState.setPacketId(req.getPacketId());
        List<PacketState> drawList = PacketDao.getPacketList(packetState);
        respBody.setDrawList(drawList);
        respBody.setQueryAmount(0.0);
        if(drawList!=null) {
            for (int i = 0; i < drawList.size();i++){
                if(drawList.get(i).getReciever() == request.getUserId()){
                    respBody.setQueryAmount(drawList.get(i).getAmount());
                    break;
                }
            }
        }
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
        Packet packet = new Packet();
        packet.setId(req.getPacketId());
        packet = PacketDao.findPacket(packet);

        PacketResp respBody = new PacketResp();
        PacketState packetState = new PacketState();
        packetState.setPacketId(req.getPacketId());
        int num = PacketDao.getPacketState(packetState);
        respBody.setSurplus(packet.getNum()-num);

        packetState.setReciever(request.getUserId());
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
            respBody.setType(packet.getType());
            respBody.setTime(packet.getTime());
            respBody.setAmount(packet.getAmount());
            respBody.setNum(packet.getNum());
            respBody.setSender(packet.getSender());
            respBody.setSenderName(packet.getSenderName());
            respBody.setSenderAccount(packet.getSenderAccount());
            respBody.setSenderAvatar(packet.getSenderAvatar());
            List<PacketState> currentDrawList = PacketDao.getPacketList(packetState);
            for(int i=0;i<currentDrawList.size();i++){
                if(currentDrawList.get(i).getReciever() == request.getUserId()) {
                    return TokenFilter.crossOrigin(HttpResps.json(request, new RespBody(ImStatus.C10024)));
                }
            }
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
        respBody.setQueryAmount(packetState.getAmount());
        List<PacketState> drawList = PacketDao.getPacketList(packetState);
        respBody.setDrawList(drawList);
        respBody.setCode(ImStatus.C10025.getCode());
        respBody.setMsg(ImStatus.C10025.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, respBody));
    }


}
