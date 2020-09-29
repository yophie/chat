package com.brother.myanmar.chat.command;

import com.brother.myanmar.chat.bean.Packet;
import com.brother.myanmar.chat.bean.PacketResp;
import com.brother.myanmar.chat.bean.PacketState;
import com.brother.myanmar.chat.dao.PacketDao;
import org.jim.core.ImChannelContext;
import org.jim.core.ImStatus;
import org.jim.core.packets.Message;
import org.jim.core.packets.PacketReqBody;
import org.jim.core.packets.RespBody;
import org.jim.server.processor.BaseProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;
import java.util.Random;

public class PacketProcessor extends BaseProcessor {

    private static Logger logger = LoggerFactory.getLogger(PacketProcessor.class);

    private RespBody respBody = new RespBody();

    private PacketDao packetDao = new PacketDao();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        PacketReqBody req = (PacketReqBody)message;
        if(Objects.isNull(req.getType()) || Objects.isNull(req.getPacketId())){
            respBody.setCode(ImStatus.C10024.getCode());
            respBody.setMsg(ImStatus.C10024.getMsg());
            return;
        }
        respBody = new PacketResp();
        PacketState packetState = new PacketState();
        packetState.setPacketId(req.getPacketId());
        packetState.setReciever(Integer.parseInt(imChannelContext.getUserId()));
        packetState.setTime(System.currentTimeMillis());
        List<PacketState> drawList;
        Random random = new Random();
        int isOpen;
        switch(req.getType()) {
            case 0:
                //0:packet state
                isOpen = packetDao.getPacketState(packetState);
                ((PacketResp)respBody).setState(isOpen);
                break;
            case 1:
                //1:packet list
                drawList = packetDao.getPacketList(packetState);
                ((PacketResp)respBody).setDrawList(drawList);
                break;
            case 2:
                //2:open packet
                isOpen = packetDao.getPacketState(packetState);
                if(isOpen>0){
                    respBody.setCode(ImStatus.C10024.getCode());
                    respBody.setMsg(ImStatus.C10024.getMsg());
                }else {
                    Packet packet = new Packet();
                    packet.setId(req.getPacketId());
                    packet = packetDao.findPacket(packet);
                    if (Objects.isNull(packet) || (packet.getState() == 2)) {
                        respBody.setCode(ImStatus.C10024.getCode());
                        respBody.setMsg(ImStatus.C10024.getMsg());
                    } else {
                        List<PacketState> currentDrawList = packetDao.getPacketList(packetState);
                        if (packet.getNum() <= currentDrawList.size()) {
                            respBody.setCode(ImStatus.C10024.getCode());
                            respBody.setMsg(ImStatus.C10024.getMsg());
                        } else {
                            if (packet.getType() == 0) {
                                packetState.setAmount(packet.getAmount() / packet.getNum());
                                packetDao.insertPacketState(packet.getSender(),packetState);
                                packet.setState(2);
                            } else {
                                Double res = packet.getAmount();
                                for (PacketState drawed : currentDrawList) {
                                    res -= drawed.getAmount();
                                }
                                if (packet.getNum() - 1 == currentDrawList.size()) {
                                    packetState.setAmount(res);
                                    packet.setState(2);
                                } else {
                                    double a = random.nextInt((int) (res * (double) 100));
                                    packetState.setAmount(a / (double) 100);
                                    packet.setState(1);
                                }
                                packetDao.insertPacketState(packet.getSender(),packetState);
                            }
                            packetDao.updatePacket(packet);
                            respBody.setCode(ImStatus.C10025.getCode());
                            respBody.setMsg(ImStatus.C10025.getMsg());
                        }
                    }
                }
                drawList = packetDao.getPacketList(packetState);
                ((PacketResp)respBody).setDrawList(drawList);
                break;
        }
    }

    @Override
    public RespBody getRes(){
        return respBody;
    }
}
