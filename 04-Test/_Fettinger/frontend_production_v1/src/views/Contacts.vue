<template>
    <div id="contacts">
        <NavBar current-page="contacts"></NavBar>
        <FilePath></FilePath>
        <ProjectNameTitle></ProjectNameTitle>
        <h2>Contacts</h2>
        <b-container>
            <b-table striped borderless hover :items="items" :fields="fields">
                <template v-slot:cell(actions)="row">
                    <b-button v-b-modal.modal-1 variant="outline-primary" size="sm">
                        <font-awesome-icon :icon="['fas', 'pen']"/>
                    </b-button>
                    <b-modal id="modal-1" title="BootstrapVue">
                        <p class="my-4">Hello from modal!</p>
                    </b-modal>
                </template>

            </b-table>
        </b-container>

    </div>
</template>

<script>

    import NavBar from "../components/Layout/NavBar";
    import FilePath from "../components/Layout/FilePath";
    import ProjectNameTitle from "../components/Layout/ProjectNameTitle";

    export default {
        name: 'contacts',
        components: {
            NavBar,
            FilePath,
            ProjectNameTitle
        },
        data() {
            return {
                fields: [
                    {
                        key: 'last_name',
                        label: 'Last Name',
                        sortable: true
                    },
                    {
                        key: 'first_name',
                        label: 'First Name',
                        sortable: false
                    },
                    {
                        key: 'e_mail',
                        label: 'e-Mail',
                        sortable: false
                    },
                    {
                        key: 'tel_number',
                        label: 'Telephone Number',
                        sortable: false
                    },
                    {
                        key: 'actions',
                        label: 'Actions'
                    }
                ],
                items: [
                    {
                        isActive: true,
                        first_name: 'Dickerson',
                        last_name: 'Macdonald',
                        e_mail: 'max.fettinger@gmail.com',
                        tel_number: '+43676814280599'
                    },
                    {
                        isActive: true,
                        first_name: 'Dickerson',
                        last_name: 'Macdonald',
                        e_mail: 'max.fettinger@gmail.com',
                        tel_number: '+43676814280599'
                    },
                    {
                        isActive: true,
                        first_name: 'Dickerson',
                        last_name: 'Macdonald',
                        e_mail: 'max.fettinger@gmail.com',
                        tel_number: '+43676814280599'
                    },
                    {
                        isActive: true,
                        first_name: 'Dickerson',
                        last_name: 'Macdonald',
                        e_mail: 'max.fettinger@gmail.com',
                        tel_number: '+43676814280599'
                    },
                ]
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
