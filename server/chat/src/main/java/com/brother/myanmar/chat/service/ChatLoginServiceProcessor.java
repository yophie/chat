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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class ChatLoginServiceProcessor extends AbstractProtocolCmdProcessor implements LoginCmdProcessor {

	private Logger logger = LoggerFactory.getLogger(ChatLoginServiceProcessor.class);

	public static final Map<String, User> tokenMap = new HashMap<>();

	private UserDao userdao = new UserDao();
	
	/**
	 * 根据用户名和密码获取用户
	 * @param loginReqBody
	 * @param imChannelContext
	 * @return
	 */
	public User getUser(LoginReqBody loginReqBody, ImChannelContext imChannelContext) {
		String text = loginReqBody.getUserId()+loginReqBody.getPassword();
		String key = ImConst.AUTH_KEY;
		String token = Md5.sign(text, key, CHARSET);
		User user = getUser(token);

		return user;
	}
	/**
	 * 根据token获取用户信息
	 * @param token
	 * @return
	 */
	public User getUser(String token) {
		//demo中用map，生产环境需要用cache
		User user = tokenMap.get(token);
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
			tokenMap.containsKey(loginReqBody.getToken());
			return new LoginRespBody(ImStatus.C10007, getUser(loginReqBody.getToken()), loginReqBody.getToken());
		}
		if(Objects.nonNull(loginReqBody.getUserId()) && Objects.nonNull(loginReqBody.getPassword())){
			com.brother.myanmar.chat.bean.User searchUser = new com.brother.myanmar.chat.bean.User();
			searchUser.setOpenId(loginReqBody.getUserId());
			searchUser.setPassword(Md5.sign(loginReqBody.getPassword(), ImConst.AUTH_KEY, CHARSET));

			com.brother.myanmar.chat.bean.User findUser = userdao.findUserByOpenId(searchUser);
			if(findUser == null){
				searchUser.setAccount(UUIDSessionIdGenerator.instance.sessionId(null));
				searchUser.setName("newUser");
				userdao.insert(searchUser);
				findUser = userdao.findUserByOpenId(searchUser);;
			} else if(searchUser.getPassword() != findUser.getPassword()){
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
			List<Friend> groups = userdao.findFriendByState(me);
			for(int i=0;i<groups.size();i++){
				builder.addGroup(Group.newBuilder().groupId(String.valueOf(groups.get(i).getFriendId())).
						name(groups.get(i).getFriendNick()).build());
			}

			User user = builder.build();
			String text = loginReqBody.getUserId()+loginReqBody.getPassword();
			String key = ImConst.AUTH_KEY;
			String token = Md5.sign(text, key, CHARSET);
			tokenMap.put(token, user);
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
