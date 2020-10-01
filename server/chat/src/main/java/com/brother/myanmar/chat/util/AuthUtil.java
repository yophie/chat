package com.brother.myanmar.chat.util;


import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class AuthUtil {

    private static Logger logger = LoggerFactory.getLogger(AuthUtil.class);

    public static JSONObject doGetJson(String url) {
        JSONObject jsonObject = null;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        // HTTP Get请求
        HttpGet httpGet = new HttpGet(url);
        try {
            // 执行请求
            HttpResponse httpRes = httpClient.execute(httpGet);
            HttpEntity entity = httpRes.getEntity();
            if (entity != null) {
                String result = EntityUtils.toString(entity, "UTF-8");
                jsonObject =JSONObject.parseObject(result);
            }
            //logger.info("响应" + httpRes.getStatusLine());
            return jsonObject;
        } catch (Exception e) {
            //logger.error(e.getMessage(), e);
        } finally {
            try {
                httpClient.close();
            } catch (IOException e) {
                //logger.error(e.getMessage(), e);
                return jsonObject;
            }
        }
        return jsonObject;
    }

    public static void main(String[] args){
        System.out.println(doGetJson("http://localhost:8888/api/friend/apply?applyUser=22"));
    }
}
