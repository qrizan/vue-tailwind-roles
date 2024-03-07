<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <div 
                v-if="loginFailed"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert">
                <span class="block sm:inline">{{ validation.message }}</span>
            </div>
            <form @submit.prevent="login" class="space-y-6">

                <div>
                    <div class="mt-2">
                        <input class="h-10 border mt-1 px-4 w-full bg-gray-50 focus:outline-none" autoComplete="off"
                            v-model="user.email" type="email" name="email" placeholder="Enter Email Address" />
                    </div>

                    <div v-if="validation.email"
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2"
                        role="alert">
                        <span class="block sm:inline">{{ validation.email[0] }}</span>
                    </div>
                </div>

                <div>
                    <div class="mt-2">
                        <input class="h-10 border mt-1 px-4 w-full bg-gray-50 focus:outline-none" autoComplete="off"
                            v-model="user.password" type="password" name="password" placeholder="Enter Password" />
                    </div>

                    <div v-if="validation.email"
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2"
                        role="alert">
                        <span class="block sm:inline">{{ validation.password[0] }}</span>
                    </div>

                </div>

                <div>
                    <button type="submit" class="
              flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
              text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from "js-cookie";

import api from '../api/Api';

export default {
    name: 'LoginComponent',

    setup() {
        const router = useRouter()
        const user = reactive({
            email: '',
            password: '',
        })

        const validation = ref([])
        const loginFailed = ref(null)

        const login = () => {

            let email = user.email
            let password = user.password

            api.post('/api/login', {
                email,
                password,
            })
                .then(response => {

                    if (response.data.success) {

                        Cookies.set("token", response.data.token, { secure: true, sameSite: "strict" });
                        Cookies.set("user", JSON.stringify(response.data.user), {
                            secure: true,
                            sameSite: "strict",
                        });
                        Cookies.set("permissions", JSON.stringify(response.data.permissions), {
                            secure: true,
                            sameSite: "strict",
                        });

                        return router.push({
                            name: 'dashboard'
                        })
                    }

                    loginFailed.value = true

                }).catch(error => {
                    if(!error.response.data.success && error.response.data.message !== undefined){
                        loginFailed.value = true

                    }
                    validation.value = error.response.data
                })
        }

        return {
            user,
            validation,
            loginFailed,
            login
        }

    }

}
</script>