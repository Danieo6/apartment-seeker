import { Database } from "sqlite3";
import { Offer } from "./interfaces/offer.interface";
import { SHA1 } from "crypto-js";

export class OfferService {
  private db: Database;

  constructor () {
    this.db = new Database('./data/database.db', (error) => {
      if (error) {
        throw error;
      }
    });

    this.db.serialize(() => {
      this.db.run(`CREATE TABLE IF NOT EXISTS offers (hash VARCHAR(40) PRIMARY KEY, title TEXT, url TEXT, createdAt DATETIME);`);
    });
  }

  async create(offer: Offer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO offers (hash, title, url, createdAt) VALUES (?, ?, ?, ?);`, [
        SHA1(offer.title).toString(),
        offer.title,
        offer.url,
        Date.now(),
      ], (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  async checkIfExists(hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT hash FROM offers WHERE hash = ?;', hash, (err, row) => {
        if (err) {
          reject(err);
        }

        resolve(!!row?.hash);
      });
    });
  }

  closeConnection(): void {
    this.db.close();
  }
}