<script setup>
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();

const handlePaginate = (newPage = 0) => {
    notesStore.filters.page = newPage;
    notesStore.handleFetch();

    if (typeof scrollTo !== 'undefined') {
        scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
};
</script>

<template>
    <VueAwesomePaginate
        :total-items="notesStore.notes.items"
        :items-per-page="notesStore.filters.per_page"
        :max-pages-shown="5"
        v-model="notesStore.filters.page"
        @click="handlePaginate"
    />
</template>

<style>
.pagination-container {
    display: flex;
    justify-content: center;
    width: 100%;
    column-gap: 0.4rem;
}
.paginate-buttons {
    --size: 40px;
    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    border: 1px solid var(--line);
    background: var(--surface);
    padding: 0.25rem;
    border-radius: 0.6rem;
    cursor: pointer;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}
.paginate-buttons.number-buttons {
}
.paginate-buttons.back-button,
.paginate-buttons.next-button {
}

.paginate-buttons:hover {
    background-color: var(--bg);
}
.paginate-buttons.active-page {
    border-color: var(--accent);
    background-color: var(--accent);
    color: var(--accent-ink);
    cursor: auto;
}
.paginate-buttons:disabled,
.paginate-buttons.disabled {
    opacity: 0.5;
    /* pointer-events: none; */
    cursor: not-allowed;
}
</style>
