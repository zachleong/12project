import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AuthPage from "./views/AuthPage.vue";
import Projects from "./views/Projects.vue";
import ProjectInfo from "./views/ProjectInfo.vue";
import ProjectEdit from "./views/ProjectEdit.vue";
import ManageProject from "./views/ManageProject.vue";
import CreateProject from "./views/CreateProject.vue";
import MyProjects from "./views/MyProjects.vue";
import UserProfile from "./views/UserProfile.vue";
import EditProfile from "./views/EditProfile.vue";
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
      component: AuthPage
    },
    {
      path: "/register",
      name: "register",
      component: AuthPage
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
      path: "/myprojects/:projectID",
      name: "ManageProject",
      component: ManageProject
    },
    {
      path: "/editproject/:projectID",
      name: "EditProject",
      component: ProjectEdit
    },
    {
      path: "/myprofile",
      name: "myprofile",
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
      path: "/editprofile",
      name: "editprofile",
      component: EditProfile,
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
