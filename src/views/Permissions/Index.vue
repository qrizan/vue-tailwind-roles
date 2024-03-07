<template>
    <div class="overflow-x-auto">
        <div class="flex justify-between items-center pt-2 mb-3 text-gray-600">
            <div class="width-1/4">
                <InputSearch @searchQuery="searchQuery" v-model="keyword" />
            </div>
        </div>

        <table class="table-auto min-w-full border divide-y divide-gray-200 w-full">
            <thead class="bg-gray-50 table-auto">
                <tr>
                    <th class="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-1/6">
                        No
                    </th>
                    <th class="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Permissions
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 ">
                <tr v-if="permissions.length == 0">
                    <td colspan="2">
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative m-5" role="alert">
                            <span class="block sm:inline">Data not found</span>
                        </div>
                    </td>
                </tr>
                <tr v-else v-for="(permission, index) in permissions" :key="index">
                    <td class="px-3 py-4 text-sm text-gray-500">
                        {{ ++index + (currentPage - 1) * perPage }}
                    </td>
                    <td class="px-3 py-2 text-sm text-gray-500">{{ permission.name }}</td>
                </tr>

            </tbody>
        </table>
        <pagination v-model="currentPage" :records="total" :per-page="perPage" @paginate="fetchDatapermissions" />
    </div>
    
</template>

<script>
import { ref, onMounted } from 'vue';
import { useToast } from "vue-toastification"
import Cookies from "js-cookie";

import InputSearch from "../../components/InputSearch.vue";

import api from '../../api/Api';

export default {
    name: 'PermissionIndexComponent',

    setup() {
        const token = Cookies.get('token')
        const toast = useToast()

        const permissions = ref([]);
        const currentPage = ref(0)
        const perPage = ref(0)
        const total = ref(0)
        const keyword = ref('')

        const errors = ref([]);

        onMounted(() => {
            fetchDatapermissions();
        });

        const fetchDatapermissions = async (pageNumber = 1) => {
            try {
                const page = pageNumber ? pageNumber : currentPage;
                const response = await api.get(`/api/admin/permissions?search=${keyword.value}&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    permissions.value = response.data.data.data
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

        const searchQuery = () => {
            fetchDatapermissions();
        }

        return {
            permissions,
            currentPage,
            perPage,
            total,
            keyword,
            fetchDatapermissions,
            searchQuery
        }
    },
    components: {
        InputSearch,
    }
}
</script>
