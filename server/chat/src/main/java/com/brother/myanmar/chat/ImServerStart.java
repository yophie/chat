/**
 * 
 */
package com.brother.myanmar.chat;

import com.brother.myanmar.chat.command.ChatHandshakeProcessor;
import com.brother.myanmar.chat.listener.ChatGroupListener;
import com.brother.myanmar.chat.listener.ChatUserListener;
import com.brother.myanmar.chat.service.ChatLoginServiceProcessor;
import org.apache.commons.lang3.StringUtils;
import org.jim.core.packets.Command;
import org.jim.core.utils.PropUtil;
import org.jim.server.JimServer;
import org.jim.server.command.CommandManager;
import org.jim.server.command.handler.ChatReqHandler;
import org.jim.server.command.handler.HandshakeReqHandler;
import org.jim.server.command.handler.LoginReqHandler;
import org.jim.server.config.ImServerConfig;
import org.jim.server.config.PropertyImServerConfigBuilder;
import org.jim.server.processor.chat.DefaultAsyncChatMessageProcessor;
import org.tio.core.ssl.SslConfig;

public class ImServerStart {

	public static void main(String[] args)throws Exception{
		ImServerConfig imServerConfig = new PropertyImServerConfigBuilder("config/jim.properties").build();
		//初始化SSL;(开启SSL之前,你要保证你有SSL证书哦...)
		initSsl(imServerConfig);
		//设置群组监听器，非必须，根据需要自己选择性实现;
		imServerConfig.setImGroupListener(new ChatGroupListener());
		//设置绑定用户监听器，非必须，根据需要自己选择性实现;
		imServerConfig.setImUserListener(new ChatUserListener());
		JimServer jimServer = new JimServer(imServerConfig);

		/*****************start 以下处理器根据业务需要自行添加与扩展，每个Command都可以添加扩展,此处为demo中处理**********************************/

		HandshakeReqHandler handshakeReqHandler = CommandManager.getCommand(Command.COMMAND_HANDSHAKE_REQ, HandshakeReqHandler.class);
		//添加自定义握手处理器;
		handshakeReqHandler.addMultiProtocolProcessor(new ChatHandshakeProcessor());
		LoginReqHandler loginReqHandler = CommandManager.getCommand(Command.COMMAND_LOGIN_REQ,LoginReqHandler.class);
		//添加登录业务处理器;
		loginReqHandler.setSingleProcessor(new ChatLoginServiceProcessor());
		//添加用户业务聊天记录处理器，用户自己继承抽象类BaseAsyncChatMessageProcessor即可，以下为内置默认的处理器！
		ChatReqHandler chatReqHandler = CommandManager.getCommand(Command.COMMAND_CHAT_REQ, ChatReqHandler.class);
		chatReqHandler.setSingleProcessor(new DefaultAsyncChatMessageProcessor());
		/*****************end *******************************************************************************************/
		jimServer.start();
	}

	/**
	 * 开启SSL之前，你要保证你有SSL证书哦！
	 * @param imServerConfig
	 * @throws Exception
	 */
	private static void initSsl(ImServerConfig imServerConfig) throws Exception {
		//开启SSL
		if(ImServerConfig.ON.equals(imServerConfig.getIsSSL())){
			String keyStorePath = PropUtil.get("jim.key.store.path");
			String keyStoreFile = keyStorePath;
			String trustStoreFile = keyStorePath;
			String keyStorePwd = PropUtil.get("jim.key.store.pwd");
			if (StringUtils.isNotBlank(keyStoreFile) && StringUtils.isNotBlank(trustStoreFile)) {
				SslConfig sslConfig = SslConfig.forServer(keyStoreFile, trustStoreFile, keyStorePwd);
				imServerConfig.setSslConfig(sslConfig);
			}
		}
	}

}
