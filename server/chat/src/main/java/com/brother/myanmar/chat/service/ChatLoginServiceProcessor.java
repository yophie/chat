/**
 * 
 */
package com.brother.myanmar.chat.service;

import com.brother.myanmar.chat.bean.Friend;
import com.brother.myanmar.chat.dao.UserDao;
import org.jim.core.ImChannelContext;
import org.jim.core.ImConst;
import org.jim.core.ImStatus;
import org.jim.core.packets.*;
import org.jim.core.session.id.impl.UUIDSessionIdGenerator;
import org.jim.core.utils.Md5;
import org.jim.server.processor.login.LoginCmdProcessor;
import org.jim.server.protocol.AbstractProtocolCmdProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

public class ChatLoginServiceProcessor extends AbstractProtocolCmdProcessor implements LoginCmdProcessor {

	private Logger logger = LoggerFactory.getLogger(ChatLoginServiceProcessor.class);
	/**
	 * 根据token获取用户信息
	 * @param token
	 * @return
	 */
	public User getUser(String token) {
		User user = RedisCache.getToken(token);
		if(Objects.nonNull(user)){
			return user;
		}
		return null;
	}

	/**
	 * 登陆成功返回状态码:ImStatus.C10007
	 * 登录失败返回状态码:ImStatus.C10008
	 * 注意：只要返回非成功状态码(ImStatus.C10007),其他状态码均为失败,此时用户可以自定义返回状态码，定义返回前端失败信息
	 */
	@Override
	public LoginRespBody doLogin(LoginReqBody loginReqBody, ImChannelContext imChannelContext) {
		if(Objects.nonNull(loginReqBody.getToken())){
			User me = RedisCache.getToken(loginReqBody.getToken());
			if(me!=null) {
				return new LoginRespBody(ImStatus.C10007, me, loginReqBody.getToken());
			}
		}
		if(Objects.nonNull(loginReqBody.getUserId()) && Objects.nonNull(loginReqBody.getPassword())){
			com.brother.myanmar.chat.bean.User searchUser = new com.brother.myanmar.chat.bean.User();
			searchUser.setOpenId(loginReqBody.getUserId());
			searchUser.setPassword(Md5.sign(loginReqBody.getPassword(), ImConst.AUTH_KEY, CHARSET));

			com.brother.myanmar.chat.bean.User findUser = UserDao.findUserByOpenId(searchUser);
			if(findUser == null){
				searchUser.setAccount(UUIDSessionIdGenerator.instance.sessionId(null));
				searchUser.setName("newUser");
				UserDao.insert(searchUser);
				findUser = UserDao.findUserByOpenId(searchUser);;
			} else if(!searchUser.getPassword().equals(findUser.getPassword())){
				return LoginRespBody.failed();
			}
			User.Builder builder = User.newBuilder()
					.userId(String.valueOf(findUser.getId()))
					.nick(findUser.getName())
					.avatar(findUser.getAvatar())
					.status(UserStatusType.ONLINE.getStatus());

			Friend me = new Friend();
			me.setMyId(findUser.getId());
			me.setState(0);
			List<Friend> groups = UserDao.findFriendByState(me);
			for(int i=0;i<groups.size();i++){
				builder.addGroup(Group.newBuilder().groupId(String.valueOf(groups.get(i).getFriendId())).
						name(groups.get(i).getFriendNick()).build());
			}

			User user = builder.build();
			String text = loginReqBody.getUserId()+loginReqBody.getPassword()+System.currentTimeMillis();
			String key = ImConst.AUTH_KEY;
			String token = Md5.sign(text, key, CHARSET);
			RedisCache.putToken(token, user);
			return new LoginRespBody(ImStatus.C10007, user, token);
		}else {
			return LoginRespBody.failed();
		}
	}

	@Override
	public void onSuccess(User user, ImChannelContext channelContext) {
		//logger.info("登录成功回调方法");
	}

	@Override
	public void onFailed(ImChannelContext imChannelContext) {
		//logger.info("登录失败回调方法");
	}
}
