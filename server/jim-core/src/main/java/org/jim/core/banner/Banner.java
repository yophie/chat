package org.jim.core.banner;

import java.io.PrintStream;

public interface Banner {
    /**
     * 打印banner
     * @param out
     */
    void printBanner(PrintStream out);

    enum Mode {
        // 关闭
        OFF,
        // 控制台
        CONSOLE,
        // 日志文件
        LOG
    }

}