import path from "path";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export const instance = new Sequelize({
  dialect: "sqlite",
  storage: path.join(process.cwd(), "database.db"),
});

export interface LOGRequestModel
  extends Model<
    InferAttributes<LOGRequestModel>,
    InferCreationAttributes<LOGRequestModel>
  > {
  id: CreationOptional<number>;
  group?: string;
  version: string;
  method: string;
  url: string;
  status: string;
  reqHeaders: string;
  reqContent?: Buffer | null;
  resHeaders?: string;
  resContent?: Buffer | null;
  error?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const logRepository = instance.define<LOGRequestModel>(
  "Requests",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    group: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      defaultValue: "common",
    },
    version: { type: DataTypes.CHAR(5), allowNull: false },
    method: { type: DataTypes.CHAR(10), allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: "pending",
    },
    reqHeaders: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "{}",
    },
    reqContent: { type: DataTypes.BLOB, allowNull: true },
    resHeaders: { type: DataTypes.STRING, allowNull: true },
    resContent: { type: DataTypes.BLOB, allowNull: true },
    error: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "log_requests",
    createdAt: true,
    updatedAt: true,
  }
);

//await logRepository.sync({ force: true });
