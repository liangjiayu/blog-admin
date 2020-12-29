import { Service } from 'egg';
import { Op } from 'sequelize';

export default class Article extends Service {
  /**
   * 添加一篇文章
   * @param params 前端参数
   */
  public async addArticle(params) {
    const row = {
      title: params.title,
      author: params.author,
      description: params.description,
      keyword: params.keyword,
      content: params.content,
      cover: params.cover,
    };

    const article = await this.ctx.model.Article.create(row);

    return article;
  }

  /**
   * 查询单条文章
   * @param id 文章id
   */
  public async getArticleById(id) {
    const _id = Number(id);
    const article = await this.ctx.model.Article.findByPk(_id);
    if (!article) {
      throw new Error('暂无该文章');
    }
    return article;
  }

  /**
   * 删除单条文章
   * @param id 文章id
   */
  public async delArticleById(id) {
    const _id = Number(id);
    const article = await this.ctx.model.Article.findByPk(_id);
    if (!article) {
      throw new Error('暂无该文章');
    }
    await article.destroy();
    return true;
  }

  /**
   * 查询文章列表
   * @param params 前端参数
   */
  public async getArticleList(params) {
    const query = {
      keyword: params.keyword,
      pageSize: Number(params.pageSize) || 10,
      pageNum: Number(params.pageNum) || 1,
    };

    const whereOp: any = {};

    if (query.keyword) {
      whereOp.keyword = {
        [Op.like]: `%${query.keyword}%`,
      };
    }

    const articleList = await this.ctx.model.Article.findAll({
      where: whereOp,
      limit: query.pageSize,
      offset: (query.pageNum - 1) * query.pageSize,
    });

    const count = await this.ctx.model.Article.count();

    return {
      rows: articleList,
      current: query.pageNum,
      size: query.pageSize,
      total: count,
    };
  }

  /**
   * 更新文章
   * @param params 前端参数
   */
  public async updateArticle(params) {
    const id = Number(params.id);

    const article = await this.ctx.model.Article.findByPk(id);
    if (!article) {
      throw new Error('暂无该文章');
    }

    const content = {
      title: params.title,
      author: params.author,
      description: params.description,
      keyword: params.keyword,
      content: params.content,
      cover: params.cover,
    };
    await article.update(content);

    return article;
  }
}
