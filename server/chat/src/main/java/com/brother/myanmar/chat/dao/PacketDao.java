package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Packet;
import com.brother.myanmar.chat.bean.PacketState;
import com.brother.myanmar.chat.mapper.Packet2Mapper;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class PacketDao {

    static SqlSession session = SqlConnection.getSession();
    public static Packet findPacket(Packet packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        Packet result = mapper.findPacket(packet);
        session.commit();
        return result;
    }

    public static int insertPacket(Packet packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        int rint = mapper.insertPacket(packet);
        session.commit();
        return rint;
    }
    public static int deletePacket(Packet packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        int rint = mapper.deletePacket(packet);
        session.commit();
        return rint;
    }
    public static int updatePacket(Packet packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        int rint = mapper.updatePacket(packet);
        session.commit();
        return rint;
    }
    public static int getPacketState(PacketState packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        int result = mapper.getPacketState(packet);
        session.commit();
        return result;
    }
    public static int insertPacketState(PacketState packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        int result = mapper.insertPacketState(packet);
        session.commit();
        return result;
    }

    public static List<PacketState> getPacketList(PacketState packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        List<PacketState> result = mapper.getPacketList(packet);
        session.commit();
        return result;
    }

}
