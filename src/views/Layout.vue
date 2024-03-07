<template>
      <Navbar />
      <div class="flex flex-row h-full w-screen min-h-screen">
      <Sidebar />
      <main class="p-6 bg-gray-100 w-screen ">
      <div class="bg-white shadow-sm border px-6 pt-4 pb-6 mb-6">
        <h3
          class="
              text-2xl font-bold leading-6 text-gray-900 
              sm:truncate sm:text-3xl sm:tracking-tight"
            >
            {{ $route.meta.title }}
        </h3>
        <router-view></router-view>
        </div>
      </main>
      </div>
</template>

<script setup>
  import Navbar from '../components/Navbar.vue'
  import Sidebar from '../components/Sidebar.vue'
</script>

