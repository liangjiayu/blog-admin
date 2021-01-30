import { Controller } from 'egg';

export default class DictionaryItem extends Controller {
  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      dictId: { required: true },
    });

    const dictItem = await this.service.dictionaryItem.addDictItem(formData);

    return this.ctx.helper.msgSuccess(dictItem);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      dictItemId: { required: true },
    });

    const dict = await this.service.dictionaryItem.updateDictItem(formData);
    return this.ctx.helper.msgSuccess(dict);
  }

  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      dictItemId: { required: true },
    });

    await this.service.dictionaryItem.delDictItemById(formData.dictItemId);
    return this.ctx.helper.msgSuccess();
  }

  public async all() {
    const { ctx } = this;
    const formData = ctx.request.body;

    const result = await this.service.dictionaryItem.getAllDictItem(formData);
    return this.ctx.helper.msgSuccess(result);
  }
}
