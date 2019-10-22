module.exports = {
    pages: {
        index: {
            // entry for the page
            entry: './src/pages/Login/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        contacts: {
            entry: './src/pages/Contacts/main.js',
            template: 'public/index.html',
            title: 'Contacts Page',
            chunks: ['chunk-vendors', 'chunk-common', 'contacts']
        },
        documentsscript: {
            entry: './src/pages/DocumentsScript/main.js',
            template: 'public/index.html',
            title: 'Documents & Scripts Page',
            chunks: ['chunk-vendors', 'chunk-common', 'documentsscript']
        },
        information: {
            entry: './src/pages/Information/main.js',
            template: 'public/index.html',
            title: 'Information Page',
            chunks: ['chunk-vendors', 'chunk-common', 'information']
        },
        library: {
            entry: './src/pages/Library/main.js',
            template: 'public/index.html',
            title: 'Library Page',
            chunks: ['chunk-vendors', 'chunk-common', 'library']
        },
        locations: {
            entry: './src/pages/Locations/main.js',
            template: 'public/index.html',
            title: 'Locations Page',
            chunks: ['chunk-vendors', 'chunk-common', 'locations']
        },
        login: {
            entry: './src/pages/Login/main.js',
            template: 'public/index.html',
            title: 'Login Page',
            chunks: ['chunk-vendors', 'chunk-common', 'login']
        },
        moodboard: {
            entry: './src/pages/Moodboard/main.js',
            template: 'public/index.html',
            title: 'Moodboard Page',
            chunks: ['chunk-vendors', 'chunk-common', 'moodboard']
        },
        myprofile: {
            entry: './src/pages/MyProfile/main.js',
            template: 'public/index.html',
            title: 'MyProfile Page',
            chunks: ['chunk-vendors', 'chunk-common', 'myprofile']
        },
        projectscalendar: {
            entry: './src/pages/ProjectsCalendar/main.js',
            template: 'public/index.html',
            title: 'Projects & Calendar Page',
            chunks: ['chunk-vendors', 'chunk-common', 'projectscalendar']
        },
        shotliststoryboard: {
            entry: './src/pages/ShotlistStoryboard/main.js',
            template: 'public/index.html',
            title: 'Shotlist & Storyboard Page',
            chunks: ['chunk-vendors', 'chunk-common', 'shotliststoryboard']
        },
        signup: {
            entry: './src/pages/SignUp/main.js',
            template: 'public/index.html',
            title: 'SignUp Page',
            chunks: ['chunk-vendors', 'chunk-common', 'signup']
        },
        singleprojectview: {
            entry: './src/pages/SingleProjectView/main.js',
            template: 'public/index.html',
            title: 'Singe Project View Page',
            chunks: ['chunk-vendors', 'chunk-common', 'singleprojectview']
        },
    }
};