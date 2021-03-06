import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 登录用户
   */
  public async login() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });

    const result = await this.service.user.signIn(formData);

    this.ctx.helper.resultOkData(result);
  }

  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {});

    const user = await this.service.user.addUser(formData);

    return this.ctx.helper.resultOkData(user);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      userId: { required: true },
    });

    const user = await this.service.user.updateUser(formData);
    return this.ctx.helper.resultOkData(user);
  }

  // public async detail() {}

  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      userId: { required: true },
    });

    await this.service.user.delUserById(formData.userId);
    return this.ctx.helper.resultOkData();
  }

  public async list() {
    const { ctx } = this;
    const formData = ctx.request.body;

    const result = await this.service.user.getUserList(formData);
    return this.ctx.helper.resultOkData(result);
  }

  public async getInfoByToken() {
    const result = await this.service.user.getInfoByToken();

    return this.ctx.helper.resultOkData(result);
  }
}
