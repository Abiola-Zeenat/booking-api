// import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
// import { sequelize } from '../db/sequelize';
// import { Property } from './property';
// import { BookingAttributes, BookingCreationAttributes } from '../interfaces/booking';


// export class Booking extends Model<BookingAttributes, BookingCreationAttributes>
//   implements BookingAttributes {
//   public id!: number;
//   public property_id!: number;
//   public user_name!: string;
//   public start_date!: Date;
//   public end_date!: Date;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   static initModel(sequelize: Sequelize) {
//     Booking.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     property_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     user_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     start_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     end_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'Booking',
//     tableName: 'Bookings',
//   }
// )};

//   static associate(models: any) {
//     Booking.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property' });
//   }
// }

  

// // export default Booking;


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

