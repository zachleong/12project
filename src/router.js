import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import Explore from "./views/Explore.vue";
// import AuthPage from "./views/AuthPage.vue";
// import Projects from "./views/Projects.vue";
// import ProjectInfo from "./views/ProjectInfo.vue";
// import ProjectEdit from "./views/ProjectEdit.vue";
// import CreateProject from "./views/CreateProject.vue";
// import MyProjects from "./views/MyProjects.vue";
// import UserProfile from "./views/UserProfile.vue";
// import MyProfile from "./views/MyProfile.vue";
// import EditProfile from "./views/EditProfile.vue";
// import Guide from "./views/Guide.vue";
import store from "@/Vuex/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/AuthPage.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/AuthPage.vue")
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("./views/Projects.vue")
    },
    {
      path: "/projects/:projectID",
      name: "projectInfo",
      component: () => import("./views/ProjectInfo.vue")
    },
    {
      path: "/createproject",
      name: "createproject",
      component: () => import("./views/CreateProject.vue"),
      beforeEnter: (to, from, next) => {
        if (store.state.userIsAuth) {
          next();
        } else {
          next({ name: "home" });
        }
      }
    },
    {
      path: "/myprojects",
      name: "myprojects",
      component: () => import("./views/MyProjects.vue"),
      beforeEnter: (to, from, next) => {
        if (store.state.userIsAuth) {
          next();
        } else {
          next({ name: "home" });
        }
      }
    },
    {
      path: "/editproject/:projectID",
      name: "EditProject",
      component: () => import("./views/ProjectEdit.vue")
    },
    {
      path: "/profile/:userID",
      name: "Profile",
      component: () => import("./views/UserProfile.vue")
    },
    {
      path: "/myprofile",
      name: "myprofile",
      component: () => import("./views/MyProfile.vue"),
      beforeEnter: (to, from, next) => {
        if (store.state.userIsAuth) {
          next();
        } else {
          next({ name: "home" });
        }
      }
    },
    {
      path: "/editprofile",
      name: "editprofile",
      component: () => import("./views/EditProfile.vue"),
      beforeEnter: (to, from, next) => {
        if (store.state.userIsAuth) {
          next();
        } else {
          next({ name: "home" });
        }
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import("./views/About.vue")
    }
  ]
});
