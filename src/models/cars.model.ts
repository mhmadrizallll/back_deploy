import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  availableAt!: string;
  transmission!: "manual" | "automatic";
  available!: boolean;
  type!: string;
  year!: number;
  created_by!: string;
  updated_by!: string;
  deleted_by!: string;
  is_deleted!: boolean;
  restored_by!: string;
  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
