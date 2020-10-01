package com.brother.myanmar.chat.bean;

public class Bill {
    private Integer id;
    private Integer userId;
    private String userName;
    private String userAccount;
    private Double amount;
    private Integer state; // 0:applying 1:approved 2:reject
    private Long applyTime;
    private Long approvalTime;
    private Double fee;
    private Double approvalAmount;
    private Integer type; // 0:send packet 1:grab packet 2:cash in 3:cash out
    private Integer oppsite;
    private String oppsiteName;

    private Long startApplyTime;
    private Long endApplyTime;
    private Long startApprovalTime;
    private Long endApprovalTime;
    private Integer pageNo;
    private Integer pageSize;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Long getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(Long applyTime) {
        this.applyTime = applyTime;
    }

    public Long getApprovalTime() {
        return approvalTime;
    }

    public void setApprovalTime(Long approvalTime) {
        this.approvalTime = approvalTime;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public Double getApprovalAmount() {
        return approvalAmount;
    }

    public void setApprovalAmount(Double approvalAmount) {
        this.approvalAmount = approvalAmount;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getOppsite() {
        return oppsite;
    }

    public void setOppsite(Integer oppsite) {
        this.oppsite = oppsite;
    }

    public Long getStartApprovalTime() {
        return startApprovalTime;
    }

    public void setStartApprovalTime(Long startApprovalTime) {
        this.startApprovalTime = startApprovalTime;
    }

    public Long getEndApprovalTime() {
        return endApprovalTime;
    }

    public void setEndApprovalTime(Long endApprovalTime) {
        this.endApprovalTime = endApprovalTime;
    }

    public Long getStartApplyTime() {
        return startApplyTime;
    }

    public void setStartApplyTime(Long startApplyTime) {
        this.startApplyTime = startApplyTime;
    }

    public Long getEndApplyTime() {
        return endApplyTime;
    }

    public void setEndApplyTime(Long endApplyTime) {
        this.endApplyTime = endApplyTime;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getOppsiteName() {
        return oppsiteName;
    }

    public void setOppsiteName(String oppsiteName) {
        this.oppsiteName = oppsiteName;
    }
}
