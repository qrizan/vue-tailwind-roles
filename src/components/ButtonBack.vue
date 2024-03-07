<template>
    <button 
        @click="$emit('back')"
        class="
            flex-none 
            px-3.5 py-2.5 text-sm 
            bg-orange-400 
            font-semibold 
            text-white shadow-sm 
            hover:bg-orange-300 
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-orange-400">
            Back
    </button>
</template>

<script setup>
const emits = defineEmits(["back"])
</script>