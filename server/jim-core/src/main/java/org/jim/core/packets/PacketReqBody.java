package org.jim.core.packets;

public class PacketReqBody extends Message {

    private static final long serialVersionUID = 5731474214655476287L;
    private Integer type;
    private String packetId;
    private Integer reciver;

    public Integer getType() {
        return type;
    }

    public PacketReqBody setType(Integer type) {
        this.type = type;
        return this;
    }

    public String getPacketId() {
        return packetId;
    }

    public PacketReqBody setPacketId(String packetId) {
        this.packetId = packetId;
        return this;
    }

    public Integer getReciver() {
        return reciver;
    }

    public PacketReqBody setReciver(Integer reciver) {
        this.reciver = reciver;
        return this;
    }
}
