import { AsyncData } from '../../data';

const config = fozy.config;

const isEmptyData = function isEmptyData(obj) {
  return Object.keys(obj).length === 0;
};

export default class LocalMock {
  constructor() {
    this.defaultData = config.mock.api.defaultData;
  }
  getMocker() {
    this.mock = async (ctx, next) => {
      try {
        let data = await new AsyncData(ctx).getData();
        if (isEmptyData(data) && !this.defaultData) {
          return next();
        }
        if (this.defaultData) {
          data = this.defaultData;
        }

        ctx.body = data;
        ctx.type = 'json';
      } catch (err) {
        return next();
      }
      return null;
    };

    return this.mock;
  }
}
