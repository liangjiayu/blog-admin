import { Service } from 'egg';

export default class DictionaryItem extends Service {
  public async addDictItem(params) {
    const { name, value, description, dictId } = params;

    const dictItem = this.ctx.model.DictionaryItem.create({
      name,
      value,
      description,
      dictId: Number(dictId),
    });

    return dictItem;
  }

  public async updateDictItem(params) {
    const dictItemId = Number(params.dictItemId);

    const dictItem = await this.ctx.model.DictionaryItem.findByPk(dictItemId);
    if (!dictItem) {
      throw new Error('暂无该字典子项');
    }

    const content = {
      name: params.name,
      value: params.value,
      description: params.description,
    };

    await dictItem.update(content);

    return dictItem;
  }

  public async delDictItemById(dictItemId) {
    const _dictItemId = Number(dictItemId);

    const dictItem = await this.ctx.model.DictionaryItem.findByPk(_dictItemId);

    if (!dictItem) {
      throw new Error('暂无该字典子项');
    }
    await dictItem.destroy();

    return true;
  }

  public async getAllDictItem(params) {
    const { ctx, app } = this;

    const whereOp: any = {};

    if (params.dictId) {
      whereOp.dictId = params.dictId;
    }

    const dictItemList = await ctx.model.DictionaryItem.findAll({
      where: whereOp,
    });

    return dictItemList;
  }
}
