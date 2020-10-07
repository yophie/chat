/**
 * 
 */
package org.jim.core.message;

import org.jim.core.ImConst;
import org.jim.core.config.ImConfig;

/**
 *
 */
public abstract class AbstractMessageHelper implements MessageHelper,ImConst {

	protected ImConfig imConfig;

	public ImConfig getImConfig() {
		return imConfig;
	}

	public void setImConfig(ImConfig imConfig) {
		this.imConfig = imConfig;
	}
}
