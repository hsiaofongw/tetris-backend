export type MongoDBConnectionStringParameter = {
  username: string;
  password: string;
  defaultDatabaseName: string;
};

export function getConnectionString(
  parameter: MongoDBConnectionStringParameter,
) {
  return `mongodb+srv://${parameter.username}:${parameter.password}@serverlessinstance0.wqjq4.mongodb.net/${parameter.defaultDatabaseName}?retryWrites=true&w=majority`;
}
