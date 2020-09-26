package com.brother.myanmar.chat.mapper;

import com.brother.myanmar.chat.bean.ChatWindow;

import java.util.List;

public interface ChatWindow2Mapper {

    int insertWindow(ChatWindow window);
    int updateWindow(ChatWindow window);
    ChatWindow findWindow(ChatWindow window);
    List<ChatWindow> getWindowList(ChatWindow window);
}
