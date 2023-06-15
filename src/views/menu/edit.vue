<script setup>
    import { ref, onMounted } from "vue";
    import { useRouter, useRoute } from 'vue-router';
    import api from "../../api";

    const router = useRouter();
    const route = useRoute();
    const name = ref("");
    const description = ref("");
    const image = ref("");
    const category_id = ref("");
    const errors = ref([]);
    const categories = ref([]);

    onMounted( async () => {
        await api.get(`category`)
        .then(response => {
            categories.value = response.data
        });

        await api.get(`menu/${route.params.id}`)
        .then(response => {
            name.value = response.data.name
            description.value = response.data.description
            category_id.value = response.data.category_id
        });
    })

    const handleFileChange = (e) => {
        image.value = e.target.files[0];
    };

    const updateMenu = async () => {
        let formData = new FormData();
        formData.append("image", image.value);
        formData.append("category_id", category_id.value);
        formData.append("name", name.value);
        formData.append("description", description.value);
        formData.append("_method", "PUT");

        await api.post(`menu/${route.params.id}`, formData)
        .then(() => {
            router.push({ path: "/menu" });
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
                        <form @submit.prevent="updateMenu()">
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
                            <div class="mb-3">
                                <label class="form-label fw-bold">Category</label>
                                <select class="form-select" v-model="category_id">
                                    <option v-for="(cat, index) in categories" :key="index" :value="cat.id" :selected="cat.id == category_id">{{ cat.name }}</option>
                                </select>
                                <div v-if="errors.stock" class="alert alert-danger mt-2">
                                    <span>{{ errors.stock[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Image</label>
                                <input type="file" class="form-control" @change="handleFileChange($event)">
                                <div v-if="errors.image" class="alert alert-danger mt-2">
                                    <span>{{ errors.image[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>