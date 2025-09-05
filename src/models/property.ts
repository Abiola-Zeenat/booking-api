import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Booking } from "./booking";

@Table({
  tableName: "properties",
  timestamps: true,
})
export class Property extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price_per_night!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  available_from!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  available_to!: Date;

  @HasMany(() => Booking)
  bookings!: Booking[];
}

