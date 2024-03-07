<template>
    <aside class="bg-gray-800 text-white w-64 min-w-64 min-h-screen p-4">
        <nav>
            <ul class="space-y-2">

                <router-link :to="{ name: 'dashboard' }">
                    <Menu name="Dashboard" :isActive="$route.name === 'dashboard'"  />
                </router-link>
                
                <hr class="border-1 border-gray-50 pb-2" />

                <router-link :to="{ name: 'categories.index' }" v-if="checkPermission(['categories.index'])">
                    <Menu name="Categories" :isActive="$route.name.split('.')[0] === 'categories'" />
                </router-link>   
                
                <router-link :to="{ name: 'posts.index' }" v-if="checkPermission(['posts.index'])">
                    <Menu name="Posts" :isActive="$route.name.split('.')[0] === 'posts'"/>
                </router-link>

                <router-link :to="{ name: 'roles.index' }" v-if="checkPermission(['roles.index'])">
                    <Menu name="Roles" :isActive="$route.name.split('.')[0] === 'roles'"/>
                 </router-link>    

                <router-link :to="{ name: 'permissions.index' }" v-if="checkPermission(['permissions.index'])">
                    <Menu name="Permissions" :isActive="$route.name.split('.')[0] === 'permissions'"/>
                </router-link>                    

                <router-link :to="{ name: 'users.index' }" v-if="checkPermission(['users.index'])">
                    <Menu name="Users" :isActive="$route.name.split('.')[0] === 'users'"/>
                </router-link>   

            </ul>
        </nav>
    </aside>
</template>

<script setup>
import Menu from "./Menu.vue";
</script>
