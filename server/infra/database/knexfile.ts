import appRootPath from 'app-root-path';
import configs from '../../../config/default';

const config: any = {
  client: 'pg',
  connection: configs.database.test_url,
  migrations: {
    directory: `${appRootPath.path}/database/migrations`,
  },
};

export default config;
