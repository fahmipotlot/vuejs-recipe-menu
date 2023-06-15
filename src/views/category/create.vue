<script setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router';
    import api from "../../api";

    const router = useRouter();
    const name = ref("");
    const description = ref("");
    const errors = ref([]);

    const storeCategory = async () => {
        let formData = new FormData();
        formData.append("name", name.value);
        formData.append("description", description.value);

        await api.post('category', formData)
        .then(() => {
            router.push({ path: "/category" });
        })
        .catch((error) => {
            errors.value = error.response.data.errors;
        });
    };
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeCategory()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <input type="text" class="form-control" v-model="name" placeholder="Name">
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    <span>{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Description</label>
                                <input type="text" class="form-control" v-model="description" placeholder="Description">
                                <div v-if="errors.description" class="alert alert-danger mt-2">
                                    <span>{{ errors.description[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>