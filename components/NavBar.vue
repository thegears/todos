<template>
    <div class="w-full flex flex-wrap divide-y divide-gray-800 dark:divide-gray-200">
        <div class="w-full flex justify-between items-center flex-wrap">
            <span class="ml-12 text-gray-800 dark:text-gray-100 text-6xl">TODOS</span>
            <button class="mr-12 p-2 flex justify-center items-center dark:bg-gray-800 bg-gray-100 rounded-full" @click="ChangeTheme">
                <SunIcon v-if="theme=='dark'" class="h-8 w-8 text-gray-200" />
                <MoonIcon v-else class="h-8 w-8 text-gray-800" />
            </button>          
        </div>
        <div class="w-full"> </div>
    </div>
</template>
<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/outline/index.js';
import { ref, onMounted } from 'vue';

const theme = ref();

onMounted(() => {
    theme.value = localStorage.getItem("theme");
});

function ChangeTheme() {
    if (localStorage.getItem("theme") == "dark") {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove('dark');
        theme.value = "light";
    } else {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add('dark');
        theme.value = "dark";
    };
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

span {
    font-family: 'Bebas Neue', cursive;
}
</style>