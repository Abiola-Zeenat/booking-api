import { Optional } from "sequelize";

export interface PropertyAttributes {
  id: number;
  title: string;
  description?: string;
  price_per_night: number;
  available_from: Date;
  available_to: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PropertyCreationAttributes = Optional<
  PropertyAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface IPropertyQuery{
    page?: number;
    limit?: number;
    price?: number;
    available_from?: Date;
    available_to?: Date;
}