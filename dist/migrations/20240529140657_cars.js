"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("cars");
    });
}
exports.down = down;
