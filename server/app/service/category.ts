import { Service } from 'egg';

export default class Category extends Service {

  async addCategory(params) {
    const row = {
      key: params.key,
      name: params.name,
    };
    const cate = await this.ctx.model.Category.create(row);

    return cate;
  }


  async getCateById(id) {
    const _id = Number(id);
    const cate = await this.ctx.model.Category.findByPk(_id);

    if (!cate) {
      throw new Error('暂无该分类');
    }

    return cate;
  }

  async delCateById(id) {
    const _id = Number(id);
    const cate = await this.ctx.model.Category.findByPk(_id);
    if (!cate) {
      throw new Error('暂无该分类');
    }
    await cate.destroy();
    return true;
  }

  async updateCate(params) {
    const id = Number(params.id);

    const cate = await this.ctx.model.Category.findByPk(id);
    if (!cate) {
      throw new Error('暂无该分类');
    }

    const content = {
      key: params.key,
      name: params.name,
    };

    await cate.update(content);

    return cate;
  }

  async getCateList() {
    const list = await this.ctx.model.Category.findAll();

    return list;
  }
}
