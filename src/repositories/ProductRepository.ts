import { PoolConnection } from "mysql2/promise";
import ProductEntity from "../entities/ProductEntity";

// Code convention
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
      // Nên xài param (?) khi query db để tránh lỗi SQL Injection "); SELECT * FROM products"
      const sql = `INSERT INTO products (name, price, category_id, factory_id) VALUES (?, ?, ?, ?)`;
      await this.dbClient.query(sql, [name, price, categoryId, factoryId]);
    } catch (err) {
      console.error("Create product failed!", err);
      //   throw err;
      throw new Error("CREATE_PRODUCT_ERR");
    }
  }

  public updateProduct(newProduct: ProductEntity) {}

  public async selectProducts(
    size: string = "10",
    page: string = "1"
  ): Promise<ProductEntity[]> {
    const offset = (parseInt(page) - 1) * parseInt(size); // page 1 => OFFSET - 0, page 2 => OFFSET = 10
    const sql = `
            SELECT 
            prod.id,
            prod.name,
            prod.price,
            cat.name AS category_name,
            fac.name AS factory_name,
            fac.address AS factory_address
        FROM
            products AS prod
                LEFT JOIN
            categories AS cat ON cat.id = prod.category_id
                LEFT JOIN
            factories AS fac ON fac.id = prod.factory_id
        LIMIT ${size} OFFSET ${offset}
    `;
    const result = await this.dbClient.query(sql);
    const products: Array<ProductEntity> = result[0] as any;
    return products;
  }

  public getDetailProduct(id: string) {}
}
