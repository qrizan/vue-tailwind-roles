<template>
    <label>{{ label }}</label>
    <select 
        v-model="modelValue" 
        class="
            form-select appearance-none block w-full px-3 py-1.5
            text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300 transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >

        <option value="">Select</option>
            <option
            v-for="(item, index) in options"
                :value="item.id"
                :key="index"
            >{{ item.name }}
            </option>
    </select>
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
    options: { 
        type: Array,
        default: [],
        required: true,
    }
})

</script>