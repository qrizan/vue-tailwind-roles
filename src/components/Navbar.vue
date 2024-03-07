<template>
  <nav class="bg-indigo-700 shadow-inner p-4 flex items-center justify-between">
    <div>
      <h1 class="text-white text-xl font-semibold">Base Application</h1>
    </div>
    <div class="flex items-center space-x-4">
      <span class="text-white" ref="user.name">{{ user.name }}</span>
      <span class="block px-4 py-2 text-sm text-gray-300">
        <a @click="logout" style="cursor:pointer">
          Sign out
        </a>

      </span>
    </div>
  </nav>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from "js-cookie";

export default {

  setup() {
    const router = useRouter()
    const user = ref('')

    onMounted(() => {
      user.value = JSON.parse(Cookies.get('user'))

    })

    function logout() {
      const token = Cookies.get("token");
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      axios.post('http://localhost:8000/api/logout')
        .then(response => {

          if (response.data.success) {

              Cookies.remove("user");
              Cookies.remove("token");
              Cookies.remove("permissions");

              return router.push({
                name: 'login'
              })
          }

        })
        .catch(error => {
          console.error(error.response.data)
        })

    }

    return {
      user,
      logout
    }

  }

}
</script>