const { promisify } = require('util');
const db = require('../../database');
const { NotFound } = require('../erros');

class Services {
  #dbRun = promisify(db.run).bind(db);
  #dbGet = promisify(db.get).bind(db);
  #dbAll = promisify(db.all).bind(db);

  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRecords(columns = '*', where = {}) {
    const fields = Object.keys(where)
      .map((key) => `${key} = ?`)
      .join(', AND ');
    const values = Object.values(where);
    if (fields.length && values.length) {
      return this.#dbAll(
        `SELECT ${columns} FROM ${this.modelName} WHERE ${fields}`,
        values
      );
    }
    return this.#dbAll(`SELECT ${columns} FROM ${this.modelName}`);
  }

  async getOneRecord(columns = '*', where = {}) {
    const fields = Object.keys(where)
      .map((key) => `${key} = ?`)
      .join(', AND ');
    const values = Object.values(where);

    return this.#dbGet(
      `SELECT ${columns} FROM ${this.modelName} WHERE ${fields} LIMIT 1`,
      values
    );
  }

  async createRecord(data = {}) {
    const fields = Object.keys(data).join(', ');
    const values = Object.values(data);
    const expectedValues = Array(values.length).fill('?').join(', ');

    return this.#dbRun(
      `INSERT INTO ${this.modelName} (${fields}) 
        VALUES (${expectedValues})`,
      values
    );
  }

  async updateRecord(newData = {}, id = 0) {
    const row = await this.getOneRecord('*', { id });
    if (!row) {
      throw new NotFound(this.modelName);
    }
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
    const row = await this.getOneRecord('*', where);
    if (!row) {
      throw new NotFound(this.modelName);
    }
    const fields = Object.keys(where)
      .map((key) => `${key} = ?`)
      .join(' AND ');
    const values = Object.values(where);

    return this.#dbRun(`DELETE FROM ${this.modelName} WHERE ${fields}`, values);
  }
}

module.exports = Services;
