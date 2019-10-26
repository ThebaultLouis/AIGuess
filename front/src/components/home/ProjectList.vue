<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row class="sm3 xs12" justify="center">
          <ProjectCard title="GuessMyNumber" image="guess_my_number.png" routeName="GuessMyNumber" />
          <ProjectCard
            title="GuessMyHiragana"
            image="guess_my_hiragana.png"
            routeName="GuessMyHiragana"
          />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProjectCard from "./ProjectCard";

export default {
  components: {
    ProjectCard
  }
};
</script>