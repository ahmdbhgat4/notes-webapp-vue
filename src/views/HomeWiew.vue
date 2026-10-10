<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import AddForm from '@/components/AddForm.vue';
import MetaInfo from '@/components/MetaInfo.vue';
import CardList from '@/components/CardList.vue';
import PaginationCtrl from '@/components/PaginationCtrl.vue';
</script>

<template>
    <!-- layout -->
    <div class="layout">
        <!-- sidebar -->
        <AppSidebar />

        <!-- main content -->
        <main>
            <!-- form (add note) -->
            <AddForm />
            <!-- meta info -->
            <MetaInfo />
            <!-- list (notes) -->
            <CardList />
            <!-- pagination -->
            <!-- <PaginationCtrl /> -->
        </main>
    </div>
</template>
