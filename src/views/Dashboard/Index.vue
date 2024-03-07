<template>
  <div class="max-w-full mx-4 py-6">
    <div class="flex space-x-4">
      <div class="inline-block bg-white shadow transform transition-all mb-4 w-1/3">
        <div class="bg-white p-5">
          <div class="text-center">
            <h3 class="text-sm leading-6 font-medium text-gray-400">Total Categories</h3>
            <p class="text-3xl font-bold text-black">{{ categories }}</p>
          </div>
        </div>
      </div>
      <div class="inline-block bg-white shadow transform transition-all mb-4 w-1/3">
        <div class="bg-white p-5">
          <div class="text-center">
            <h3 class="text-sm leading-6 font-medium text-gray-400">Total Posts</h3>
            <p class="text-3xl font-bold text-black">{{ posts }}</p>
          </div>
        </div>
      </div>
      <div class="inline-block bg-white shadow transform transition-all mb-4 w-1/3">
        <div class="bg-white p-5">
          <div class="text-center">
            <h3 class="text-sm leading-6 font-medium text-gray-400">Total Users</h3>
            <p class="text-3xl font-bold text-black">{{ users }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Cookies from "js-cookie";

import api from '../../api/Api';

export default {
  name: 'DashboardIndexComponent',

  setup() {
    const token = Cookies.get('token')
    const categories = ref(0)
    const posts = ref(0)
    const users = ref(0)

    onMounted(() => {
      fetchDataDashboard()
    })

    const fetchDataDashboard = async (pageNumber = 1) => {
      try {
        const response = await api.get("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          categories.value = response.data.data.categories
          posts.value = response.data.data.posts
          users.value = response.data.data.users
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }

    return {
      token,
      categories,
      posts,
      users,
    }

  }

}
</script>