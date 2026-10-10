<script setup>
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();

const handleChange = (checked = false, tag = '') => {
    if (checked) {
        if (notesStore.filters.tags) {
            if (!notesStore.filters.tags.includes(tag)) {
                notesStore.filters.tags += ',' + tag;
            }
        } else {
            notesStore.filters.tags = tag;
        }
    } else {
        notesStore.filters.tags = notesStore.filters.tags
            .split(',')
            .filter(t => t !== tag)
            .join(',');
    }
};
</script>

<template>
    <aside aria-label="Search and filters">
        <h2>Find notes</h2>

        <label for="q">Search by title</label>
        <input id="q" type="search" placeholder="Type a title" v-model="notesStore.filters.search" />

        <span v-show="notesStore.availableTags.length" class="lbl">Tags</span>
        <div v-show="notesStore.availableTags.length" id="tagbox">
            <label v-for="tag in notesStore.availableTags" :key="tag" class="chk">
                <input
                    type="checkbox"
                    :value="tag"
                    :checked="notesStore.filters.tags.includes(tag)"
                    @change="e => handleChange(e.target.checked, tag)"
                />
                {{ tag }}
            </label>
        </div>

        <!-- <span class="lbl">Last edited</span>
        <div class="dates">
            <input type="date" aria-label="From" />
            <input type="date" aria-label="To" />
        </div> -->

        <p style="margin: 1rem 0 0">
            <button
                class="btn ghost sm"
                id="clear"
                :disabled="notesStore.loading"
                @click.prevent="notesStore.handleClearFilters"
            >
                Clear filters
            </button>
        </p>
    </aside>
</template>
