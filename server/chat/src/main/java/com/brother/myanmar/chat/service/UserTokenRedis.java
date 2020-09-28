package com.brother.myanmar.chat.service;

import com.brother.myanmar.chat.bean.SuperUser;
import org.jim.core.cache.redis.RedisCacheManager;
import org.jim.core.packets.User;

public class UserTokenRedis {

    private static final String TOKEN  = "normal_token";
    private static final String SUPERTOKEN  = "super_token";
    static{
        RedisCacheManager.register(TOKEN, 60*60*24, Integer.MAX_VALUE);
        RedisCacheManager.register(SUPERTOKEN, 60*60, Integer.MAX_VALUE);
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

}
