/**
 * 
 */
package org.jim.core.packets;

import com.alibaba.fastjson.JSONObject;

/**
 * 版本: [1.0]
 * 功能说明: 
 *  创建时间: 7月26日 上午11:34:44
 */
public class ChatBody extends Message {
	
	private static final long serialVersionUID = 5731474214655476286L;
	/**
	 * 发送用户id;
	 */
	private String from;
	private String fromName;
	private String fromAvatar;
	/**
	 * 目标用户id;
	 */
	private String to;
	/**
	 * 消息类型;(如：0:text、1:forbidden、2：packet、3:image、4:sound、5：time、6：system)
	 */
	private Integer msgType;
	/**
	 * 聊天类型;(如公聊、私聊)
	 */
	private Integer chatType;
	/**
	 * 消息内容;
	 */
	private String content;
	/**
	 * 消息发到哪个群组;
	 */
	private String groupId;

	private Double packetAmount;
	private Integer packetNum;
	//红包时 0：普通红包 1：拼手气
	private Integer packetType;

	private String chatId;
	
	private ChatBody(){}
	
	private ChatBody(String id , String from , String to , Integer msgType ,
					 Integer chatType , String content , String groupId , Integer cmd ,
					 Long createTime , JSONObject extras, Double packetAmount,
					 Integer packetNum, Integer packetType){
		this.id = id;
		this.from = from ;
		this.to = to;
		this.msgType = msgType;
		this.chatType = chatType;
		this.content = content;
		this.groupId = groupId;
		this.cmd = cmd;
		this.createTime = createTime;
		this.extras = extras;
		this.packetAmount = packetAmount;
		this.packetType = packetType;
		this.packetNum = packetNum;
	}
	
	public static ChatBody.Builder newBuilder(){
		return new ChatBody.Builder();
	}

	public String getFrom() {
		return from;
	}

	public ChatBody setFrom(String from) {
		this.from = from;
		return this;
	}
	public String getTo() {
		return to;
	}

	public ChatBody setTo(String to) {
		this.to = to;
		return this;
	}
	
	public Integer getMsgType() {
		return msgType;
	}

	public ChatBody setMsgType(Integer msgType) {
		this.msgType = msgType;
		return this;
	}
	public String getContent() {
		return content;
	}

	public ChatBody setContent(String content) {
		this.content = content;
		return this;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public Integer getChatType() {
		return chatType;
	}

	public ChatBody setChatType(Integer chatType) {
		this.chatType = chatType;
		return this;
	}

	public Double getPacketAmount() {
		return packetAmount;
	}

	public ChatBody setPacketAmount(Double packetAmount) {
		this.packetAmount = packetAmount;
		return this;
	}

	public Integer getPacketType() {
		return packetType;
	}

	public ChatBody setPacketType(Integer packetType) {
		this.packetType = packetType;
		return this;
	}

	public Integer getPacketNum() {
		return packetNum;
	}

	public ChatBody setPacketNum(Integer packetNum) {
		this.packetNum = packetNum;
		return this;
	}

	public String getChatId() {
		return chatId;
	}

	public void setChatId(String chatId) {
		this.chatId = chatId;
	}

	public String getFromName() {
		return fromName;
	}

	public void setFromName(String fromName) {
		this.fromName = fromName;
	}

	public String getFromAvatar() {
		return fromAvatar;
	}

	public void setFromAvatar(String fromAvatar) {
		this.fromAvatar = fromAvatar;
	}

	public static class Builder extends Message.Builder<ChatBody,ChatBody.Builder>{
		/**
		 * 来自user_id;
		 */
		private String from;
		/**
		 * 目标user_id;
		 */
		private String to;
		/**
		 * 消息类型;(如：0:text、1:image、2:voice、3:vedio、4:music、5:news)
		 */
		private Integer msgType;
		/**
		 * 聊天类型;(如公聊、私聊)
		 */
		private Integer chatType;
		/**
		 * 消息内容;
		 */
		private String content;
		/**
		 * 消息发到哪个群组;
		 */
		private String groupId;

		private Double packetAmount;
		private Integer packetNum;
		//系统命令
		private Integer packetType;
		
		public Builder(){};
		
		public Builder from(String from) {
			this.from = from;
			return this;
		}
		public Builder to(String to) {
			this.to = to;
			return this;
		}
		public Builder msgType(Integer msgType) {
			this.msgType = msgType;
			return this;
		}
		public Builder chatType(Integer chatType) {
			this.chatType = chatType;
			return this;
		}
		public Builder content(String content) {
			this.content = content;
			return this;
		}
		public Builder groupId(String groupId) {
			this.groupId = groupId;
			return this;
		}
		public Builder packetAmount(Double msgType) {
			this.packetAmount = packetAmount;
			return this;
		}
		public Builder packetType(Integer systemCmd) {
			this.packetType = systemCmd;
			return this;
		}

		public Builder packetNum(Integer packetNum) {
			this.packetNum = packetNum;
			return this;
		}
		@Override
		protected Builder getThis() {
			return this;
		}

		@Override
		public ChatBody build(){
			return new ChatBody(this.id , this.from , this.to , this.msgType , this.chatType , this.content , this.groupId ,this.cmd ,
					this.createTime , this.extras, this.packetAmount, this.packetNum, this.packetType);
		}
	}
}
