package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.Packet;
import com.brother.myanmar.chat.bean.PacketState;

import java.util.List;

public interface Packet2Mapper {

    Packet findPacket(Packet packet);
    int insertPacket(Packet packet);
    int deletePacket(Packet packet);
    int updatePacket(Packet packet);

    int getPacketState(PacketState packet);
    int insertPacketState(PacketState packet);
    List<PacketState> getPacketList(PacketState packet);
}
