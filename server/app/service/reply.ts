import { Service } from 'egg';

export default class Reply extends Service {
  async addReply(params) {
    const row = await this.ctx.model.Reply.create(params);
    return row;
  }

  async getReplyById(id) {
    const _id = Number(id);
    const row = await this.ctx.model.Reply.findByPk(_id);

    if (!row) {
      throw new Error('暂无该回复');
    }

    return row;
  }

  async delByReplyId(id) {
    const _id = Number(id);
    const row = await this.ctx.model.Reply.findByPk(_id);
    if (!row) {
      throw new Error('暂无该回复');
    }
    await row.destroy();
    return true;
  }

  async updateReply(params) {
    const id = Number(params.id);

    const row = await this.ctx.model.Reply.findByPk(id);
    if (!row) {
      throw new Error('暂无该回复');
    }

    await row.update(params);

    return row;
  }

  async getReplyList() {
    const list = await this.ctx.model.Reply.findAll();

    return list;
  }
}
