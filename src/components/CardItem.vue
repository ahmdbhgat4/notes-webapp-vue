<script setup>
import { useNotesStore } from '@/stores/notes';
import { format } from 'date-fns';
import { toast } from 'vue-sonner';

const { data } = defineProps({ data: Object });
const notesStore = useNotesStore();

const formatDate = (date = '') => format(new Date(date), 'd MMM yyyy');

const handleEdit = () => {
    notesStore.editFormData.id = data.id;
    notesStore.editFormData.title = data.title;
    notesStore.editFormData.content = data.content;
    notesStore.editFormData.tags = data.tags;

    notesStore.toggleModal();
};

const handleDelete = (id = '') => {
    notesStore.handleDelete(id);
    toast('Note deleted!', {
        action: {
            label: 'Undo',
            onClick: () => notesStore.handleUndo(),
        },
        // onDismiss: t => console.log(`Toast with id ${t.id} has been dismissed`),
        onAutoClose: t => {
            toast.dismiss(t.id);
            toast.promise(notesStore.finalDelete(data.id), {
                loading: 'Deleting...',
                success: () => {
                    return 'Note deleted!';
                },
                error: () => {
                    return 'Unexpected error!';
                },
            });
        },
    });
    // ;
};
</script>

<template>
    <article class="note">
        <h3>{{ data.title }}</h3>
        <p>
            {{ data.content }}
        </p>
        <div class="tags">
            <span v-for="tag in data.tags.split(',')" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="ft">
            <span>Edited {{ formatDate(data.modified_at) }}</span>
            <span class="acts">
                <button class="btn ghost sm" data-e="1" :disabled="notesStore.loading" @click="handleEdit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16"
                        aria-label="edit"
                        title="edit"
                    >
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                        />
                    </svg>
                </button>
                <button class="btn del sm" data-d="1" :disabled="notesStore.loading" @click="handleDelete(data.id)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                        aria-label="delete"
                        title="delete"
                    >
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                        />
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                        />
                    </svg>
                </button>
            </span>
        </div>
    </article>
</template>
