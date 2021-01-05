import { Controller } from 'egg';

export default class ArticleController extends Controller {
  /**
   * 新增文章
   */
  public async create() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      title: { type: 'string', required: true },
      author: { type: 'string', required: true },
      description: { type: 'string', required: true },
      keyword: { type: 'string', required: true },
      content: { type: 'string', required: true },
      cover: { type: 'string', required: true },
    });

    const article = await this.service.article.addArticle(formData);

    return this.ctx.helper.msgSuccess(article);
  }

  /**
   * 更新文章
   */
  public async update() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { required: true },
    });

    const article = await this.service.article.updateArticle(formData);
    return this.ctx.helper.msgSuccess(article);
  }

  /**
   * 获取文章详情
   */
  public async detail() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { required: true },
    });

    const article = await this.service.article.getArticleById(formData.id);

    return this.ctx.helper.msgSuccess(article);
  }

  /**
   * 删除单条文章
   */
  public async del() {
    const { ctx } = this;
    const formData = ctx.request.body;

    // 参数验证
    await this.ctx.helper.validate(formData, {
      id: { required: true },
    });

    await this.service.article.delArticleById(formData.id);
    return this.ctx.helper.msgSuccess();
  }

  /**
   * 获取文章列表
   */
  public async list() {
    const { ctx } = this;
    const formData = ctx.request.body;

    const result = await this.service.article.getArticleList(formData);
    return this.ctx.helper.msgSuccess(result);
  }
}
