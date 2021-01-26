import jwt = require('jsonwebtoken');
import { Context } from 'egg';

export default () => {
  return async function authToken(ctx: Context, next) {
    // return await next();
    const whiteList = [ '/api/user/login' ];
    if (whiteList.includes(ctx.url)) {
      return await next();
    }
    const secretKey = ctx.app.config.jwt.secretKey;
    let token = '';

    if (
      ctx.headers.authorization &&
      ctx.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = ctx.headers.authorization.split(' ')[1];
    } else if (ctx.query.accesstoken) {
      token = ctx.query.accesstoken;
    } else if (ctx.request.body.accesstoken) {
      token = ctx.request.body.accesstoken;
    }

    try {
      const tokenInfo = jwt.verify(token, secretKey);
      ctx.tokenInfo = tokenInfo;
      await next();
    } catch (error) {
      ctx.throw(401, error.message);
    }
  };
};
