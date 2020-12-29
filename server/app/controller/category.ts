import { Controller } from 'egg';

export default class CategoryController extends Controller {
  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      key: { type: 'string', required: true },
      name: { type: 'string', required: true },
    });

    const cate = await this.service.category.addCategory(formData);

    return this.ctx.helper.msgSuccess(cate);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    const cate = await this.service.category.updateCate(formData);
    return this.ctx.helper.msgSuccess(cate);
  }

  public async detail() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    const cate = await this.service.category.getCateById(formData.id);

    return this.ctx.helper.msgSuccess(cate);
  }

  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    await this.service.category.delCateById(formData.id);
    return this.ctx.helper.msgSuccess();
  }

  /**
   * 获取文章列表
   */
  public async list() {
    const cateList = await this.service.category.getCateList();

    return this.ctx.helper.msgSuccess(cateList);
  }
}
