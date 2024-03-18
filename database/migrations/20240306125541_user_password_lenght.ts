import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .alterTable('users', (table) => {
      table.dropColumn('password_hash');
    })
    .alterTable('users', (table) => {
      table.string('password_hash', 100).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {}
