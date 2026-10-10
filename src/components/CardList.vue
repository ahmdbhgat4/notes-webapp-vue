<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useNotesStore } from '@/stores/notes';
import CardItem from '@/components/CardItem.vue';

const timerId = ref(null);

const notesStore = useNotesStore();

const conditions = computed(() => ({
    isLoading: notesStore.loading,
    noMatch: !notesStore.notes.data.length && (notesStore.filters.search || notesStore.filters.tags.length),
    isEmpty: !notesStore.notes.data.length,
    loadError: notesStore.error,
}));

const handleFetch = () => {
    if (notesStore.notes.next) {
        notesStore.filters.page++;
        notesStore.handleFetch();
    }
};

const handleScroll = () => {
    clearTimeout(timerId.value);

    if (notesStore.loading) {
        return;
    }

    timerId.value = setTimeout(() => {
        const listRef = document?.querySelector('#list');
        if (typeof listRef === 'undefined') {
            return;
        }

        const { offsetTop, offsetHeight } = listRef;
        const bottom = offsetTop + offsetHeight;
        const scrollBottomLine = window.pageYOffset + window.innerHeight;

        if (scrollBottomLine > bottom) {
            handleFetch();
        }
    }, 100);
};

onMounted(() => {
    notesStore.handleFetch();
    window?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window?.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <div v-if="conditions.isLoading" class="list">
        <div v-for="i in 4" :key="i" class="sk"></div>
    </div>
    <!-- no match -->
    <div v-else-if="conditions.noMatch" class="state">
        <h3>No notes match</h3>
        <p>Try a different title, or clear the filters.</p>
        <button class="btn ghost" :disabled="notesStore.loading" @click="notesStore.handleClearFilters">
            Clear filters
        </button>
    </div>
    <!-- empty notes -->
    <div v-else-if="conditions.isEmpty" class="state">
        <h3>No notes yet</h3>
        <p>Write your first note in the form above.</p>
    </div>
    <!-- load error -->
    <div v-else-if="conditions.loadError" class="state">
        <h3>Couldn't load your notes</h3>
        <p>Something went wrong while reading saved data. Your notes are not lost.</p>
        <button class="btn" onclick="setV('normal')">Try again</button>
    </div>
    <!-- has result -->
    <TransitionGroup v-else name="list" class="list" id="list" tag="div" ref="">
        <CardItem v-for="note in notesStore.notes.data" :key="note.id" :data="note" />
    </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
    transition: all 200ms ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
