package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Bill;
import com.brother.myanmar.chat.bean.Packet;
import com.brother.myanmar.chat.bean.PacketState;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.mapper.Bill2Mapper;
import com.brother.myanmar.chat.mapper.Packet2Mapper;
import com.brother.myanmar.chat.mapper.User2Mapper;
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
    public static int insertPacketState(Integer sender, PacketState packet){
        Packet2Mapper mapper = session.getMapper(Packet2Mapper.class);
        int result = mapper.insertPacketState(packet);
        if(result < 0){
            session.rollback();
            return result;
        }
        Bill2Mapper bmapper = session.getMapper(Bill2Mapper.class);
        Bill bill = new Bill();
        bill.setUserId(packet.getReciever());
        bill.setAmount(packet.getAmount());
        bill.setType(1);
        bill.setState(1);
        bill.setApplyTime(packet.getTime());
        bill.setOppsite(sender);
        result = bmapper.insertBill(bill);
        if(result < 0){
            session.rollback();
            return result;
        }
        User2Mapper umapper = session.getMapper(User2Mapper.class);
        User user = new User();
        user.setId(bill.getUserId());
        user.setMoney(bill.getAmount());
        result = umapper.updateUserMoney(user);
        if(result < 0){
            session.rollback();
            return result;
        }
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
