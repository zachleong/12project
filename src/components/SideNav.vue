<template>
  <!-- <transition name="slide"> -->
  <div class="sidenav" :class="navActive">
    <div class="sidenav-content">
      <p class="underline">Filters</p>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        class="cat-check"
        >All</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedCategories"
        @change="handleCheckedCatChange"
      >
        <el-checkbox
          v-for="category in categories"
          :label="category"
          :key="category"
          class="cat-check cat-check-minor"
          >{{ category }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import store from "@/Vuex/store";
const categories = ["Frontend", "Backend", "Pen testing", "Other"];
export default {
  data() {
    return {
      navActive: false,
      checkAll: true,
      checkedCategories: categories,
      categories: categories,
      isIndeterminate: false
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCategories = val ? categories : [];
      this.isIndeterminate = false;
      store.commit("updateFilter", true);
      store.commit("setCategories", this.checkedCategories);
    },
    handleCheckedCatChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.categories.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.categories.length;
      store.commit("updateFilter", true);
      store.commit("setCategories", this.checkedCategories);
    },
    toggleNav() {
      this.navActive = !this.navActive;
    },
    setFilters() {
      const categories = store.state.projectCategories;
      if (categories) {
        this.checkedCategories = categories;
        this.isIndeterminate = true;
      }
    }
  },
  mounted() {
    this.setFilters();
  },
  computed: {
    getNavActive() {
      return this.$route.name == "projects";
    }
  }
};
</script>

<style lang="scss" scoped>
.cat-check-minor {
  margin-left: 10px;
}
.cat-check {
  float: left;
  margin-top: 2px;
  margin-bottom: 2px;
  font-family: "Nunito", sans-serif;
}
.sidenav {
  position: absolute;
  height: 100%;
  width: 130px;
  top: 0;
  left: 0;
  -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 15px;
}
.sidenav-content {
  margin-top: 80px;
}
</style>
