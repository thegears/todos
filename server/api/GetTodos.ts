import {
    JsonDatabase
} from "wio.db";

const db = new JsonDatabase({
    databasePath: "./tododb.json"
});

export default defineEventHandler(async (event) => {
    let { id } = await useBody(event);

    let todos = db.get(`${id}_todos`) || [];

    return {
        todos
    }
})