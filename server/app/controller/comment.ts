import { Controller } from 'egg';

export default class Comment extends Controller {
  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      nickname: { type: 'string', required: true },
      email: { type: 'email', required: true },
      content: { type: 'string', required: true },
      targetId: { type: 'string', required: true },
      targetType: { type: 'string', required: true },
    });

    const row = await this.service.comment.addComment(formData);

    return this.ctx.helper.msgSuccess(row);
  }

  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    const row = await this.service.comment.updateComment(formData);
    return this.ctx.helper.msgSuccess(row);
  }

  public async detail() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    const row = await this.service.comment.getCommentById(formData.id);

    return this.ctx.helper.msgSuccess(row);
  }

  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { type: 'string', required: true },
    });

    await this.service.comment.delCommentById(formData.id);
    return this.ctx.helper.msgSuccess();
  }


  public async list() {
    const rows = await this.service.comment.getCommentList();

    return this.ctx.helper.msgSuccess(rows);
  }
}
