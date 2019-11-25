<template>
  <div>
    <v-container>
      <v-row>
        <h1 class="display-1">CNN</h1>
      </v-row>
      <v-row justify="start">
        <v-col cols="auto">
          <ProjectCard
            title="Guess my number"
            image="guess_my_number.png"
            routeName="GuessMyNumber"
          />
        </v-col>
        <v-col cols="auto">
          <ProjectCard
            title="Guess my hiragana"
            image="guess_my_hiragana.png"
            routeName="GuessMyHiragana"
          />
        </v-col>
      </v-row>
      <v-row>
        <h1 class="display-1">Systèmes multi-agents</h1>
      </v-row>
      <v-row justify="start">
        <v-col cols="auto">
          <ProjectCard
            title="Balles rebondissantes"
            image="bouncing_balls.png"
            routeName="BouncingBalls"
          />
        </v-col>
        <v-col cols="auto">
          <ProjectCard title="Jeu de la vie de Conway" image="life_game.png" routeName="LifeGame" />
        </v-col>
        <v-col cols="auto">
          <ProjectCard
            title="Jeu de l'immigration"
            image="migration_game.png"
            routeName="MigrationGame"
          />
        </v-col>
      </v-row>
    </v-container>
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