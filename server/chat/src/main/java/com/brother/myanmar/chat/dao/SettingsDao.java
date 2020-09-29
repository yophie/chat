package com.brother.myanmar.chat.dao;

import com.brother.myanmar.chat.SqlConnection;
import com.brother.myanmar.chat.bean.Settings;
import com.brother.myanmar.chat.mapper.Settings2Mapper;
import org.apache.ibatis.session.SqlSession;

public class SettingsDao {

    static SqlSession session = SqlConnection.getSession();

    public static Settings getSettings(){
        Settings2Mapper mapper = session.getMapper(Settings2Mapper.class);
        Settings result = mapper.getSettings();
        session.commit();
        return result;
    }

    public static int updateLowest(Double lowest){
        Settings2Mapper mapper = session.getMapper(Settings2Mapper.class);
        int rint = mapper.updateLowest(lowest);
        session.commit();
        return rint;
    }

    public static int updateFee(Double fee){
        Settings2Mapper mapper = session.getMapper(Settings2Mapper.class);
        int rint = mapper.updateFee(fee);
        session.commit();
        return rint;
    }

}
