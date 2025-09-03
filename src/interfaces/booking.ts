import { Optional } from "sequelize";

export interface BookingAttributes {
  id: number;
  property_id: number;
  user_name: string;
  start_date: Date;
  end_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}


export type BookingCreationAttributes = Optional<BookingAttributes, 'id' | 'createdAt' | 'updatedAt'>;
