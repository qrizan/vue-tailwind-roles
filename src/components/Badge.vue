<template>
    <span 
        class="
        items-center bg-yellow-50 
        px-2 py-1 text-xs font-medium text-yellow-800 
        ring-1 ring-inset ring-yellow-600/20 inline-block m-0.5"
    >
        {{ name }}
    </span>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        default: "",
        required: false,
    }
})
</script>