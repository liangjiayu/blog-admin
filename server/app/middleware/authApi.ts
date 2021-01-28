import { Context } from 'egg';

export default (needPerm: any[] = []) => {
  return async function authApi(ctx: Context, next) {
    const roleId = ctx.tokenInfo.roleId;
    const role = await ctx.model.Role.findByPk(roleId);
    if (!role) {
      throw new Error('暂无角色');
    }
    const apiPerm = role.apiPerm || [];

    // 当前接口需要的权限是否满足当前用户的 apiPerm
    const FlagPerm = needPerm.every(item => {
      return apiPerm.includes(item);
    });

    if (!FlagPerm) {
      ctx.throw(401, '权限不足');
    }

    return await next();
  };
};
