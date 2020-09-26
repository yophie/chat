package com.brother.myanmar.chat.command;

import org.jim.core.ImChannelContext;
import org.jim.core.packets.Message;
import org.jim.core.packets.PacketReqBody;
import org.jim.core.packets.RespBody;
import org.jim.server.processor.BaseProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FriendSocietyProcessor extends BaseProcessor {

    private static Logger logger = LoggerFactory.getLogger(FriendSocietyProcessor.class);

    private RespBody respBody = new RespBody();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        PacketReqBody req = (PacketReqBody)message;
    }

    @Override
    public RespBody getRes(){
        return respBody;
    }
}
