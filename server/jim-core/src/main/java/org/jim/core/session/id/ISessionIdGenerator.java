package org.jim.core.session.id;

import org.jim.core.http.HttpConfig;

/**
 *
 * 8月15日 上午10:49:58
 */
public interface ISessionIdGenerator {

	/**
	 *
	 * @return
	 *
	 */
	String sessionId(HttpConfig httpConfig);

}
