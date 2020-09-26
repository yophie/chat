package org.jim.server.command.handler;

import org.jim.core.ImChannelContext;
import org.jim.core.ImPacket;
import org.jim.core.ImStatus;
import org.jim.core.exception.ImException;
import org.jim.core.packets.ChatWindowReqBody;
import org.jim.core.packets.Command;
import org.jim.core.packets.RespBody;
import org.jim.core.utils.JsonKit;
import org.jim.server.command.AbstractCmdHandler;
import org.jim.server.processor.chat.BaseChatListProcessor;
import org.jim.server.protocol.ProtocolManager;

public class ChatListReqHandler extends AbstractCmdHandler {

    @Override
    public ImPacket handler(ImPacket packet, ImChannelContext channelContext) throws ImException {
        if (packet.getBody() == null) {
            RespBody respBody = new RespBody(Command.COMMAND_CHAT_List_RESP, ImStatus.C10022);
            return ProtocolManager.Converter.respPacket(respBody, channelContext);
        }
        ChatWindowReqBody reqBody = JsonKit.toBean(packet.getBody(), ChatWindowReqBody.class);
        BaseChatListProcessor processor = this.getSingleProcessor(BaseChatListProcessor.class);
        processor.process(channelContext,reqBody);
        return ProtocolManager.Converter.respPacket(processor.getRes(), channelContext);
    }

    @Override
    public Command command() {
        return Command.COMMAND_CHAT_List_REQ;
    }
}
