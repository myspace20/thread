import appRootPath from 'app-root-path';
import configs from '../../../config/default';
import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: configs.database.test_url,
  migrations: {
    directory: `${appRootPath.path}/database/migrations`,
  },
};

export default config;
