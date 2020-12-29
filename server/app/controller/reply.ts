import { Controller } from 'egg';

export default class Reply extends Controller {
  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      nickname: { type: 'string', required: true },
      email: { type: 'email', required: true },
      content: { type: 'string', required: true },
      commentId: { type: 'string', required: true },
    });

    const row = await this.service.reply.addReply(formData);

    return this.ctx.helper.msgSuccess(row);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    const row = await this.service.reply.updateReply(formData);
    return this.ctx.helper.msgSuccess(row);
  }

  public async detail() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    const row = await this.service.reply.getReplyById(formData.id);

    return this.ctx.helper.msgSuccess(row);
  }

  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    await this.service.reply.delByReplyId(formData.id);
    return this.ctx.helper.msgSuccess();
  }


  public async list() {
    const rows = await this.service.reply.getReplyList();

    return this.ctx.helper.msgSuccess(rows);
  }
}
