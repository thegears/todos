<template>
    <Html>

    <Body class="dark:bg-gray-900 bg-gray-200">
        <NuxtLayout>
            <NavBar />
            <NuxtPage />
        </NuxtLayout>
    </Body>

    </Html>
</template>

<script setup>
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");
    if (!localStorage.getItem("id")) localStorage.setItem("id", Date.now());
    if (localStorage.getItem("theme") == "dark") document.documentElement.classList.add('dark');
});
</script>