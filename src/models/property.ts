// import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
// import { sequelize } from '../db/sequelize';
// import {Booking} from './booking';
// import { PropertyAttributes, PropertyCreationAttributes } from '../interfaces/property';


// export class Property extends Model<PropertyAttributes, PropertyCreationAttributes>
//   implements PropertyAttributes {
//   public id!: number;
//   public title!: string;
//   public description?: string;
//   public price_per_night!: number;
//   public available_from!: Date;
//   public available_to!: Date;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   static initModel(sequelize: Sequelize) {
//     Property.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//         },
//         title: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         description: DataTypes.TEXT,
//         price_per_night: {
//           type: DataTypes.DECIMAL(10, 2),
//           allowNull: false,
//         },
//         available_from: DataTypes.DATEONLY,
//         available_to: DataTypes.DATEONLY,
//       },
//       {
//         sequelize,
//         tableName: 'properties',
//         modelName: 'Property',
//       }
//     );
//   }

//   static associate(models: any) {
//     Property.hasMany(models.Booking, { foreignKey: 'property_id', as: 'bookings' });
//   }
//   };

// // export default Property;

// src/models/property.ts
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

