<template>
    <nav>
        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>Awesome! You added a new project</span>
            <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-toolbar flat app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="grey--text">
                <span class="font-weight-light">TODO</span>
                <span>NINJA</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator = "{ on }">
                    <v-btn text color="grey" v-on="on">
                        Menu
                        <v-icon right>expand_more</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-title>
                            {{ link.text }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer" class="grey lighten-3" temporary>
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img src="/avatar-1.png" alt="avatar">
                    </v-avatar>
                    <p color="grey subheading mt-1">Niranjan Sharma</p>
                </v-flex>
                <v-flex class="mb-3">
                    <Popup @projectAdded="snackbar = true"/>
                </v-flex>
            </v-layout>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-icon>
                        <v-icon color="grey">{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-light">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import Popup from '@/components/Popup'
export default {
    components: { Popup },
    data() {
        return {
            drawer: false,
            links: [
                {icon: 'dashboard', text: 'Dashboard', route: '/'},
                {icon: 'folder', text: 'My Projects', route: '/projects'},
                {icon: 'person', text: 'Team', route: '/team'},
            ],
            snackbar: false
        }
    }
}
</script>