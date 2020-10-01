package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Settings;
import com.brother.myanmar.chat.mapper.Settings2Mapper;

public class SettingsDao {

    public static Settings getSettings(){
        Settings2Mapper mapper = SqlConnection.getSession().getMapper(Settings2Mapper.class);
        Settings result = mapper.getSettings();
        SqlConnection.getSession().commit();
        return result;
    }

    public static int updateLowest(Double lowest){
        Settings2Mapper mapper = SqlConnection.getSession().getMapper(Settings2Mapper.class);
        int rint = mapper.updateLowest(lowest);
        SqlConnection.getSession().commit();
        return rint;
    }

    public static int updateFee(Double fee){
        Settings2Mapper mapper = SqlConnection.getSession().getMapper(Settings2Mapper.class);
        int rint = mapper.updateFee(fee);
        SqlConnection.getSession().commit();
        return rint;
    }

}
