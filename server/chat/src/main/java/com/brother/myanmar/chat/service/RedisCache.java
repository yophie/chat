package com.brother.myanmar.chat.service;

import com.brother.myanmar.chat.bean.SuperUser;
import org.jim.core.cache.redis.RedisCacheManager;
import org.jim.core.packets.FriendSocietyReqBody;
import org.jim.core.packets.User;
import org.jim.core.utils.JsonKit;

import java.util.List;

public class RedisCache {

    private static final String TOKEN  = "normal_token";
    private static final String SUPERTOKEN  = "super_token";
    private static final String SOCIETY="society";
    private static final String SOCIETYHISTORY="society_history";

    static{
        RedisCacheManager.register(TOKEN, 60*60*24, Integer.MAX_VALUE);
        RedisCacheManager.register(SUPERTOKEN, 60*60, Integer.MAX_VALUE);
        RedisCacheManager.register(SOCIETY, Integer.MAX_VALUE, Integer.MAX_VALUE);
        RedisCacheManager.register(SOCIETYHISTORY, Integer.MAX_VALUE, Integer.MAX_VALUE);
    }

    public static void putToken(String key, User user){
        RedisCacheManager.getCache(TOKEN).put(key,user);
    }

    public static User getToken(String key){
        return RedisCacheManager.getCache(TOKEN).get(key, User.class);
    }

    public static void putSuperToken(String key, SuperUser user){
        RedisCacheManager.getCache(SUPERTOKEN).put(key,user);
    }

    public static SuperUser getSuperToken(String key){
        return RedisCacheManager.getCache(SUPERTOKEN).get(key, SuperUser.class);
    }

    public static void removeSuperToken(String key){
        RedisCacheManager.getCache(SUPERTOKEN).remove(key);
    }

    public static void putSociety(String timelineId, FriendSocietyReqBody societyBody) {
        double score = societyBody.getCreateTime();
        RedisCacheManager.getCache(SOCIETY).sortSetPush(timelineId, score, societyBody);
    }

    public static void putSocietyHistory(String timelineId, FriendSocietyReqBody societyBody) {
        double score = societyBody.getCreateTime();
        RedisCacheManager.getCache(SOCIETYHISTORY).sortSetPush(timelineId, score, societyBody);
    }

    public static List<FriendSocietyReqBody> getSociety(String timelineId){
        List<String> messageList = RedisCacheManager.getCache(SOCIETY).sortSetGetAll(timelineId);
        List<FriendSocietyReqBody> messageDataList = JsonKit.toArray(messageList, FriendSocietyReqBody.class);
        RedisCacheManager.getCache(SOCIETY).remove(timelineId);
        return messageDataList;
    }

    public static List<FriendSocietyReqBody> getSocietyHistory(String timelineId){
        List<String> messageList = RedisCacheManager.getCache(SOCIETYHISTORY).sortSetGetAll(timelineId);
        List<FriendSocietyReqBody> messageDataList = JsonKit.toArray(messageList, FriendSocietyReqBody.class);
        return messageDataList;
    }

}
