<template>
    <form @submit.prevent="storeRole()" v-if="checkPermission(['roles.create'])">
        <div class="py-2 w-1/2">
            <div class="py-2">
                <Input label="Name" name="name" type="text" placeholder="Enter Name" v-model="name" />
                <div v-if="errors.name" class="alertInput">
                    <span>{{ errors.name[0] }}</span>
                </div>
            </div>
        </div>

        <legend>Permissions</legend>
        <div class="p-4">
            <div v-for="(permission) in permissions">
                <input :key="Math.random()" type="checkbox" class="bg-gray-50 border-gray-300 
                        focus:ring-3 focus:ring-blue-300 h-4 w-4" :value=permission.name @change="handleCheckboxChange"
                    :id=permission.id />

                <label htmlFor={htmlFor} class="text-sm ml-3 font-medium text-gray-900">
                    {{ permission.name }}
                </label>
            </div>
            <div v-if="errors.permissions" class="alertInput">
                <span>{{ errors.permissions[0] }}</span>
            </div>
        </div>
        <div class="flex items-center justify-between pt-4">
            <div>
                <ButtonBack @back="handleBack" />

            </div>
            <div>
                <ButtonReset @reset="handleReset" />
                <ButtonSave />
            </div>
        </div>
    </form>
    <Forbidden  v-else/>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
import Cookies from "js-cookie";

import api from '../../api/Api';

import Input from "../../components/Input.vue";
import InputFile from "../../components/InputFile.vue";
import ButtonSave from "../../components/ButtonSave.vue";
import ButtonBack from "../../components/ButtonBack.vue";
import ButtonReset from "../../components/ButtonReset.vue";


export default {
    name: 'RolesCreateComponent',

    setup() {
        const token = Cookies.get('token')
        const router = useRouter()
        const toast = useToast()

        const permissions = ref([]);
        const permissionsData = ref([]);
        const name = ref("");
        const errors = ref([]);

        onMounted(async () => {
            fetchDataPermissions();
        })

        const fetchDataPermissions = async () => {
            try {
                const response = await api.get("/api/admin/permissions/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    permissions.value = response.data.data
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                errors.value = error.response.data;
            }
        }

        const handleCheckboxChange = (e) => {
            let data = permissionsData.value;
            if (data.some((name) => name === e.target.value)) {
                data = data.filter((name) => name !== e.target.value);
            } else {
                data.push(e.target.value);
            }
            permissionsData.value = data
        };

        const handleBack = () => {
            router.push({ path: "/roles" });
        }

        const handleReset = (e) => {
            e.preventDefault();

            name.value = "";
            permissionsData.value = []
            errors.value = [];
        }

        const storeRole = async () => {
            try {
                const response = await api.post("/api/admin/roles",
                    {
                        name: name.value,
                        permissions: permissionsData.value,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                if (response.data.success) {
                    router.push({ path: "/roles" });
                    toast.success(response.data.message);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error)
                errors.value = error.response.data;
            }
        };

        return {
            permissions,
            name,
            errors,
            storeRole,
            handleCheckboxChange,
            handleBack,
            handleReset
        }
    },
    components: {
        Input,
        InputFile,
        ButtonSave,
        ButtonBack,
        ButtonReset
    }
}
</script>
