
export async function up(knex){
    await knex.schema.createTable('products',tbl=>{
        tbl.increments();
        tbl.text('ref',256).notNullable;
        tbl.text('label',256).notNullable;
        tbl.float('prix').notNullable;
    })
}


export async function down(knex){
    await knex.schema.dropTableIfExists('products')
};

