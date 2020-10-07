package org.jim.core.cache;

import java.io.Serializable;

/**
 *
 * @date 3月13日 下午7:47:28
 */
public interface IL2Cache {
	
	public void putL2Async(String key, Serializable value);
}
