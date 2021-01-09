import { IHelper } from 'egg';
import Schema from 'async-validator';

interface pageOption {
  tableName:string;
  sql: string;
  value: any[];
  pageSize: number;
  pageNum: number;
}

export default {
  /**
   * 处理成功，统一返回给客户端数据结构
   * @param this helper
   * @param data 实体
   * @param option 配置
   * @example {code:200,msg:'success',data:null}
   */
  msgSuccess(this: IHelper, data: any = null, option = {}) {
    const _option = {
      code: 200,
      msg: 'success',
      ...option,
    };
    this.ctx.status = _option.code;

    this.ctx.body = {
      code: _option.code,
      msg: _option.msg,
      data,
    };
  },

  /**
   *  处理异常，统一返回给客户端的数据结构
   * @param this helper
   * @param msg 信息
   * @param option 配置
   * @example {code:400,msg:'error',data:null}
   */
  msgError(this: IHelper, msg = '系统错误', option = {}) {
    const _option = {
      code: 400,
      data: null,
      ...option,
    };
    this.ctx.status = _option.code;
    this.ctx.body = {
      code: _option.code,
      data: _option.data,
      msg,
    };
  },

  /**
   * 验证参数方法
   * https://github.com/yiminghe/async-validator
   * @param this helper
   * @param data 参数
   * @param rules 规则
   * @param options 配置
   */
  async validate(this: IHelper, data = {}, rules = {}, options = {}) {
    const validate = new Schema(rules);
    await validate.validate(data, options, (errors, fields) => {
      if (errors) {
        this.ctx.throw(422, 'Validate Error', { errors, fields });
      }
    });
  },

  /**
   * 查询mysql是否插入成功
   * @param this helper
   * @param info mysql处理信息
   */
  checkMysqlInsert(this: IHelper, info) {
    if (info.affectedRows === 1) {
      return true;
    }
    return false;
  },

  /**
   * 查询mysql是否删除成功
   * @param this helper
   * @param info mysql处理信息
   */
  checkMysqlDelate(this: IHelper, info) {
    if (info.affectedRows === 1) {
      return true;
    }
    throw new Error('Mysql删除失败');
  },

  /**
   * 查询mysql是否更新成功
   * @param this helper
   * @param info mysql处理信息
   */
  checkMysqlUpdate(this: IHelper, info) {
    if (info.affectedRows === 1) {
      return true;
    }
    throw new Error('Mysql更新失败');
  },

  /**
   * 列表分页
   * @param this IHelper
   * @param option sql查询
   */
  async baseListPage(this: IHelper, option: pageOption) {
    const _option = {
      tableName: option.tableName || '',
      sql: option.sql || '',
      value: option.value || [],
      pageNum: Number(option.pageNum) || 1,
      pageSize: Number(option.pageSize) || 10,
    };

    const _sql = `${_option.sql} LIMIT ?,?`;
    const _sqlValue = [
      ..._option.value,
      (_option.pageNum - 1) * _option.pageSize,
      _option.pageSize,
    ];

    const result = {
      row: [],
      total: 0,
      current: _option.pageNum,
      size: _option.pageSize,
    };

    result.row = await this.app.mysql.query(_sql, _sqlValue);
    result.total = await this.app.mysql.count(_option.tableName);

    return result;
  },
};
