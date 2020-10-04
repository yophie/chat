package com.brother.myanmar.chat.handler;

import com.alibaba.fastjson.JSONObject;
import com.brother.myanmar.chat.bean.ChatWindow;
import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.bean.User;
import com.brother.myanmar.chat.dao.UserDao;
import com.brother.myanmar.chat.dao.WindowDao;
import com.brother.myanmar.chat.service.RedisCache;
import org.jim.core.ImStatus;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.server.protocol.http.annotation.RequestPath;
import org.jim.server.util.HttpResps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@RequestPath(value = "/api/chat")
public class ChatWindowController {

    private static Logger logger = LoggerFactory.getLogger(ChatWindowController.class);

    @RequestPath(value = "/list")
    public HttpResponse list(HttpRequest request) throws Exception {
        HttpResponse resp = TokenFilter.filter(request);
        if(resp != null) return resp;

        User chatWindowReqBody = new User();
        List<ChatWindow> windows = new ArrayList<ChatWindow>();
        Collection<String> keys = RedisCache.keys("store:user:"+request.getUserId());
        for (String s : keys) {
            try{
                String message = RedisCache.first(s);
                String[] ss = s.split("-");
                String userId = ss[1];
                ChatWindow window = new ChatWindow();
                window.setUserGroupId(Integer.parseInt(userId));
                window.setChatType(2);//私聊
                User user = UserDao.findUserById(window.getUserGroupId());
                window.setUserGroupName(user.getName());
                window.setUserGroupAvatar(user.getAvatar());
                window.setLastMessage(message);
                JSONObject jsonObject = JSONObject.parseObject(message);
                window.setLastTime(Long.parseLong(jsonObject.getString("createTime")));
                windows.add(window);
            }catch (Exception e){
                logger.error(e.getMessage(),e);
            }
        }

        keys = RedisCache.keys("store:user:*-"+request.getUserId());
        for (String s : keys) {
            try{
                String message = RedisCache.first(s);
                String[] ss = s.split("-");
                String[] ss1 = ss[0].split(":");
                String userId = ss1[2];
                ChatWindow window = new ChatWindow();
                window.setUserGroupId(Integer.parseInt(userId));
                window.setChatType(2);//私聊
                User user = UserDao.findUserById(window.getUserGroupId());
                window.setUserGroupName(user.getName());
                window.setUserGroupAvatar(user.getAvatar());
                window.setLastMessage(message);
                JSONObject jsonObject = JSONObject.parseObject(message);
                window.setLastTime(Long.parseLong(jsonObject.getString("createTime")));
                windows.add(window);
            }catch (Exception e){
                logger.error(e.getMessage(),e);
            }
        }

        keys = RedisCache.keys("store:group:*");
        for (String s : keys) {
            try{
                String[] ss = s.split(":");
                String groupId = ss[2];
                Friend friend = new Friend();
                friend.setMyId(request.getUserId());
                friend.setFriendId(Integer.parseInt(groupId));
                int isGroupMember = WindowDao.isGroupMember(friend);
                if(isGroupMember>0) {
                    String message = RedisCache.first(s);
                    ChatWindow window = new ChatWindow();
                    window.setUserGroupId(friend.getFriendId());
                    window.setChatType(1);//群聊
                    User user = UserDao.findUserById(window.getUserGroupId());
                    window.setUserGroupName(user.getName());
                    window.setUserGroupAvatar(user.getAvatar());
                    JSONObject jsonObject = JSONObject.parseObject(message);
                    user = UserDao.findUserById(Integer.parseInt(jsonObject.getString("from")));
                    window.setLastTime(Long.parseLong(jsonObject.getString("createTime")));
                    window.setLastName(user.getName());
                    window.setLastAvatar(user.getAvatar());
                    window.setLastMessage(message);
                    windows.add(window);
                }
            }catch (Exception e){
                logger.error(e.getMessage(),e);
            }
        }

        Collections.sort(windows, new SortByTime());

        ((User)chatWindowReqBody).setWindows(windows);
        chatWindowReqBody.setCode(ImStatus.C10023.getCode());
        chatWindowReqBody.setMsg(ImStatus.C10023.getMsg());
        return TokenFilter.crossOrigin(HttpResps.json(request, chatWindowReqBody));
    }

    class SortByTime implements Comparator {
        public int compare(Object o1, Object o2) {
            ChatWindow s1 = (ChatWindow) o1;
            ChatWindow s2 = (ChatWindow) o2;
            if (s1.getLastTime() < s2.getLastTime())
                return 1;
            return -1;
        }
    }
}
