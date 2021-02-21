import { IHelper } from 'egg';
import Schema from 'async-validator';

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
    this.ctx.status = 200;

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
    this.ctx.status = 200;
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
};
