import { IHelper } from 'egg';
import Schema from 'async-validator';

export default {
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
   * 统一错误格式，返回给客户端
   * @param this helper
   * @param options 配置
   */
  resultError(
    this: IHelper,
    options: { status?: number; code?: number; msg?: string; data?: any } = {},
  ) {
    const _option = {
      status: 500, // http code
      code: 4000, // 业务code 4000-默认错误  1000-登录异常
      msg: '请求错误',
      success: false,
      data: null,
      ...options,
    };

    this.ctx.status = _option.status;
    this.ctx.body = {
      code: _option.code,
      msg: _option.msg,
      success: _option.success,
      data: _option.data,
    };
  },

  /**
   * 快捷返回错误信息
   * @param this helper
   * @param msg 信息
   */
  resultErrorMsg(this: IHelper, msg: string) {
    this.resultError({ msg });
  },

  /**
   * 统一成功格式，返回给客户端
   * @param this helper
   * @param options 配置
   */
  resultOk(
    this: IHelper,
    options: { code?: number; msg?: string; data?: any } = {},
  ) {
    const _option = {
      status: 200, // http code
      code: 2000, // 业务code 2000-默认成功  2001字段重复
      msg: '请求成功',
      success: true,
      data: null,
      ...options,
    };

    this.ctx.status = _option.status;
    this.ctx.body = {
      code: _option.code,
      msg: _option.msg,
      success: _option.success,
      data: _option.data,
    };
  },

  /**
   * 快速返回成功数据
   * @param this helper
   * @param data 主体
   */
  resultOkData(this: IHelper, data: any = null) {
    this.resultOk({ data });
  },
};
