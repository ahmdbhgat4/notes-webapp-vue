<script setup>
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();
</script>

<template>
    <div class="meta">
        <span id="count">({{ notesStore.notes.items }}) note/s</span>
        <!-- <span>Sorted by last edited, newest first</span> -->
    </div>
</template>
