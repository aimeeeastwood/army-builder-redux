import db from './connection.ts';
export async function getAllFruits() {
    const fruit = await db('fruit').select();
    return fruit;
}
export async function getFruitById(id) {
    const fruit = await db('fruit').select().first().where({ id });
    return fruit;
}
export async function addFruit(data) {
    const [id] = await db('fruit').insert(data);
    return id;
}
