package com.brother.myanmar.chat.command;

import com.brother.myanmar.chat.dao.WindowDao;
import org.jim.core.ImChannelContext;
import org.jim.core.packets.ChatBody;
import org.jim.server.processor.chat.BaseAsyncChatMessageProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ChatMessageProcessor extends BaseAsyncChatMessageProcessor {

    private static Logger logger = LoggerFactory.getLogger(ChatMessageProcessor.class);

    private WindowDao windowDao = new WindowDao();

    @Override
    public void doProcess(ChatBody chatBody, ImChannelContext imChannelContext){
        //红包处理
        if(chatBody.getMsgType() == 2){

        }
    }
}
