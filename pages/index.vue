<template>
    <div class="w-full justify-center flex flex-wrap">
        <div class="w-7/12 mt-24 sm:mt-12 md:mt-24">
            <input @keyup="filterTodos" type="text" class="dark:bg-gray-200 bg-gray-800 w-10/12 h-16 rounded-l-2xl text-center text-gray-200 dark:text-gray-800" placeholder="Search">
            <button @click="openModal" class="w-2/12 bg-blue-400 dark:bg-blue-600 h-16 rounded-r-2xl text-gray-200">New</button>
            <Todo v-for="t in filteredTodos" :todo="t" />
        </div>
        <div>
            <TransitionRoot appear :show="isOpen" as="template">
                <Dialog as="div" @close="closeModal" class="relative z-10">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>
                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel class="text-center w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-300 dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-800 dark:text-gray-200">
                                        New Todo
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            <input id="AddTodo" type="text" class="dark:bg-gray-200 bg-gray-800 w-full h-16 rounded-2xl text-center text-gray-200 dark:text-gray-800" placeholder="Todo">
                                        </p>
                                    </div>
                                    <div class="mt-4">
                                        <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" @click="closeModal">
                                            Add
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
        </div>
    </div>
</template>
<script>
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    TransitionRoot,
    TransitionChild
} from '@headlessui/vue';


export default {
    head: {
        title: "Todos"
    },
    components: {
        Dialog,
        DialogPanel,
        DialogTitle,
        DialogDescription,
        TransitionRoot,
        TransitionChild
    },
    data: () => ({
        todos: [],
        filteredTodos: [],
        isOpen: false
    }),
    async mounted() {
        await fetch("/api/GetTodos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: localStorage.getItem("id")
            })
        }).then(a => a.json()).then(a => {
            this.todos = a.todos;
            this.filteredTodos = a.todos;
        })
    },
    methods: {
        filterTodos(e) {
            this.filteredTodos = this.todos.filter(a => a.text.includes(e.target.value));
        },
        async closeModal() {
            this.isOpen = false;
            let todo = document.querySelector("#AddTodo").value;
            document.querySelector("#AddTodo").value = "";
            await fetch("/api/AddTodo", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: localStorage.getItem("id"),
                    todo
                })
            }).then(a => a.json()).then(a => {
                location.reload();
            })
        },
        openModal() {
            this.isOpen = true;
        }
    }
};
</script>