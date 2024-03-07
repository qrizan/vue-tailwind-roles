<template>
    <form @submit.prevent="updateCategory()" v-if="checkPermission(['categories.edit'])">

        <div class="py-2 w-1/2">
            <Input label="Name" name="name" type="text" placeholder="Enter Name" v-model="name" />
            <div v-if="errors.name" class="alertInput">
                <span>{{ errors.name[0] }}</span>
            </div>
        </div>

        <div class="my-2">
            <InputFile @handleFileChange="handleFileChange" />

            <div v-if="errors.image" class="alertInput">
                <span>{{ errors.image[0] }}</span>
            </div>
        </div>

        <div class="flex items-center justify-between pt-4">
            <div>
                <ButtonBack @back="handleBack" />
            </div>
            <div>
                <ButtonSave />
            </div>
        </div>
        
    </form>

    <Forbidden  v-else/>

</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useToast } from "vue-toastification"
import Cookies from "js-cookie";

import api from '../../api/Api';

import Input from "../../components/Input.vue";
import InputFile from "../../components/InputFile.vue";
import ButtonSave from "../../components/ButtonSave.vue";
import ButtonBack from "../../components/ButtonBack.vue";


export default {
    name: 'CategoryEditComponent',

    setup() {
        const token = Cookies.get('token')
        const router = useRouter()
        const route = useRoute();        
        const toast = useToast()

        const image = ref("");
        const name = ref("");
        const errors = ref([]);

        const handleFileChange = (e) => {
            image.value = e.target.files[0];
        };

        onMounted(async () => {
            fetchDataCategory()
        })

        const fetchDataCategory = async () => {
            try {
                const response = await api.get(`/api/admin/categories/${route.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    name.value = response.data.data.name
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error)
                errors.value = error.response.data;
            }
        }

        const handleBack = () => {
            router.push({ path: "/categories" });
        }

        const updateCategory = async () => {
            let formData = new FormData();

            formData.append("image", image.value);
            formData.append("name", name.value);
            formData.append("_method", "PATCH");

            try {
                const response = await api.post(`/api/admin/categories/${route.params.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "multipart/form-data",
                    },
                });

                if (response.data.success) {
                    router.push({ path: "/categories" });
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
            image,
            name,
            errors,
            handleFileChange,
            updateCategory,
            handleBack,
        }
    },
    components: {
        Input,
        InputFile,
        ButtonSave,
        ButtonBack,
    }
}
</script>
