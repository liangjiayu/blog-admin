import { Service } from 'egg';

export default class Dictionary extends Service {
  public async addDict(params) {
    const { dictName, dictCode, description } = params;

    const dict = this.ctx.model.Dictionary.create({
      dictName,
      dictCode,
      description,
    });

    return dict;
  }

  public async updateDict(params) {
    const dictId = Number(params.dictId);

    const dict = await this.ctx.model.Dictionary.findByPk(dictId);
    if (!dict) {
      throw new Error('暂无该字典');
    }

    const content = {
      dictName: params.dictName,
      dictCode: params.dictCode,
      description: params.description,
    };

    await dict.update(content);

    return dict;
  }

  public async delDictById(dictId) {
    const _dictId = Number(dictId);

    const dict = await this.ctx.model.Dictionary.findByPk(_dictId);

    if (!dict) {
      throw new Error('暂无该字典');
    }
    await dict.destroy();

    return true;
  }

  public async getDictList(params) {
    const query = {
      pageSize: Number(params.pageSize) || 10,
      pageNum: Number(params.pageNum) || 1,
    };

    const { count, rows } = await this.ctx.model.Dictionary.findAndCountAll({
      // order: [[ 'updatedAt', 'DESC' ]],
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
