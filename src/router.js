import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/AuthPage.vue";
import Projects from "./views/Projects.vue";
import ProjectInfo from "./views/ProjectInfo.vue";
import CreateProject from "./views/CreateProject.vue";
import MyProjects from "./views/MyProjects.vue";
import UserProfile from "./views/UserProfile.vue";
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
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects
    },
    {
      path: "/projects/:projectID",
      name: "projectInfo",
      component: ProjectInfo
    },
    {
      path: "/createproject",
      name: "createproject",
      component: CreateProject,
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
      component: MyProjects,
      beforeEnter: (to, from, next) => {
        if (store.state.userIsAuth) {
          next();
        } else {
          next({ name: "home" });
        }
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
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
    }
  ]
});
