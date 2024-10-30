import { PoolConnection } from "mysql2/promise";

export default class ProductRepository {
  private dbClient: PoolConnection;

  constructor(dbClient: PoolConnection) {
    this.dbClient = dbClient;
  }

  public async createProduct(
    name: string,
    price: number,
    categoryId: number,
    factoryId: number
  ) {
    try {
      const sql = `INSERT INTO products (name, price, category_id, factory_id) VALUES (?, ?, ?, ?)`;
      await this.dbClient.query(sql, [name, price, categoryId, factoryId]);
    } catch (err) {
      console.error("Create product failed!", err);
      throw err;
    }
  }
}
