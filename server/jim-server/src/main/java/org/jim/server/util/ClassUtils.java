package org.jim.server.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.jim.core.http.UploadFile;

import cn.hutool.core.util.ClassUtil;
/**
 *
 * 7月26日 下午6:46:11
 */
public class ClassUtils {
	private static Logger log = LoggerFactory.getLogger(ClassUtils.class);

	/**
	 * 
	 *
	 */
	public ClassUtils() {
	}
	
	public static boolean isSimpleTypeOrArray(Class<?> clazz){
		return ClassUtil.isSimpleTypeOrArray(clazz) || clazz.isAssignableFrom(UploadFile.class);
	}
	
	

	/**
	 * @param args
	 *
	 */
	public static void main(String[] args) {
		log.info("");
	}
}
