<template>
    <div class="overflow-x-auto" v-if="checkPermission(['roles.edit'])">
        <div class="flex justify-between items-center pt-2 mb-3 text-gray-600">
            <div class="width-1/4">
                <InputSearch @searchQuery="searchQuery" v-model="keyword" />
            </div>
            <router-link :to="{ name: 'roles.create' }"  v-if="checkPermission(['roles.create'])">
                <ButtonAdd />
            </router-link>
        </div>

        <table class="table-auto min-w-full border divide-y divide-gray-200 w-full">
            <thead class="bg-gray-50 table-auto">
                <tr>
                    <th class="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-10">
                        No
                    </th>
                    <th class="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Role Name
                    </th>
                    <th class="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Permissions
                    </th>
                    <th
                        class="px-3 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase w-1/6">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 ">
                <tr v-if="roles.length == 0">
                    <td colspan="4">
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative m-5"
                            role="alert">
                            <span class="block sm:inline">Data not found</span>
                        </div>
                    </td>
                </tr>
                <tr v-else v-for="(role, index) in roles" :key="index">
                    <td class="px-3 py-4 text-sm text-gray-500">
                        {{ ++index + (currentPage - 1) * perPage }}
                    </td>
                    <td class="px-3 py-2 text-sm text-gray-500">{{ role.name }}</td>
                    <td class="px-3 py-2 text-sm text-gray-500">
                        <span v-for="(permisssion, index) in role.permissions" :key="index" >                        
                            <Badge :name="permisssion.name"/>
                        </span>
                    </td>
                    <td class="px-3 py-2 text-sm text-gray-500 text-center">
                        <router-link 
                            v-if="checkPermission(['roles.edit'])"
                            :to="{ name: 'roles.edit', params: { id: role.id } }"
                            class="px-3 py-1 text-sm bg-white text-green-600 hover:text-green-800">Edit
                        </router-link>
                        <button 
                            v-if="checkPermission(['roles.delete'])"
                            @click="confirmDelete(role.id)"
                            class="text-sm  bg-white text-red-400 hover:text-red-600">
                            Delete
                        </button>
                    </td>
                </tr>

            </tbody>
        </table>
        <pagination v-model="currentPage" :records="total" :per-page="perPage" @paginate="fetchDataRoles" />
        <ModalConfirm @delete="deleteRole" @close="isOpen = !isOpen" :open="isOpen" :id=roleId />
    </div>

    <Forbidden  v-else/>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useToast } from "vue-toastification"
import Cookies from "js-cookie";

import api from '../../api/Api';

import ModalConfirm from "../../components/ModalConfirm.vue";
import InputSearch from "../../components/InputSearch.vue";
import ButtonAdd from "../../components/ButtonAdd.vue";
import Badge from "../../components/Badge.vue";

export default {
    name: 'RoleIndexComponent',

    setup() {
        const token = Cookies.get('token')
        const toast = useToast()

        const roles = ref([]);
        const currentPage = ref(0)
        const perPage = ref(0)
        const total = ref(0)
        const keyword = ref('')
        const roleId = ref(0)
        const isOpen = ref(false);
        const errors = ref([]);

        onMounted(() => {
            fetchDataRoles();
        });

        const fetchDataRoles = async (pageNumber = 1) => {
            try {
                const page = pageNumber ? pageNumber : currentPage;
                const response = await api.get(`/api/admin/roles?search=${keyword.value}&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    roles.value = response.data.data.data
                    currentPage.value = response.data.data.current_page
                    perPage.value = response.data.data.per_page
                    total.value = response.data.data.total
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const confirmDelete = (id) => {
            roleId.value = id
            isOpen.value = true
        }

        const searchQuery = () => {
            fetchDataRoles();
        }

        const deleteRole = async (id) => {
            isOpen.value = false
            try {
                const response = await api.delete(`/api/admin/roles/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    toast.success(response.data.message);
                    fetchDataRoles(currentPage.value);

                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                errors.value = error.response.data;
            }
        }

        return {
            roles,
            currentPage,
            perPage,
            total,
            roleId,
            keyword,
            isOpen,
            fetchDataRoles,
            searchQuery,
            confirmDelete,
            deleteRole,
        }
    },
    components: {
        ModalConfirm,
        InputSearch,
        ButtonAdd,
        Badge
    }
}
</script>
