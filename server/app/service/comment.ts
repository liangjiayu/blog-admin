import { Service } from 'egg';

export default class Comment extends Service {
  /**
   * 增加一条评论
   * @param params 前端参数
   */
  async addComment(params) {
    const row = await this.ctx.model.Comment.create(params);
    return row;
  }

  /**
   * 查询评论详情
   * @param id id
   */
  async getCommentById(id) {
    const _id = Number(id);
    const row = await this.ctx.model.Comment.findByPk(_id);

    if (!row) {
      throw new Error('暂无该评论');
    }

    return row;
  }


  /**
   * 删除评论
   * @param id id
   */
  async delCommentById(id) {
    const _id = Number(id);
    const row = await this.ctx.model.Comment.findByPk(_id);
    if (!row) {
      throw new Error('暂无该评论');
    }
    await row.destroy();
    return true;
  }

  /**
   * 更新评论
   * @param params 前端参数
   */
  async updateComment(params) {
    const id = Number(params.id);

    const row = await this.ctx.model.Comment.findByPk(id);
    if (!row) {
      throw new Error('暂无该评论');
    }

    await row.update(params);

    return row;
  }

  /**
   * 获取评论列表
   */
  async getCommentList() {
    const list = await this.ctx.model.Comment.findAll();

    return list;
  }
}
