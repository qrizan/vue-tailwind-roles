<template>
    <form @submit.prevent="storeUser()" v-if="checkPermission(['users.create'])">
        <div class="flex">
            <div class="w-1/2 mr-8">
                
                <div class="py-2">
                    <Input label="Name" name="name" type="text" placeholder="Enter Name" v-model="name" />
                    <div v-if="errors.name" class="alertInput">
                        <span>{{ errors.name[0] }}</span>
                    </div>
                </div>

                <div class="my-2">
                    <Input label="Email" name="email" type="email" placeholder="Enter Email Address" v-model="email" />
                    <div v-if="errors.email" class="alertInput">
                        <span>{{ errors.email[0] }}</span>
                    </div>
                </div>

                <div class="my-2">
                    <Input label="Password" name="password" type="password" placeholder="Enter Password"
                        v-model="password" />
                    <div v-if="errors.password" class="alertInput">
                        <span>{{ errors.password[0] }}</span>
                    </div>
                </div>

                <div class="my-2">
                    <Input label="Password confirmation" name="password_confirmation" type="password"
                        placeholder="Enter Password Confirmation" v-model="password_confirmation" />
                </div>

            </div>
            <div class="w-1/2 p-4">
                <legend>Roles</legend>

                <div v-for="(role) in roles">
                    <input 
                        :key="Math.random()" 
                        type="checkbox" 
                        class="bg-gray-50 border-gray-300 
                            focus:ring-3 focus:ring-blue-300 h-4 w-4" 
                        :value=role.name 
                        @change="handleCheckboxChange" 
                        :id=role.id 
                    />

                    <label htmlFor={htmlFor} class="text-sm ml-3 font-medium text-gray-900">
                        {{ role.name }}
                    </label>
                </div>

                <div v-if="errors.roles" class="alertInput">
                    <span>{{ errors.roles[0] }}</span>
                </div>                
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
    name: 'UserCreateComponent',

    setup() {
        const token = Cookies.get('token')
        const router = useRouter()
        const toast = useToast()

        const roles = ref([]);
        const rolesData = ref([]);
        const name = ref("");
        const email = ref("");
        const password = ref("");
        const password_confirmation = ref("");
        const errors = ref([]);

        onMounted( () => {
            fetchDataUsers()
        })

        const fetchDataUsers = async () => {
            try {
                const response = await api.get("/api/admin/roles/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    roles.value = response.data.data
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                errors.value = error.response.data;
            }
        }

        const handleCheckboxChange = (e) => {
            let data = rolesData.value;
            if (data.some((name) => name === e.target.value)) {
                data = data.filter((name) => name !== e.target.value);
            } else {
                data.push(e.target.value);
            }
            rolesData.value = data
        };

        const handleBack = () => {
            router.push({ path: "/users" });
        }

        const handleReset = (e) => {
            e.preventDefault();

            name.value = "";
            email.value = "";
            password.value = "";
            password_confirmation.value = "";            

            rolesData.value = []
            errors.value = [];
        }

        const storeUser = async () => { 
            try {
                const response = await api.post("/api/admin/users", 
                {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: password_confirmation.value,
                    roles: rolesData.value,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    router.push({ path: "/users" });
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
            roles,
            name,
            email,
            password,
            password_confirmation,
            errors,
            storeUser,
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
