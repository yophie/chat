package com.brother.myanmar.chat.command;

import com.brother.myanmar.chat.bean.Bill;
import com.brother.myanmar.chat.bean.Packet;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.BillDao;
import com.brother.myanmar.chat.dao.UserDao;
import com.brother.myanmar.chat.service.RedisCache;
import org.jim.core.ImChannelContext;
import org.jim.core.config.ImConfig;
import org.jim.core.message.MessageHelper;
import org.jim.core.packets.ChatBody;
import org.jim.core.packets.ChatType;
import org.jim.core.packets.Message;
import org.jim.server.config.ImServerConfig;
import org.jim.server.processor.SingleProtocolCmdProcessor;
import org.jim.server.util.ChatKit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ChatMessageProcessor implements SingleProtocolCmdProcessor {

    private static Logger logger = LoggerFactory.getLogger(ChatMessageProcessor.class);

    protected ImServerConfig imServerConfig = ImConfig.Global.get();

    @Override
    public void process(ImChannelContext imChannelContext, Message message) {
        ChatBody chatBody = (ChatBody)message;
        //开启持久化
        boolean isStore = ImServerConfig.ON.equals(imServerConfig.getIsStore());
        if(isStore){
            //存储群聊消息;
            if(ChatType.CHAT_TYPE_PUBLIC.getNumber() == chatBody.getChatType()){
                if(RedisCache.isForbidden(chatBody.getGroupId())){
                    String owner = RedisCache.getGroupOwner(chatBody.getGroupId());
                    if(!chatBody.getFrom().equals(owner) && chatBody.getMsgType()!=2){
                        chatBody.setMsgType(1);
                    }
                    writeMessage(STORE,GROUP+":"+chatBody.getGroupId(),chatBody);
                    /*boolean isOnline = false;
                    if(isStore && ImServerConfig.ON.equals(imServerConfig.getIsCluster())){
                        MessageHelper messageHelper = imServerConfig.getMessageHelper();
                        isOnline = messageHelper.isOnline(userId);
                    }else{
                        isOnline = ChatKit.isOnline(userId, isStore);
                    }
                    if(!isOnline) {
                        writeMessage(PUSH, GROUP + ":" + chatBody.getGroupId() + ":" + userId, chatBody);
                    }*/
                }else {
                    pushGroupMessages(PUSH, STORE, chatBody, isStore);
                }
            }else{
                String from = chatBody.getFrom();
                String to = chatBody.getTo();
                String sessionId = ChatKit.sessionId(from,to);
                writeMessage(STORE,USER+":"+sessionId,chatBody);
                /*boolean isOnline = ChatKit.isOnline(to, isStore);
                if(!isOnline){
                    writeMessage(PUSH,USER+":"+to+":"+from,chatBody);
                }*/
            }
        }
        doProcess(chatBody, imChannelContext);
    }

    private void doProcess(ChatBody chatBody, ImChannelContext imChannelContext){
        //红包处理
        if(chatBody.getMsgType() == 2){
            User me = UserDao.findUserById(Integer.parseInt(chatBody.getFrom()));
            if(chatBody.getPacketAmount() > me.getMoney()){
                return;
            }
            Packet packet = new Packet();
            Bill bill = new Bill();
            if(ChatType.CHAT_TYPE_PRIVATE.getNumber() == chatBody.getChatType()){
                packet.setNum(1);
                packet.setType(0);
                packet.setUserGroupId(Integer.parseInt(chatBody.getTo()));
            }else{
                packet.setNum(chatBody.getPacketNum());
                packet.setType(chatBody.getPacketType());
                packet.setUserGroupId(Integer.parseInt(chatBody.getGroupId()));
            }
            packet.setId(chatBody.getId());
            packet.setState(0);
            packet.setAmount(chatBody.getPacketAmount());
            packet.setSender(Integer.parseInt(chatBody.getFrom()));
            packet.setTime(System.currentTimeMillis());
            bill.setOppsite(packet.getUserGroupId());
            bill.setUserId(packet.getSender());
            bill.setAmount(0-packet.getAmount());
            bill.setType(0);
            bill.setState(1);
            bill.setApplyTime(packet.getTime());
            BillDao.insertBill(packet, bill);
        }
    }

    /**
     * 推送持久化群组消息
     * @param pushTable
     * @param storeTable
     * @param chatBody
     */
    private void pushGroupMessages(String pushTable, String storeTable , ChatBody chatBody, boolean isStore){
        MessageHelper messageHelper = imServerConfig.getMessageHelper();
        String group_id = chatBody.getGroupId();
        //先将群消息持久化到存储Timeline;
        writeMessage(storeTable,GROUP+":"+group_id,chatBody);
        /*List<String> userIds = messageHelper.getGroupUsers(group_id);
        //通过写扩散模式将群消息同步到所有的群成员
        for(String userId : userIds){
            boolean isOnline = false;
            if(isStore && ImServerConfig.ON.equals(imServerConfig.getIsCluster())){
                isOnline = messageHelper.isOnline(userId);
            }else{
                isOnline = ChatKit.isOnline(userId, isStore);
            }
            if(!isOnline){
                writeMessage(pushTable, GROUP+":"+group_id+":"+userId, chatBody);
            }
        }*/
    }

    private void writeMessage(String timelineTable , String timelineId , ChatBody chatBody){
        MessageHelper messageHelper = imServerConfig.getMessageHelper();
        messageHelper.writeMessage(timelineTable, timelineId, chatBody);
    }
}
