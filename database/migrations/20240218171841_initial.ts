import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('users', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('email', 50).notNullable().unique();
      table.string('display_name', 30).notNullable();
      table.string('password_hash', 30).notNullable();
      table.string('description', 80);
      table.string('image_url');
      table.enum('active', [true, false]).defaultTo(false).notNullable();
      table.enum('role', ['basic', 'moderator', 'admin']).defaultTo('basic').notNullable();
      table.boolean('profile_complete').defaultTo(false).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);
    })
    .createTable('auth', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.boolean('valid').defaultTo(false);
      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);
    })
    .createTable('threads', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title', 120).notNullable();
      table.string('text', 400).notNullable();
      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);
    })
    .createTable('posts', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('text', 400).notNullable();
      table.boolean('is_accepted').defaultTo(false);
      table.uuid('thread_id').references('threads.id').notNullable().onDelete('CASCADE');
      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);
    })
    .createTable('comments', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('text', 150).notNullable();
      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE');
      table.uuid('thread_id').references('threads.id').onDelete('CASCADE');
      table.uuid('post_id').references('posts.id').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);
    })
    .createTable('votes', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.enum('type', ['up', 'down']).notNullable();
      table.uuid('thread_id').references('threads.id').onDelete('CASCADE');
      table.uuid('post_id').references('posts.id').onDelete('CASCADE');
      table.uuid('user_id').references('users.id').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);
    })
    .createTable('tags', (table) => {
      table
        .uuid('id', { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name', 30).notNullable();
      table.string('description', 100).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(null);
    })
    .createTable('thread_tags', (table) => {
      table.uuid('thread_id').references('threads.id').notNullable().onDelete('CASCADE');
      table.uuid('tag_id').references('tags.id').notNullable().onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('users');
  await knex.schema.dropSchemaIfExists('auth');
  await knex.schema.dropSchemaIfExists('threads');
  await knex.schema.dropSchemaIfExists('posts');
  await knex.schema.dropSchemaIfExists('comments');
  await knex.schema.dropSchemaIfExists('votes');
  await knex.schema.dropSchemaIfExists('tags');
  await knex.schema.dropSchemaIfExists('thread_tags');
}
