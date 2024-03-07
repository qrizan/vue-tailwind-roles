<template>
    <button 
        @click="$emit('reset',$event)"
        class="
            flex-none 
            bg-white px-3.5 py-2.5 text-sm border
            font-semibold 
            text-indigo-500 
            shadow-sm hover:bg-gray-100 
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-indigo-500 mr-3">
        Reset
    </button>
</template>

<script setup>
const emits = defineEmits(["reset"])
</script>