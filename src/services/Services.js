const { promisify } = require('util');
const db = require('../../database');

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  #dbRun = promisify(db.run).bind(db);
  #dbGet = promisify(db.get).bind(db);
  #dbAll = promisify(db.all).bind(db);

  async getAllRecords(where = {}) {
    const fields = Object.keys(where)
      .map((key) => `${key} = ?`)
      .join(', AND ');
    const values = Object.values(where);
    if (fields.length && values.length) {
      return this.#dbAll(
        `SELECT * FROM ${this.modelName} WHERE ${fields}`,
        values,
      );
    }
    return this.#dbAll(`SELECT * FROM ${this.modelName}`);
  }

  async getOneRecord(where = {}) {
    const fields = Object.keys(where)
      .map((key) => `${key} = ?`)
      .join(', AND ');
    const values = Object.values(where);

    return this.#dbGet(
      `SELECT * FROM ${this.modelName} WHERE ${fields} LIMIT 1`,
      values,
    );
  }

  async createRecord(data = {}) {
    const fields = Object.keys(data).join(', ');
    const values = Object.values(data);
    const expectedValues = Array(values.length).fill('?').join(', ');

    return this.#dbRun(
      `INSERT INTO ${this.modelName} (${fields}) 
        VALUES (${expectedValues})`,
      values,
    );
  }

  async updateRecord(newData = {}, id = 0) {
    const fields = Object.keys(newData)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(newData);

    return this.#dbRun(`UPDATE ${this.modelName} SET ${fields} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }

  async deleteRecord(where = {}) {
    const fields = Object.keys(where)
      .map((key) => `${key} = ?`)
      .join(' AND ');
    const values = Object.values(where);

    return this.#dbRun(`DELETE FROM ${this.modelName} WHERE ${fields}`, values);
  }
}

module.exports = Services;
