package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.Bill;

import java.util.List;

public interface Bill2Mapper {

    int insertBill(Bill bill);
    int updateBill(Bill bill);
    List<Bill> findBill(Bill bill);
    Bill findBillById(int id);
}
