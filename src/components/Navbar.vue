<template>
    <nav>
        <v-toolbar flat app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="grey--text">
                <span class="font-weight-light">TODO</span>
                <span>NINJA</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text color="grey">
                <span>Exit</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer" class="grey lighten-3" temporary>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" link>
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
export default {
    data() {
        return {
            drawer: false,
            links: [
                {icon: 'dashboard', text: 'Dashboard', route: '/'},
                {icon: 'folder', text: 'My Projects', route: '/projects'},
                {icon: 'person', text: 'Team', route: '/team'},
            ]
        }
    }
}
</script>