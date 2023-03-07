/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').truncate()
  await knex('products').insert([
    {
      ref: "REF-45842",
      label: 'Product 01',
      prix: 250
    }
  ]);
};
