import { Controller } from 'egg';

export default class BaseController extends Controller {
  public async checkOnly() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      tableName: { type: 'string', required: true },
      fieldName: { type: 'string', required: true },
      fieldVal: { type: 'string', required: true },
    });

    const item = await this.app.model[formData.tableName].findOne({
      where: { [formData.fieldName]: formData.fieldVal },
    });

    if (item) {
      this.ctx.helper.msgError('该值不可用，系统中已存在！');
    } else {
      this.ctx.helper.msgSuccess();
    }
  }
}
