import { Controller } from 'egg';

export default class Dictionary extends Controller {
  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {});

    const dict = await this.service.dictionary.addDict(formData);

    return this.ctx.helper.resultOkData(dict);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      dictId: { required: true },
    });

    const dict = await this.service.dictionary.updateDict(formData);
    return this.ctx.helper.resultOkData(dict);
  }

  // public async detail() {}

  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      dictId: { required: true },
    });

    await this.service.dictionary.delDictById(formData.dictId);
    return this.ctx.helper.resultOkData();
  }

  public async list() {
    const { ctx } = this;
    const formData = ctx.request.body;

    const result = await this.service.dictionary.getDictList(formData);
    return this.ctx.helper.resultOkData(result);
  }
}
