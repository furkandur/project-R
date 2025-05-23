import gql from "graphql-tag";

const schema = gql`
  type Mutation {
    "Mutation to create a new Location"
    createLocation(
      "Location name"
      name: String!
      "Location description"
      description: String!
      "Location open days"
      openDays: [OpenDayInput!]!
    ): Location
  }

  type Query {
    "Query to get all Locations"
    locations: [Location!]!
    "Query to get Location by ID"
    location(id: ID!): Location
  }

  "Location model"
  type Location {
    "Location ID"
    id: ID!
    "Location name"
    name: String!
    "Location description"
    description: String!
    "Location open days"
    openDays: [OpenDay!]!
    "Location created date"
    createdAt: String!
    "Location created by"
    createdBy: ID!
  }

  "Open day model"
  type OpenDay {
    "Open day name"
    day: String!
    "Open day start hour"
    startHour: String!
    "Open day end hour"
    endHour: String!
  }

  input OpenDayInput {
    day: String!
    startHour: String!
    endHour: String!
  }
`;

export default schema;
