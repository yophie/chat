package org.jim.server.processor;

import org.jim.core.ImChannelContext;
import org.jim.core.packets.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseProcessor implements SingleProtocolCmdProcessor {

    private static Logger logger = LoggerFactory.getLogger(BaseProcessor.class);

    private RespBody respBody = new RespBody();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
    }

    public RespBody getRes(){
        return respBody;
    }
}
