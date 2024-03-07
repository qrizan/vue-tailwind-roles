<template>
    <input 
        @change="$emit('handleFileChange',$event)" 
        type="file" 
        accept="image/*" 
        class="block w-full text-sm text-gray-500 
        file:mr-4 file:py-2 file:px-4 
        file:border-0 file:text-sm file:font-semibold 
        file:bg-gray-100 file:text-gray-600 
        hover:file:bg-gray-100 cursor-pointer" />
</template>

<script setup>
const emits = defineEmits(["handleFileChange"])
</script>