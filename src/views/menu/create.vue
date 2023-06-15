<script setup>
    import { ref, onMounted } from "vue";
    import { useRouter } from 'vue-router';
    import api from "../../api";

    const router = useRouter();
    const name = ref("");
    const description = ref("");
    const image = ref("");
    const category_id = ref("");
    const errors = ref([]);
    const categories = ref([]);
    const recipes = ref([]);
    const checkedRecipe = ref([]);

    const handleFileChange = (e) => {
        image.value = e.target.files[0];
    };

    onMounted(async () => {
        await api.get(`category`)
        .then(response => {
            categories.value = response.data
        });

        await api.get(`recipe`)
        .then(response => {
            recipes.value = response.data
        });
    })

    const storeMenu = async () => {
        let formData = new FormData();
        formData.append("image", image.value);
        formData.append("category_id", category_id.value);
        formData.append("name", name.value);
        formData.append("description", description.value);

        checkedRecipe.value.forEach(el => formData.append("recipe_id[]", el));

        await api.post('menu', formData)
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
                        <form @submit.prevent="storeMenu()">
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
                                    <option v-for="(cat, index) in categories" :key="index" :value="cat.id">{{ cat.name }}</option>
                                </select>
                                <div v-if="errors.stock" class="alert alert-danger mt-2">
                                    <span>{{ errors.stock[0] }}</span>
                                </div>
                            </div>                            
                            <div class="mb-3">
                                <label class="form-label fw-bold">Recipes</label>
                                <div v-for="(recipe, index) in recipes" :key="index">                                    
                                    <input type="checkbox" id="jack" :value="recipe.id" v-model="checkedRecipe" class="form-check-input">
                                    <label :for="recipe.id" style="margin-left: 5px;">{{ recipe.name }}</label>
                                </div>
                                <div>Checked names: {{ checkedRecipe }}</div>
                                <div v-if="errors.recipe_id" class="alert alert-danger mt-2">
                                    <span>{{ errors.recipe_id[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Image</label>
                                <input type="file" class="form-control" @change="handleFileChange($event)">
                                <div v-if="errors.image" class="alert alert-danger mt-2">
                                    <span>{{ errors.image[0] }}</span>
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