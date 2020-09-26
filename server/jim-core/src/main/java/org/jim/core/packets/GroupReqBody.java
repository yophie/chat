package org.jim.core.packets;

import java.util.List;

public class GroupReqBody extends Message {

    private static final long serialVersionUID = 5731474214655476287L;

    private String groupName;
    private String avatar;
    private List<Integer> friends;

    public List<Integer> getFriends() {
        return friends;
    }

    public GroupReqBody setFriends(List<Integer> friends) {
        this.friends = friends;
        return this;
    }

    public String getGroupName() {
        return groupName;
    }

    public GroupReqBody setGroupName(String groupName) {
        this.groupName = groupName;
        return this;
    }

    public String getAvatar() {
        return avatar;
    }

    public GroupReqBody setAvatar(String avatar) {
        this.avatar = avatar;
        return this;
    }
}
