import { MongoDataSource } from "apollo-datasource-mongodb";
import Location, { ILocation, LocationDocument } from "./model";
import { handleError } from "../../utils/handleError";

export class LocationDatasource extends MongoDataSource<LocationDocument> {
  async getAll() {
    try {
      return await Location.find();
    } catch (error) {
      handleError(error);
    }
  }

  async create(newLocation: ILocation) {
    try {
      const location = await Location.create(newLocation);
      return location;
    } catch (error) {
      handleError(error);
    }
  }
}
