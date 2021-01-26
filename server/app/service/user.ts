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

    const role = await this.ctx.model.Role.findByPk(user.roleId);

    const token = jwt.sign({ userId: user.userId, roleId: user.roleId }, secretKey);

    return {
      user,
      token,
      role,
    };
  }

  public async getUserById() {
    const _id = this.ctx.tokenInfo.id;
    const user = await this.ctx.model.User.findByPk(_id);
    return user;
  }

  public async addUser(params) {
    const { username, password, roleId } = params;

    const uesr = this.ctx.model.User.create({
      username,
      password,
      roleId: Number(roleId),
    });

    return uesr;
  }

  public async updateUser(params) {
    const userId = Number(params.userId);

    const uesr = await this.ctx.model.User.findByPk(userId);
    if (!uesr) {
      throw new Error('暂无该用户');
    }

    const content = {
      username: params.username,
      password: params.password,
      roleId: params.roleId,
    };

    await uesr.update(content);

    return uesr;
  }

  public async delUserById(userId) {
    const _userId = Number(userId);

    const uesr = await this.ctx.model.User.findByPk(_userId);

    if (!uesr) {
      throw new Error('暂无该用户');
    }
    await uesr.destroy();

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
}
