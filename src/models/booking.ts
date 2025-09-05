import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Property } from "./property";

@Table({
  tableName: "bookings",
  timestamps: true,
})
export class Booking extends Model {
  @ForeignKey(() => Property)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  property_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date!: Date;

  @BelongsTo(() => Property)
  property!: Property;
}

