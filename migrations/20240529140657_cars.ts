import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.string("id", 255).primary();
    table.string("plate", 255).notNullable();
    table.string("manufacture", 255).notNullable();
    table.string("model", 255).notNullable();
    table.string("image", 255).nullable();
    table.integer("rentPerDay").notNullable();
    table.integer("capacity").notNullable();
    table.text("description").nullable();
    table.string("availableAt", 255).notNullable();
    table.enum("transmission", ["manual", "automatic"]).notNullable();
    table.boolean("available").defaultTo(true).notNullable();
    table.string("type", 255).notNullable();
    table.integer("year").notNullable();
    table.string("created_by", 255).nullable();
    table.string("updated_by", 255).nullable();
    table.string("deleted_by", 255).nullable();
    table.boolean("is_deleted").defaultTo(false).notNullable();
    table.string("restored_by", 255).nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
