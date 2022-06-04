import {
    JsonDatabase
} from "wio.db";

const db = new JsonDatabase({
    databasePath: "./tododb.json"
});

export default defineEventHandler(async (event) => {
    let { id, index } = await useBody(event);

    let todos = db.get(`${id}_todos`) || [];

    todos = todos.filter(t => t.id != index);

    db.set(`${id}_todos`,todos);

    return {
        s: "400"
    }
})