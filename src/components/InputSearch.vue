<template>
    <input 
        class="h-10 border mt-1 px-4 w-full bg-gray-50 focus:outline-none" 
        autoComplete="off" type="text"
        name="search" 
        placeholder="Search" 
        v-model="modelValue" 
        @keyup="$emit('searchQuery')" 
    />
</template>

<script setup>
import { defineModel } from 'vue';

const modelValue = defineModel('modelValue')

const props = defineProps({
    modelValue: { 
        type: String,
        default: "",
        required: true,
    }
})
const emits = defineEmits(["searchQuery"])

</script>