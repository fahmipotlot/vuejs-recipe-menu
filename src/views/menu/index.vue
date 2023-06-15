<script setup>
    import { ref, onMounted } from 'vue';
    import api from '../../api';

    const menus = ref([]);
    const q = ref("");
    const categories = ref([]);
    const category = ref("");
    const recipes = ref([]);
    const recipe = ref([]);

    const filter = async () => {
        let dataSearch = [];
        q?.value ? dataSearch.push(['q', q?.value]) : ''
        category?.value ? dataSearch.push(['category[]', category?.value]) : ''

        recipe.value.forEach(el => dataSearch.push(['recipes[]', el]));

        const params = new URLSearchParams(dataSearch);

        await api.get('menu', { params })
        .then(response => {
            menus.value = response.data
        });
    }

    const clearFilter = async () => {
        q.value = ""
        category.value = []
        recipe.value = []
        
        await api.get('menu')
        .then(response => {
            menus.value = response.data
        });
    }

    const fetchMenu = async () => {
        await api.get('menu')
        .then(response => {
            menus.value = response.data
        });
    }

    onMounted(async() => {
        fetchMenu();

        await api.get(`category`)
        .then(response => {
            categories.value = response.data
        });

        await api.get(`recipe`)
        .then(response => {
            recipes.value = response.data
        });
    });

    const deletemenu = async (id) => {
        await api.delete(`menu/${id}`)
        .then(() => {
            fetchMenu();
        })
    };
</script>

<template>
    <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
            <div class="col-md-12">
                <router-link :to="{ name: 'menu.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">Add menu</router-link>
                <div class="row mb-3">
                    <div class="col-md-3 mb-3">
                        <input type="text" v-model="q" class="form-control" placeholder="Search Name or description">
                    </div>
                    <div class="col-md-3 mb-3">
                        <select class="form-select" v-model="category">
                            <option selected value="">Filter Category</option>
                            <option v-for="(cat, index) in categories" :key="index" :value="cat.id">{{ cat.name }}</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        <select class="form-select" multiple v-model="recipe">
                            <option v-for="(recipe, index) in recipes" :key="index" :value="recipe.id">{{ recipe.name }}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <button @click="filter" class="btn btn-md btn-primary rounded-sm shadow border-0 me-2">Filter</button>
                        <button @click="clearFilter" class="btn btn-md btn-primary rounded-sm shadow border-0">ClearFilter</button>
                    </div>
                </div>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead class="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Recipes</th>
                                        <th scope="col">Image</th>
                                        <th scope="col" style="width:15%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="menus.length == 0">
                                        <td colspan="6" class="text-center">
                                            <div class="alert alert-danger mb-0">
                                                Data Not Found!
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-else v-for="(menu, index) in menus" :key="index">
                                        <td>{{ menu.name }}</td>
                                        <td>{{ menu.description }}</td>
                                        <td>
                                            <router-link :to="{ name: 'category.edit', params:{id: menu.category_id} }">{{ menu.category.name }}</router-link>
                                        </td>
                                        <td>
                                            <ul>
                                                <li v-for="(recipe, index) in menu.recipes" :key="index">
                                                    <router-link :to="{ name: 'recipe.edit', params:{id: recipe.id} }">{{ recipe.name }}</router-link>
                                                </li>
                                            </ul>
                                        </td>
                                        <td class="text-center">
                                            <img :src="menu.image_url" width="200" class="rounded-3"/>
                                        </td>
                                        <td class="text-center">
                                            <router-link :to="{ name: 'menu.edit', params:{id: menu.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                            <button @click.prevent="deletemenu(menu.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>