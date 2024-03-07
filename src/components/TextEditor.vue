<template>
    <label class="form-label fw-bold">{{ label }}</label>
    <QuillEditor 
        v-model:content="modelValue" 
        theme="snow" 
        :modules="modules" 
        contentType="html" 
        :toolbar="['bold', 'italic', 'underline','link', 'image']"
    />
</template>

<script setup>
import { defineModel } from 'vue';
import Cookies from "js-cookie";

import api from '../api/Api';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageUploader from 'quill-image-uploader';

const modelValue = defineModel('modelValue')

const props = defineProps({
    label: {
        type: String,
        default: "",
        required: false,
    },
    modelValue: {
        type: String,
        default: "",
        required: true,
    }
})

const modules = {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
        upload: file => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("image", file);

                const token = Cookies.get('token')

                api.post('/api/admin/posts/storeImagePost', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "multipart/form-data",
                    },
                })
                .then(res => {
                    resolve(res.data.url);
                })
                .catch(err => {
                    reject("Upload failed");
                    console.error("Error:", err)
                })
            })
        }
    }
}

</script>