import { Service } from 'egg';

export default class Role extends Service {
  public async addRole(params) {
    const { roleCode, roleName } = params;

    const role = this.ctx.model.Role.create({
      roleCode,
      roleName,
    });

    return role;
  }

  public async updateRole(params) {
    const roleId = Number(params.roleId);

    const role = await this.ctx.model.Role.findByPk(roleId);
    if (!role) {
      throw new Error('暂无该角色');
    }

    const content = {
      roleCode: params.roleCode,
      roleName: params.roleName,
    };

    await role.update(content);

    return role;
  }

  public async delRoleById(roleId) {
    const _roleId = Number(roleId);

    const role = await this.ctx.model.Role.findByPk(_roleId);

    if (!role) {
      throw new Error('暂无该角色');
    }
    await role.destroy();

    return true;
  }

  public async getRoleList(params) {
    const query = {
      pageSize: Number(params.pageSize) || 10,
      pageNum: Number(params.pageNum) || 1,
    };

    const { count, rows } = await this.ctx.model.Role.findAndCountAll({
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
