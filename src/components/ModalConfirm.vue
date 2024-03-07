<template>
  <div class="fixed inset-0 z-10 overflow-y-auto" v-show="open">
    <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

    <div class="fixed inset-0 w-full h-full bg-black opacity-40" @click="$emit('close')"></div>
    <div class="flex items-center min-h-screen px-4 py-8">
      <div class="relative w-full max-w-lg p-4 mx-auto bg-white shadow-lg">
        <div class="mt-3 flex">
          <div class="m-2 text-left ml-4 w-full">
            <h4 class="text-lg font-medium text-gray-800">Are You Sure ?</h4>
            <p class="mt-2 text-[25px] leading-relaxed text-gray-500">
              want to delete this data ?
            </p>
            <div class="items-center gap-2 mt-3 flex">
              <button
                class="w-full mt-2 p-2.5 flex-1 text-gray-800 outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                @click="$emit('close')">
                Cancel
              </button>
              <button
                class="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 outline-none ring-offset-2 ring-red-600 focus:ring-2"
                @click="$emit('delete', id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
    open: {
      type: Boolean,
      default: true,
      required: true
    },
    id: {
      type: Number,
      default: true,
      required: true
    },
})

const emits = defineEmits(["delete","close"])

</script>