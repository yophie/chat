package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Bill;
import com.brother.myanmar.chat.bean.Packet;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.mapper.Bill2Mapper;
import com.brother.myanmar.chat.mapper.Packet2Mapper;
import com.brother.myanmar.chat.mapper.User2Mapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import java.util.List;

public class BillDao {

    public static PageInfo<Bill> findBill(Bill bill){
        Bill2Mapper mapper = SqlConnection.getSession().getMapper(Bill2Mapper.class);
        PageHelper.startPage(bill.getPageNo(),bill.getPageSize());
        List<Bill> result = mapper.findBill(bill);
        PageInfo<Bill> pageInfo = new PageInfo<Bill>(result);
        SqlConnection.getSession().commit();
        return pageInfo;
    }

    public static int insertBill(Packet packet, Bill bill){
        Packet2Mapper pmapper = SqlConnection.getSession().getMapper(Packet2Mapper.class);
        int rint = pmapper.insertPacket(packet);
        if(rint < 0){
            SqlConnection.getSession().rollback();
            return rint;
        }
        Bill2Mapper bmapper = SqlConnection.getSession().getMapper(Bill2Mapper.class);
        rint = bmapper.insertBill(bill);
        if(rint < 0){
            SqlConnection.getSession().rollback();
            return rint;
        }
        User2Mapper umapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        User user = new User();
        user.setId(bill.getUserId());
        user.setMoney(bill.getAmount());
        rint = umapper.updateUserMoney(user);
        if(rint < 0){
            SqlConnection.getSession().rollback();
            return rint;
        }
        user = umapper.findUserById(user.getId());
        if(user.getMoney()<0){
            SqlConnection.getSession().rollback();
            return -1;
        }
        SqlConnection.getSession().commit();
        return rint;
    }

    public static int insertBill(Bill bill){
        Bill2Mapper bmapper = SqlConnection.getSession().getMapper(Bill2Mapper.class);
        int rint = bmapper.insertBill(bill);
        if(rint < 0){
            SqlConnection.getSession().rollback();
            return rint;
        }
        User2Mapper umapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        User user = new User();
        user.setId(bill.getUserId());
        user.setMoney(bill.getAmount());
        rint = umapper.updateUserMoney(user);
        if(rint < 0){
            SqlConnection.getSession().rollback();
            return rint;
        }
        SqlConnection.getSession().commit();
        return rint;
    }

    public static int updateBill(Bill bill){
        Bill2Mapper mapper = SqlConnection.getSession().getMapper(Bill2Mapper.class);
        Bill oriBill = mapper.findBillById(bill.getId());
        if(oriBill.getState() == bill.getState()) return -1;
        int rint = mapper.updateBill(bill);
        if(rint < 0){
            SqlConnection.getSession().rollback();
            return rint;
        }
        User2Mapper umapper = SqlConnection.getSession().getMapper(User2Mapper.class);
        User user = new User();
        user.setId(bill.getUserId());
        if(bill.getState()==1) {
            user.setMoney(bill.getAmount());
        }else{
            user.setMoney(0-bill.getAmount());
        }
        user.setMoney(bill.getAmount());
        rint = umapper.updateUserMoney(user);
        if(rint < 0){
            SqlConnection.getSession().rollback();
            return rint;
        }
        SqlConnection.getSession().commit();
        return rint;
    }

}
