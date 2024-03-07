import appRootPath from 'app-root-path';
import configs from '../../../config/default';

const config: any = {
    development: {
        client: 'pg',
        connection: configs.database.test_url,
        migrations: {
            directory: `${appRootPath.path}/database/migrations`,
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: `${appRootPath.path}/database/migrations`,
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: `${appRootPath.path}/database/migrations`,
        },
    },
};

export default config;
