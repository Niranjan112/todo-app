<template>
  <div class="dashboard">
    <h1 class="grey--text">Dashboard</h1>

    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <template small v-slot:activator = "{on}">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">By Project Name</span>
            </v-btn>
          </template>
          <span>Sort By Title</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator = "{on}">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
          <v-icon left small>person</v-icon>
          <span class="caption text-lowercase">By Person Name</span>
        </v-btn>
          </template>
          <span>Sort By Name</span>
        </v-tooltip>
      </v-layout>
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{project.title}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div class="text-center">
              <v-chip small
              v-if="project.status == 'complete'"
              :class="`${project.status} white--text my-2 caption`" 
              :style="{backgroundColor:'#3CD1C2'}">{{ project.status }}</v-chip>

              <v-chip small
              v-if="project.status == 'ongoing'"
              :class="`${project.status} white--text my-2 caption`" 
              :style="{backgroundColor:'orange'}">{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'
export default {
  data() {
    return {
      projects: []
    }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1);
    }
  },
  created() {
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges()
      changes.forEach(change => {
        if (change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
};
</script>

<style>
.project.complete{
  border-left: 4px solid #3CD1C2;
}
.project.ongoing{
  border-left: 4px solid orange;
}
.project.overdue{
  border-left: 4px solid tomato;
}
</style>