import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 注册用户
   */
  public async register() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      nickname: { type: 'string', required: true, message: '用户名不能为空' },
      email: { type: 'email', required: true, message: '邮箱不能为空' },
      password: {
        validator: (rule, value, callback) => {
          if (!formData.password) {
            return new Error('密码不能空');
          }
          if (!formData.cpassword) {
            return new Error('确认密码不能空');
          }
          if (formData.password !== formData.cpassword) {
            return new Error('密码不一致');
          }
          return callback();
        },
      },
    });

    // 插入记录
    const uesr = await this.service.user.addUser(formData);

    this.ctx.helper.msgSuccess(uesr);
  }

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

    const user = await this.service.user.signIn(formData);

    this.ctx.helper.msgSuccess(user);
  }

  public async getInfo() {
    const user = await this.service.user.getUserById();

    this.ctx.helper.msgSuccess(user);
  }

  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {});

    const uesr = await this.service.user.addUser(formData);

    return this.ctx.helper.msgSuccess(uesr);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      userId: { required: true },
    });

    const uesr = await this.service.user.updateUser(formData);
    return this.ctx.helper.msgSuccess(uesr);
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
    return this.ctx.helper.msgSuccess();
  }

  public async list() {
    const { ctx } = this;
    const formData = ctx.request.body;

    const result = await this.service.user.getUserList(formData);
    return this.ctx.helper.msgSuccess(result);
  }
}
