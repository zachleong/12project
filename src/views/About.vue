<template>
  <div class="about">
    <h1 class="underline">About:</h1>
    <p>
      Git Money is a software collaboration platform. It enables software
      developers to easily find projects they are interested in working on. Once
      you have found a project, you may offer to contribute for free or request
      to be contracted.
    </p>
    <h1 class="underline">Guide:</h1>
    <p v-if="!userIsAuth">Register:</p>
    <ul v-if="!userIsAuth">
      <li>
        New users can register by clicking on the Login/Register button in the
        top right-hand corner and then click on the Guide button for further
        instructions.
      </li>
    </ul>
    <p v-if="!userIsAuth">Explore:</p>
    <ul v-if="!userIsAuth">
      <li>
        The explore page presents four categories which will take you to the
        projects under that category
      </li>
    </ul>
    <p>Browse Projects:</p>
    <ul>
      <li>
        You can click on the "Browse Projects" link in the navbar to visit the
        projects page where you will find new projects and filter based on your
        preferences
      </li>
      <p>Or</p>
      <li>
        You can also click on the badges in your home page to visit the projects
        page for the category that you clicked on
      </li>
    </ul>
    <p>Projects:</p>
    <ul>
      <li>
        Once you have found a project that you are interested in you can click
        on the project and be taken to the project page.
      </li>
      <li>
        On the project page you can see more details about the project. You can
        click on the owner's name to be taken to the owner's profile page to
        find out more about them.
      </li>
      <li>
        Underneath the project's “about” section you can find comments from
        other users offering how they might like to help with the project. Here
        you can add your own comment outlining how you might like to help with
        the project.
      </li>
      <li>
        After reviewing comments on a project, the owner will either approve or
        deny your request and will then contact you where you and the owner will
        communicate how you will go about contributing to the project.
      </li>
    </ul>
    <p>My Projects:</p>
    <ul>
      <li>
        You can find the My Projects page in the navigation bar. This will take
        you to the page where you can create and manage your projects
      </li>
      <li>
        To create a new project click on the "new project" link. You will be
        taken to the "create project" page where you can create your own
        project. Pick a title, the category that it falls under, fill out a
        description. Your project will now be viewable by all users.
      </li>
      <li>
        Your project will now be easily accessible to you through the "My
        Projects" page. After someone takes an interest in your project and
        comments, you will see their comment on your project page and you can
        either approve or deny their request.
      </li>
    </ul>
    <p>Profile:</p>
    <ul>
      <li>
        If you hover over the profile picture in the top right-hand corner, you
        can either sign out, or go to your profile page.
      </li>
      <li>
        On your profile page will be an edit link. Here you can add a
        description of yourself or change your profile picture. Other users will
        see your description and profile picture when they visit your profile.
      </li>
    </ul>
  </div>
</template>
<script>
import store from "@/Vuex/store";
export default {
  computed: {
    userIsAuth() {
      return store.state.userIsAuth;
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  display: inline-block;
  width: 75%;
  text-align: left;
}
.about > p,
ul > li {
  font-size: 18px;
}

li {
  margin: 10px 0 10px 0;
}
</style>
