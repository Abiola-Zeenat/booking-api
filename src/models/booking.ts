import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';
import Property from './property';
import { BookingAttributes, BookingCreationAttributes } from '../interfaces/booking';


class Booking extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes {
  public id!: number;
  public property_id!: number;
  public user_name!: string;
  public start_date!: Date;
  public end_date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Booking.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });
  }
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings',
  }
);

export default Booking;
