package org.jim.core.http.handler;

import org.jim.core.exception.ImException;
import org.jim.core.http.HttpRequest;
import org.jim.core.http.HttpResponse;
import org.jim.core.http.RequestLine;

/**
 *
 *
 *
 */
public interface IHttpRequestHandler {
	/**
	 *
	 * @param packet
	 * @param requestLine
	 * @return
	 * @throws ImException
	 *
	 */
	public HttpResponse handler(HttpRequest packet, RequestLine requestLine) throws ImException;

	/**
	 *
	 * @param request
	 * @param requestLine
	 * @return
	 *
	 */
	public HttpResponse resp404(HttpRequest request, RequestLine requestLine);

	/**
	 *
	 * @param request
	 * @param requestLine
	 * @param throwable
	 * @return
	 *
	 */
	public HttpResponse resp500(HttpRequest request, RequestLine requestLine, java.lang.Throwable throwable);
	
	/**
	 * 清空静态资源缓存，如果没有缓存，可以不处理
	 * @param request
	 *
	 */
	public void clearStaticResCache(HttpRequest request);
}
