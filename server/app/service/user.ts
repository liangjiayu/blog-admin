import jwt = require('jsonwebtoken');
import { Service } from 'egg';

export default class User extends Service {
  /**
   * 登录用户
   * @param params 前端入参
   */
  public async signIn(params) {
    const { username, password } = params;
    const user = await this.ctx.model.User.findOne({ where: { username } });
    const secretKey = this.app.config.jwt.secretKey;

    if (!user) {
      throw new Error('用户不存在');
    }
    if (user.password !== password) {
      throw new Error('密码不正确');
    }

    const token = jwt.sign(
      { userId: user.userId, roleId: user.roleId },
      secretKey,
      { expiresIn: 12 * 60 * 60 },
    );

    return { token };
  }

  public async addUser(params) {
    const { username, password, roleId } = params;

    const user = this.ctx.model.User.create({
      username,
      password,
      roleId: Number(roleId),
    });

    return user;
  }

  public async updateUser(params) {
    const userId = Number(params.userId);

    const user = await this.ctx.model.User.findByPk(userId);
    if (!user) {
      throw new Error('暂无该用户');
    }

    const content = {
      username: params.username,
      password: params.password,
      roleId: params.roleId,
    };

    await user.update(content);

    return user;
  }

  public async delUserById(userId) {
    const _userId = Number(userId);

    const user = await this.ctx.model.User.findByPk(_userId);

    if (!user) {
      throw new Error('暂无该用户');
    }
    await user.destroy();

    return true;
  }

  public async getUserList(params) {
    const query = {
      pageSize: Number(params.pageSize) || 10,
      pageNum: Number(params.pageNum) || 1,
    };

    const { count, rows } = await this.ctx.model.User.findAndCountAll({
      order: [[ 'updatedAt', 'DESC' ]],
      limit: query.pageSize,
      offset: (query.pageNum - 1) * query.pageSize,
    });

    return {
      rows,
      current: query.pageNum,
      size: query.pageSize,
      total: count,
    };
  }

  public async getInfoByToken() {
    const tokenInfo = this.ctx.tokenInfo;
    const user = await this.ctx.model.User.findByPk(tokenInfo.userId);
    const role = await this.ctx.model.Role.findByPk(tokenInfo.roleId);

    return {
      user,
      role,
    };
  }
}
