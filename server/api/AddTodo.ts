import {
    JsonDatabase
} from "wio.db";

const db = new JsonDatabase({
    databasePath: "./tododb.json"
});

export default defineEventHandler(async (event) => {
    let { id, todo } = await useBody(event);

    let todos = db.get(`${id}_todos`) || [];

    todo = {
        text: todo,
        id: todos.length,
        isDid: false
    };

    db.push(`${id}_todos`,todo);

    return {
        s: "400"
    }
})