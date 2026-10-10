<script setup>
import { useNotesStore } from '@/stores/notes';
import { toast } from 'vue-sonner';

const notesStore = useNotesStore();
const handleAdd = () => {
    toast.promise(notesStore.handleAdd, {
        loading: 'Adding...',
        success: () => {
            return 'Note added!';
        },
        error: () => {
            return 'Unexpected error!';
        },
    });
};
</script>

<template>
    <form class="add" onsubmit="return false;" @submit.prevent="handleAdd">
        <h2>New note</h2>
        <div class="r">
            <div>
                <label for="nt" style="margin-top: 0">Title</label>
                <input id="nt" type="text" placeholder="Give it a short title" v-model="notesStore.addFormData.title" />
            </div>
            <div>
                <label for="ng" style="margin-top: 0">Tags, separated by commas</label>
                <input id="ng" type="text" placeholder="work, ideas" v-model="notesStore.addFormData.tags" />
            </div>
        </div>
        <label for="nb">Note</label
        ><textarea id="nb" placeholder="Write something" v-model="notesStore.addFormData.content"></textarea>
        <div class="foot">
            <button class="btn" id="add">
                <svg
                    v-show="!notesStore.loading"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                    />
                </svg>

                {{ notesStore.loading ? 'Adding...' : 'Add note' }}
            </button>
        </div>
    </form>
</template>
