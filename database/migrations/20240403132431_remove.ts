import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .alterTable('users', (table) => {
      table.dropColumn('active');
    })
    .alterTable('users', (table) => {
      table.boolean('active').defaultTo(false).notNullable();
    })
    .dropTable('auth');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('users');
  await knex.schema.dropSchemaIfExists('auth');
}
