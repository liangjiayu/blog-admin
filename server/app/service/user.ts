import jwt = require('jsonwebtoken');
import { Service } from 'egg';

export default class User extends Service {
  /**
   * 添加用户
   * @param params 前端入参
   */
  // public async addUser(params) {
  //   const { nickname, email, password } = params;

  //   const uesr = this.ctx.model.User.create({ nickname, email, password });

  //   return uesr;
  // }

  /**
   * 登录用户
   * @param params 前端入参
   */
  public async signIn(params) {
    const { email, password } = params;
    const user = await this.ctx.model.User.findOne({ where: { email } });
    const secretKey = this.app.config.jwt.secretKey;

    if (!user) {
      throw new Error('用户不存在');
    }
    if (user.password !== password) {
      throw new Error('密码不正确');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey);

    return {
      user,
      token,
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
