<template>
    <form @submit.prevent="updatePost()" v-if="checkPermission(['posts.edit'])">

        <div class="py-2 w-1/2">
            <Input label="Title" name="title" type="text" placeholder="Enter Title" v-model="title" />
            <div v-if="errors.title" class="alertInput">
                <span>{{ errors.title[0] }}</span>
            </div>
        </div>

        <div class="my-2">
            <InputFile @handleFileChange="handleFileChange" />
            <div v-if="errors.image" class="alertInput">
                <span>{{ errors.image[0] }}</span>
            </div>
        </div>

        <div class="mb-3 w-1/2">
            <SelectOption v-model="categoryId" label="Category" :options="categories" />
            <div v-if="errors.category_id" class="alertInput">
                <span>{{ errors.category_id[0] }}</span>
            </div>
        </div>

        <div class="mb-3">
            <TextEditor v-model="content" label="Content" />
            <div v-if="errors.content" class="alertInput">
                <span>{{ errors.content[0] }}</span>
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
import SelectOption from "../../components/SelectOption.vue";
import TextEditor from "../../components/TextEditor.vue";
import ButtonSave from "../../components/ButtonSave.vue";
import ButtonBack from "../../components/ButtonBack.vue";

export default {
    name: 'PostEditComponent',

    setup() {
        const token = Cookies.get('token')
        const router = useRouter()
        const route = useRoute();
        const toast = useToast()

        const image = ref("");
        const title = ref("");
        const categoryId = ref("");
        const categories = ref([]);
        const content = ref("");
        const errors = ref([]);

        onMounted(() => {
            fetchDataPostById();
            fetchDataCategories();
        })

        const fetchDataPostById = async () => {
            try {
                const response = await api.get(`/api/admin/posts/${route.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    title.value = response.data.data.title
                    categoryId.value = response.data.data.category_id
                    content.value = response.data.data.content
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                errors.value = error.response.data;
            }            
        }

        const fetchDataCategories = async () => {
            try {
                const response = await api.get("/api/admin/categories/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    categories.value = response.data.data
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                errors.value = error.response.data;
            }
        }

        const handleBack = () => {
            router.push({ path: "/posts" });
        }

        const handleFileChange = (e) => {
            image.value = e.target.files[0];
        };

        const updatePost = async () => {
            let formData = new FormData();

            formData.append("image", image.value);
            formData.append("title", title.value);
            formData.append("category_id", categoryId.value);
            formData.append("content", content.value);
            formData.append("_method", "PATCH");

            try {
                const response = await api.post(`/api/admin/posts/${route.params.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "multipart/form-data",
                    },
                });

                if (response.data.success) {
                    router.push({ path: "/posts" }).then(() => {
                        toast.success(response.data.message);
                    });
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                errors.value = error.response.data;
            }
        };

        return {
            image,
            title,
            categoryId,
            categories,
            content,
            errors,
            handleFileChange,
            updatePost,
            handleBack
        }
    },
    components: {
        Input,
        InputFile,
        SelectOption,
        TextEditor,
        ButtonSave,
        ButtonBack,
    }
}
</script>
