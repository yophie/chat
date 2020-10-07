package org.jim.core.exception;

/**
 * @ClassName ImException
 * @Description Im异常类
 *
 * @Date 2019/6/13 3:28
 * @Version 1.0
 **/
public class ImException extends Exception{

    /**
     *
     * @Description //TODO
     * @param
     * @return
     **/
    public ImException() {
    }

    /**
     *
     * @Description //TODO
     * @param message
     * @return
     **/
    public ImException(String message) {
        super(message);

    }

    /**
     *
     * @Description //TODO
     * @param message, cause
     * @return
     **/
    public ImException(String message, Throwable cause) {
        super(message, cause);

    }

    /**
     *
     * @Description //TODO
     * @param message, cause, enableSuppression, writableStackTrace
     * @return
     **/
    public ImException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);

    }

    /**
     *
     * @Description //TODO
     * @param cause
     * @return
     **/
    public ImException(Throwable cause) {
        super(cause);

    }
}
