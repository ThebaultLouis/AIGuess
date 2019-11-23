<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col offset="1">
            <h1 class="display-1">CNN</h1>
          </v-col>
        </v-row>
        <v-row class="sm3 xs12" justify="center">
          <ProjectCard
            title="Guess my number"
            image="guess_my_number.png"
            routeName="GuessMyNumber"
          />
          <ProjectCard
            title="Guess my hiragana"
            image="guess_my_hiragana.png"
            routeName="GuessMyHiragana"
          />
        </v-row>
        <v-row>
          <v-col offset="1">
            <h1 class="display-1">Système multi-agents</h1>
          </v-col>
        </v-row>
        <v-row class="sm3 xs12" justify="center">
          <ProjectCard
            title="Balles rebondissantes"
            image="guess_my_number.png"
            routeName="BouncingBalls"
          />
          <ProjectCard
            title="Jeu de la vie de Conway"
            image="guess_my_number.png"
            routeName="LifeGame"
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