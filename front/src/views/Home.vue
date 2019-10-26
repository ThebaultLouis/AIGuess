<template>
  <div class="home">
    <ProjectList />
  </div>
</template>

<script>
// @ is an alias to /src

import ProjectList from "../components/home/ProjectList";

export default {
  name: "home",
  components: {
    ProjectList
  }
};
</script>
