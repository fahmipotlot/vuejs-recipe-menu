<script setup>
    import { ref, onMounted } from 'vue';
    import api from '../../api';

    const categories = ref([]);
    const q = ref("");

    const filter = async () => {
        let dataSearch = [];
        q?.value ? dataSearch.push(['q', q?.value]) : ''
        const params = new URLSearchParams(dataSearch);
        
        await api.get('category', { params })
        .then(response => {
            categories.value = response.data
        });
    }

    const clearFilter = async () => {
        q.value = ""
        
        await api.get('category')
        .then(response => {
            categories.value = response.data
        });
    }

    const fetchDataCategory = async () => {
        await api.get('category')
        .then(response => {
            categories.value = response.data
        });
    }

    onMounted(() => {
        fetchDataCategory();
    });

    const deleteCategory = async (id) => {
        await api.delete(`category/${id}`)
        .then(() => {
            fetchDataCategory();
        })
    };
</script>

<template>
    <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
            <div class="col-md-12">
                <router-link :to="{ name: 'category.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">Add category</router-link>
                <div class="row mb-3">
                    <div class="col-md-3 mb-3"></div>
                    <div class="col-md-3 mb-3"></div>
                    <div class="col-md-3 mb-3">
                        <input type="text" v-model="q" class="form-control" placeholder="Search Name or description">
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
                                        <th scope="col" style="width:15%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="categories.length == 0">
                                        <td colspan="3" class="text-center">
                                            <div class="alert alert-danger mb-0">
                                                Data Not Found!
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-else v-for="(category, index) in categories" :key="index">
                                        <td>{{ category.name }}</td>
                                        <td>{{ category.description }}</td>
                                        <td class="text-center">
                                            <router-link :to="{ name: 'category.edit', params:{id: category.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                            <button @click.prevent="deleteCategory(category.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
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