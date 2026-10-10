import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useNotesStore = defineStore(
    'notes',
    () => {
        // state
        const notes = ref({ data: [], pages: 0, next: null, prev: null, first: 0, last: 0, items: 0 });
        const modalIsActive = ref(false);
        const loading = ref(false);
        const error = ref(null);
        const addFormData = reactive({ title: '', tags: '', content: '' });
        const editFormData = reactive({ id: '', title: '', tags: '', content: '' });
        const deletedNote = ref(null);
        const filters = reactive({ search: '', tags: '', page: 1, per_page: 6 });

        // getters
        const route = useRoute();
        const filteredNotes = computed(() => {
            let result = notes.value.data;
            if (filters.search.trim()) {
                result = result.filter(obj => obj.title.toLowerCase().includes(filters.search.trim().toLowerCase()));
            }
            if (filters.tags) {
                result = result.filter(obj => {
                    let exists = false;
                    filters.tags.split(',').forEach(filterTag => {
                        if (obj.tags.split(',').includes(filterTag.trim())) {
                            exists = true;
                        }
                    });

                    return exists;
                });
            }

            return result;
        });
        const availableTags = computed(() => {
            if (notes.value.data.length) {
                let tagsList = new Set();
                notes.value.data.forEach(noteObj =>
                    noteObj.tags.split(',').forEach(tag => {
                        if (tag.trim()) {
                            tagsList.add(tag.trim());
                        }
                    }),
                );
                return Array.from(tagsList);
            }

            return [];
        });

        // actions
        async function handleAdd() {
            loading.value = true;
            try {
                const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/notes`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: addFormData.title,
                        content: addFormData.content,
                        tags: addFormData.tags,
                        modified_at: Date.now(),
                    }),
                });

                if (res.ok) {
                    addFormData.title = '';
                    addFormData.tags = '';
                    addFormData.content = '';

                    // const data = await res.json();
                    // notes.value.data.push(data);
                    handleFetch();
                } else {
                    throw new Error();
                }
            } catch (err) {
                console.log(err);
                error.value = err;
            } finally {
                loading.value = false;
            }
        }
        async function handleEdit() {
            loading.value = true;
            try {
                const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/notes/${editFormData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: editFormData.title,
                        tags: editFormData.tags,
                        content: editFormData.content,
                        modified_at: Date.now(),
                    }),
                });

                if (res.ok) {
                    toggleModal();

                    // edit : come back to change notes[] not fetching everytime
                    notes.value.data = notes.value.data.map(obj => {
                        if (obj.id === editFormData.id) {
                            obj.title = editFormData.title;
                            obj.tags = editFormData.tags;
                            obj.content = editFormData.content;
                        }
                        return obj;
                    });

                    editFormData.id = '';
                    editFormData.title = '';
                    editFormData.tags = '';
                    editFormData.content = '';
                    // handleFetch();
                } else {
                    throw new Error();
                }
            } catch (err) {
                console.log(err);
                error.value = err;
            } finally {
                loading.value = false;
            }
        }
        async function handleDelete(noteId = '') {
            notes.value.data = notes.value.data.filter((obj, index) => {
                if (obj.id === noteId) {
                    deletedNote.value = { ...obj, oldIndex: index };
                    return false;
                }
                return true;
            });
        }
        async function finalDelete(noteId = '') {
            loading.value = true;
            try {
                const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/notes/${noteId}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    deletedNote.value = null;

                    // handleFetch();
                } else {
                    throw new Error();
                }
            } catch (err) {
                console.log(err);
                error.value = err;
            } finally {
                loading.value = false;
            }
        }
        function handleUndo() {
            if (!deletedNote.value) {
                return;
            }
            const { oldIndex, ...noteData } = deletedNote.value;
            notes.value.data.splice(oldIndex, 0, noteData);
        }
        async function handleFetch() {
            loading.value = true;
            try {
                let url = new URL(import.meta.env.VITE_APP_BASE_URL + route.fullPath);

                url.searchParams.set('_page', filters.page);
                url.searchParams.set('_per_page', filters.per_page);
                if (filters.search) {
                    url.searchParams.set('title:contains', filters.search);
                }
                // if (filters.tags) {
                //     url.searchParams.set('tags:contains', filters.tags);
                // }

                const res = await fetch(url);
                const data = await res.json(); // { data, pages, next, prev, first, last, items }
                Object.keys(data).forEach(key => {
                    if (key === 'data') {
                        data[key].forEach(obj => notes.value[key].push(obj));
                    } else {
                        notes.value[key] = data[key];
                    }
                });
            } catch (err) {
                console.log(err);
                error.value = err;
            } finally {
                loading.value = false;
            }
        }
        function handleClearFilters() {
            filters.search = '';
            filters.tags = '';
        }
        function toggleModal() {
            modalIsActive.value = !modalIsActive.value;
        }

        return {
            addFormData,
            editFormData,
            filters,
            notes,
            loading,
            error,
            modalIsActive,
            deletedNote,

            filteredNotes,
            availableTags,

            handleAdd,
            handleEdit,
            handleDelete,
            finalDelete,
            handleUndo,
            handleFetch,
            handleClearFilters,
            toggleModal,
        };
    },
    {
        persist: {
            pick: ['filters.search', 'filters.tags'],
            storage: sessionStorage,
            afterHydrate: ({ store }) => {
                // const router = useRouter();
                // router.push({
                //     query: {
                //         _where: JSON.stringify({
                //             and: [
                //                 { _page: store.filters.page },
                //                 { _per_page: store.filters.per_page },
                //                 { 'title:contains': store.filters.search },
                //                 { 'tags:in': store.filters.tags },
                //             ],
                //         }),
                //     },
                // });
            },
        },
    },
);
