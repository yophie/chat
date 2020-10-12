package org.jim.server.command.handler;

import org.jim.core.ImChannelContext;
import org.jim.core.ImPacket;
import org.jim.core.cache.redis.RedisCacheManager;
import org.jim.core.config.ImConfig;
import org.jim.core.exception.ImException;
import org.jim.core.packets.*;
import org.jim.server.ImServerChannelContext;
import org.jim.server.JimServerAPI;
import org.jim.server.command.AbstractCmdHandler;
import org.jim.server.config.ImServerConfig;
import org.jim.server.protocol.ProtocolManager;
import org.jim.server.queue.MsgQueueRunnable;
import org.jim.server.util.ChatKit;

import java.util.Objects;

/**
 * 版本: [1.0]
 * 功能说明: 聊天请求cmd消息命令处理器
 *  创建时间: 9月22日 下午2:58:59
 */
public class ChatReqHandler extends AbstractCmdHandler {

	public static User getUser(String key){
		return RedisCacheManager.getCache("user_cache").get(key, User.class);
	}

	@Override
	public ImPacket handler(ImPacket packet, ImChannelContext channelContext) throws ImException {
		ImServerChannelContext imServerChannelContext = (ImServerChannelContext)channelContext;
		if (packet.getBody() == null) {
			throw new ImException("body is null");
		}
		ChatBody chatBody = ChatKit.toChatBody(packet.getBody(), channelContext);
		chatBody.setChatId(chatBody.getFrom());
		User user = getUser(chatBody.getFrom());
		chatBody.setFromName(user.getNick());
		chatBody.setFromAvatar(user.getAvatar());

		packet.setBody(chatBody.toByte());
		//聊天数据格式不正确
		if(chatBody == null || ChatType.forNumber(chatBody.getChatType()) == null){
			ImPacket respChatPacket = ProtocolManager.Packet.dataInCorrect(channelContext);
			return respChatPacket;
		}
		//异步调用业务处理消息接口
		MsgQueueRunnable msgQueueRunnable = getMsgQueueRunnable(imServerChannelContext);
		msgQueueRunnable.addMsg(chatBody);
		msgQueueRunnable.executor.execute(msgQueueRunnable);
		ImPacket chatPacket = new ImPacket(Command.COMMAND_CHAT_REQ,new RespBody(Command.COMMAND_CHAT_REQ,chatBody).toByte());
		//设置同步序列号;
		chatPacket.setSynSeq(packet.getSynSeq());
		ImServerConfig imServerConfig = ImConfig.Global.get();
		boolean isStore = ImServerConfig.ON.equals(imServerConfig.getIsStore());
		//私聊
		if(ChatType.CHAT_TYPE_PRIVATE.getNumber() == chatBody.getChatType()){
			String toId = chatBody.getTo();
			if(ChatKit.isOnline(toId, isStore)) {
				JimServerAPI.sendToUser(toId, chatPacket);
			}
			//发送成功响应包
			chatBody.setChatId(chatBody.getTo());
			chatPacket = new ImPacket(Command.COMMAND_CHAT_REQ,new RespBody(Command.COMMAND_CHAT_REQ,chatBody).toByte());
			//设置同步序列号;
			chatPacket.setSynSeq(packet.getSynSeq());
			return chatPacket;//ProtocolManager.Packet.success(channelContext, chatBody);
			/*}else{
				//用户不在线响应包
				return ProtocolManager.Packet.offline(channelContext);
			}*/
		//群聊
		}else if(ChatType.CHAT_TYPE_PUBLIC.getNumber() == chatBody.getChatType()){
			String groupId = chatBody.getGroupId();
			Boolean result = RedisCacheManager.getCache("forbidden").get(groupId, Boolean.class);
			if(result == null?false:result){
				String owner = RedisCacheManager.getCache("group_owner").get(groupId, String.class);
				if(chatBody.getFrom().equals(owner) || chatBody.getMsgType()==2){
					JimServerAPI.sendToGroup(groupId, chatPacket);
				}else {
					chatBody.setMsgType(1);
					chatPacket = new ImPacket(Command.COMMAND_CHAT_REQ, new RespBody(Command.COMMAND_CHAT_REQ, chatBody).toByte());
					JimServerAPI.sendToUser(owner, chatPacket);
					if(!chatBody.getFrom().equals(owner)){
						JimServerAPI.sendToUser(String.valueOf(chatBody.getFrom()), chatPacket);
					}
				}
			}else {
				JimServerAPI.sendToGroup(groupId, chatPacket);
			}
			//发送成功响应包
			return ProtocolManager.Packet.success(channelContext, chatBody);
		}
		return null;
	}

	@Override
	public Command command() {
		return Command.COMMAND_CHAT_REQ;
	}

	/**
	 * 获取聊天业务处理异步消息队列
	 * @param imServerChannelContext IM通道上下文
	 * @return
	 */
	private MsgQueueRunnable getMsgQueueRunnable(ImServerChannelContext imServerChannelContext){
		MsgQueueRunnable msgQueueRunnable = (MsgQueueRunnable)imServerChannelContext.getMsgQue();
		if(Objects.nonNull(msgQueueRunnable.getProtocolCmdProcessor())){
			return msgQueueRunnable;
		}
		synchronized (MsgQueueRunnable.class){
			msgQueueRunnable.setProtocolCmdProcessor(this.getSingleProcessor());
		}
		return msgQueueRunnable;
	}

}
