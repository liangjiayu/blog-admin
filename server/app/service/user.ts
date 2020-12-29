import { Service } from 'egg';

export default class User extends Service {
  /**
   * 添加用户
   * @param params 前端入参
   */
  public async addUser(params) {
    const { nickname, email, password } = params;

    const uesr = this.ctx.model.User.create({ nickname, email, password });

    return uesr;
  }

  /**
   * 登录用户
   * @param params 前端入参
   */
  public async signIn(params) {
    const { email, password } = params;
    const user = await this.ctx.model.User.findOne({ where: { email } });

    if (!user) {
      throw new Error('用户不存在');
    }
    if (user.password !== password) {
      throw new Error('密码不正确');
    }

    return user;
  }
}
