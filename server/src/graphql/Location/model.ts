import mongoose, { Document, Schema } from "mongoose";

export enum Days {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

export interface ILocation {
  name: string;
  description: string;
  openDays: {
    day: Days;
    startHour: string;
    endHour: string;
  }[];
  createdAt?: Date;
  createdBy?: string;
}

export interface LocationDocument extends ILocation, Document {}

export const LocationSchema = new Schema<LocationDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  openDays: [
    {
      day: {
        type: String,
        enum: Object.values(Days),
        required: true,
      },
      startHour: {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
          },
        },
        message: (props: any) => `${props.value} is not a valid time format!`,
      },
      endHour: {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
          },
        },
        message: (props: any) => `${props.value} is not a valid time format!`,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Location = mongoose.model<LocationDocument>("Location", LocationSchema);

export default Location;
