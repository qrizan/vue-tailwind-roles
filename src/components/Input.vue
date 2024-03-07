<template>
    <label>{{ label }}</label>
    <input 
        class="h-10 border mt-1 px-4 w-full bg-gray-50 focus:outline-none" 
        autoComplete="off" 
        :type="type"
        :name="name" 
        :placeholder="placeholder" 
        v-model="modelValue" />
</template>

<script setup>
import { defineModel } from 'vue';

const modelValue = defineModel('modelValue')

const props = defineProps({
    label: { 
        type: String,
        default: "",
        required: false,
    },   
    type: { 
        type: String,
        default: "",
        required: false,
    },            
    name: { 
        type: String,
        default: "",
        required: false,
    },        
    placeholder: { 
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

</script>