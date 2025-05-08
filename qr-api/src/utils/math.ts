import { create, all, ConfigOptions } from 'mathjs';

const config: ConfigOptions = {
  number: 'number',
  precision: 6,
  matrix: 'Array'
};

const math = create(all, config);

export { math };