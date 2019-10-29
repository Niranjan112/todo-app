<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator = "{ on }">
            <v-btn text v-on="on" class="success">Add a project</v-btn>
        </template>
        <v-card>
            <v-card-title>
                Add a new project
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field label="Title" v-model="title" 
                    prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" 
                    prepend-icon="edit" :rules="inputRules"></v-textarea>
                    <v-menu>
                        <template v-slot:activator = "{ on }">
                            <v-text-field :value="formattedDate" 
                            v-on="on" label="Due date" 
                            prepend-icon="date_range"
                            :rules="inputRules"></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>     
                    </v-menu>

                    <v-text-field label="Person Name" v-model="personName" 
                    prepend-icon="person" :rules="inputRules"></v-text-field>

                    <v-select
                    v-model="status"
                    :items="items"
                    :rules="[v => !!v || 'Status is required']"
                    prepend-icon="notes"
                    label="Status"
                    required
                    ></v-select>
                    <div class="text-center">
                        <v-btn text class="success" @click="submit" :loading="loading">Add Project</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'
export default {
    data() {
        return {
            title: '',
            content: '',
            due: null,
            personName: '',
            status: null,
            items: ['complete','ongoing'],
            inputRules: [
                v => v.length >= 3 || 'Atleast insert 3 characters'
            ],
            loading: false,
            dialog: false
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                const project = {
                    title: this.title,
                    content: this.content,
                    due: format(new Date(this.due), 'do MMM yyyy'),
                    person: this.personName,
                    status: this.status
                }
                db.collection('projects').add(project).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('projectAdded');
                })
            }
        }
    },
    computed: {
        formattedDate() {
            return this.due ? format(new Date(this.due), 'do MMM yyyy'):''
        }
    }
}
</script>