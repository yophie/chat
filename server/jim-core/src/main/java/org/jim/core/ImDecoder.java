/**
 * 
 */
package org.jim.core;

import org.jim.core.exception.ImDecodeException;
import org.tio.core.ChannelContext;

import java.nio.ByteBuffer;
/**
 * 版本: [1.0]
 * 功能说明: 
 *  创建时间: 7月27日 下午5:25:13
 */
public interface ImDecoder {
	
	 ImPacket decode(ByteBuffer buffer, ChannelContext channelContext) throws ImDecodeException;
}
