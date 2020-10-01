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

    public static String doGetJson(String url) {
        JSONObject jsonObject = null;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        // HTTP Get请求
        HttpGet httpGet = new HttpGet(url);
        String res = "";
        try {
            // 执行请求
            HttpResponse httpRes = httpClient.execute(httpGet);
            HttpEntity entity = httpRes.getEntity();
            if (entity != null) {
                res = EntityUtils.toString(entity);
            }
            logger.info("响应" + httpRes.getStatusLine());
            return res;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            try {
                httpClient.close();
            } catch (IOException e) {
                logger.error(e.getMessage(), e);
                return res;
            }
        }
        return res;
    }
}
