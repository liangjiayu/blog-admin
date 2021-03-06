import { Context } from 'egg';

export default () => {
  return async function errorHandler(ctx: Context, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      // const message =
      //   status === 500 && ctx.app.config.env === "prod"
      //     ? "Internal Server Error"
      //     : err.message;

      // 验证器错误
      if (status === 422) {
        return ctx.helper.resultError({
          status,
          msg: err.message,
          data: err.errors,
        });
      }

      return ctx.helper.resultError({
        status,
        msg: err.message,
      });
    }
  };
};
