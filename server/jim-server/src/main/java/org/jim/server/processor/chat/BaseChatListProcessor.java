package org.jim.server.processor.chat;

import org.jim.core.ImChannelContext;
import org.jim.core.packets.ChatWindowReqBody;
import org.jim.core.packets.ChatWindowRespBody;
import org.jim.core.packets.Message;
import org.jim.server.processor.SingleProtocolCmdProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseChatListProcessor implements SingleProtocolCmdProcessor {

    private static Logger logger = LoggerFactory.getLogger(BaseChatListProcessor.class);

    private ChatWindowRespBody respBody = new ChatWindowRespBody();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        ChatWindowReqBody chatBody = (ChatWindowReqBody)message;
        respBody.setUserid("test");
    }

    public ChatWindowRespBody getRes(){
        return respBody;
    }
}
