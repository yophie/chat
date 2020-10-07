package org.jim.server.command;

import org.jim.core.ImChannelContext;
import org.jim.core.ImPacket;
import org.jim.core.exception.ImException;
import org.jim.core.packets.Command;
/**
 * 
 * 版本: [1.0]
 * 功能说明: 
 *  创建时间: 9月8日 下午4:29:38
 */
public interface CmdHandler
{
	/**
	 * 功能描述：[命令主键]
	 *  创建时间: 7月17日 下午2:31:51
	 * @return
	 */
	Command command();
	/**
	 * 处理Cmd命令
	 * @param imPacket
	 * @param imChannelContext
	 * @return
	 * @throws ImException
	 * @date 11月18日 下午1:08:45
	 */
	ImPacket handler(ImPacket imPacket, ImChannelContext imChannelContext)  throws ImException;
	
}
