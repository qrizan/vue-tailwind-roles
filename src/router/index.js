import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: "/",
    component: () => import( /* webpackChunkName: "layout" */ '../views/Layout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import( /* webpackChunkName: "dashboardIndex" */ '../views/Dashboard/Index.vue'),
        meta: {
          title: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: '/posts',
        name: 'posts.index',
        component: () => import( /* webpackChunkName: "postsIndex" */ '../views/Posts/Index.vue'),
        meta: {
          title: "List Posts",
          requiresAuth: true,
        },
      },
      {
        path: '/post/create',
        name: 'posts.create',
        component: () => import( /* webpackChunkName: "postsCreate" */ '../views/Posts/Create.vue'),
        meta: {
          title: "Create Post",
          requiresAuth: true,
        },
      },      
      {
        path: '/post/edit/:id',
        name: 'posts.edit',
        component: () => import( /* webpackChunkName: "postsEdit" */ '../views/Posts/Edit.vue'),
        meta: {
          title: "Edit Post",
          requiresAuth: true,
        },
      },
      {
        path: '/categories',
        name: 'categories.index',
        component: () => import( /* webpackChunkName: "categoriesIndex" */ '../views/Categories/Index.vue'),
        meta: {
          title: "List Categories",
          requiresAuth: true,
        },
      },
      {
        path: '/category/create',
        name: 'categories.create',
        component: () => import( /* webpackChunkName: "categoriesCreate" */ '../views/Categories/Create.vue'),
        meta: {
          title: "Create Category",
          requiresAuth: true,
        },
      },      
      {
        path: '/category/edit/:id',
        name: 'categories.edit',
        component: () => import( /* webpackChunkName: "categoriesEdit" */ '../views/Categories/Edit.vue'),
        meta: {
          title: "Edit Category",
          requiresAuth: true,
        },
      },      
      {
        path: '/users',
        name: 'users.index',
        component: () => import( /* webpackChunkName: "usersIndex" */ '../views/Users/Index.vue'),
        meta: {
          title: "List Users",
          requiresAuth: true,
        },
      },
      {
        path: '/user/create',
        name: 'users.create',
        component: () => import( /* webpackChunkName: "usersCreate" */ '../views/Users/Create.vue'),
        meta: {
          title: "Create User",
          requiresAuth: true,
        },
      },      
      {
        path: '/user/edit/:id',
        name: 'users.edit',
        component: () => import( /* webpackChunkName: "usersEdit" */ '../views/Users/Edit.vue'),
        meta: {
          title: "Edit User",
          requiresAuth: true,
        },
      },
      {
        path: '/roles',
        name: 'roles.index',
        component: () => import( /* webpackChunkName: "rolesIndex" */ '../views/Roles/Index.vue'),
        meta: {
          title: "List Roles",
          requiresAuth: true,
        },
      },
      {
        path: '/role/create',
        name: 'roles.create',
        component: () => import( /* webpackChunkName: "rolesCreate" */ '../views/Roles/Create.vue'),
        meta: {
          title: "Create Role",
          requiresAuth: true,
        },
      },      
      {
        path: '/role/edit/:id',
        name: 'roles.edit',
        component: () => import( /* webpackChunkName: "RolesEdit" */ '../views/Roles/Edit.vue'),
        meta: {
          title: "Edit Role",
          requiresAuth: true,
        },
      },
      {
        path: '/permissions',
        name: 'permissions.index',
        component: () => import( /* webpackChunkName: "permissionsIndex" */ '../views/Permissions/Index.vue'),
        meta: {
          title: "List Permissions",
          requiresAuth: true,
        },
      },  
      { 
        path: '/:pathMatch(.*)*', 
        redirect: "/",
      },          
      {
        path: '/forbidden',
        component: () => import( /* webpackChunkName: "forbidden" */ '../views/Forbidden.vue'),        
      },       
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = Cookies.get("token");
    
    if (token ) {
      next();
      return;
    }
    
    next("/login");
  } else {
    next();
  }
});
export default router;
