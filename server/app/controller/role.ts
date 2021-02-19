import { Controller } from 'egg';

export default class RoleController extends Controller {
  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {});

    const role = await this.service.role.addRole(formData);

    return this.ctx.helper.msgSuccess(role);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      roleId: { required: true },
    });

    const user = await this.service.role.updateRole(formData);
    return this.ctx.helper.msgSuccess(user);
  }

  // public async detail() {}

  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      roleId: { required: true },
    });

    await this.service.role.delRoleById(formData.roleId);
    return this.ctx.helper.msgSuccess();
  }

  public async list() {
    const { ctx } = this;
    const formData = ctx.request.body;

    const result = await this.service.role.getRoleList(formData);
    return this.ctx.helper.msgSuccess(result);
  }

  public async all() {
    const result = await this.service.role.getAllRole();
    return this.ctx.helper.msgSuccess(result);
  }
}
