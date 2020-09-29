package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.Settings;

public interface Settings2Mapper {

    int updateLowest(Double lowest);
    int updateFee(Double fee);
    Settings getSettings();
}
