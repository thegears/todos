<template>
    <div class="mt-2 w-full  min-h-12 flex" :class="todo.isDid ? 'bg-green-400' : 'bg-gray-400'">
        <div class="w-10/12 text-gray-100 dark:text-gray-800 font-black p-2 text-xl break-words">
            <p :class="todo.isDid ? 'line-through' : ''" class="break-words text-center">{{todo.text}}</p>
        </div>
        <div class="w-2/12">
            <button @click="ChangeDid" class="h-full w-6/12 bg-yellow-400 hover:bg-yellow-500 dark:hover:bg-yellow-700 dark:bg-yellow-600">
                <CheckIcon class="h-6 w-6 text-gray-900" />
            </button>
            <button @click="Delete" class="h-full w-6/12 bg-red-400 hover:bg-red-500 dark:hover:bg-red-700 dark:bg-red-600">
                <TrashIcon class="h-6 w-6 text-gray-900" />
            </button>
        </div>
    </div>
</template>
<script>
import { CheckIcon, TrashIcon } from '@heroicons/vue/outline/index.js';

export default {
    props: ["todo"],
    components: { CheckIcon, TrashIcon },
    methods: {
        async ChangeDid() {
            await fetch("/api/ChangeDid", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: localStorage.getItem("id"),
                    index: this.todo.id
                })
            });

            this.todo.isDid = !this.todo.isDid;
        },
        async Delete() {
        	await fetch("/api/Delete", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: localStorage.getItem("id"),
                    index: this.todo.id
                })
            }).then(a => a.json()).then(a => {
            	location.reload();
            });
        }
    }
};
</script>