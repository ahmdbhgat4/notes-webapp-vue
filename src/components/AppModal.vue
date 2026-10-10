<script setup>
import { useNotesStore } from '@/stores/notes';
import { toast } from 'vue-sonner';

const notesStore = useNotesStore();

const handleEdit = () => {
    toast.promise(notesStore.handleEdit, {
        loading: 'Modifing...',
        success: () => 'Note modified!',
        error: () => 'Unexpected error!',
    });
};
</script>

<template>
    <div class="ov" :class="{ on: notesStore.modalIsActive }" id="ov">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt">
            <h2 id="mt">Edit note</h2>
            <label for="et">Title</label>
            <input id="et" type="text" v-model="notesStore.editFormData.title" />
            <label for="eb">Note</label>
            <textarea id="eb" v-model="notesStore.editFormData.content"></textarea>
            <label for="eg">Tags, separated by commas</label>
            <input id="eg" type="text" v-model="notesStore.editFormData.tags" />
            <div class="foot">
                <button class="btn ghost" id="cancel" :disabled="notesStore.loading" @click="notesStore.toggleModal">
                    Cancel
                </button>
                <button class="btn" id="save" :disabled="notesStore.loading" @click="handleEdit">
                    {{ notesStore.loading ? 'Saving...' : 'Save changes' }}
                </button>
            </div>
        </div>
    </div>
</template>
