import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';
import Booking from './booking';
import { PropertyAttributes, PropertyCreationAttributes } from '../interfaces/property';


class Property extends Model<PropertyAttributes, PropertyCreationAttributes>
  implements PropertyAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public price_per_night!: number;
  public available_from!: Date;
  public available_to!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Property.hasMany(Booking, { foreignKey: 'property_id', as: 'bookings' });
  }
}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price_per_night: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    available_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    available_to: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Property',
    tableName: 'Properties',
  }
);

export default Property;
