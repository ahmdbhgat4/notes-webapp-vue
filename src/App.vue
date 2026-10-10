<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppModal from '@/components/AppModal.vue';
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css';
</script>

<template>
    <!-- top -->
    <AppHeader />

    <RouterView />

    <!-- modal -->
    <AppModal />

    <Toaster richColors position="bottom-right" theme="system" :expand="true" closeButton />
</template>
