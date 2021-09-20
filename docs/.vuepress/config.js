module.exports = {
    title: "Vue3 Handson",
    description: "Vue.js-jp Vue3 Handson",
    dest: "dist/",
    base: '/handson-vue3/',
    themeConfig: {
        sidebar: [
            '/',
            {
                title: '準備編',
                collapsable: false,
                children: [
                    '/setup'
                ],
                initialOpenGroupIndex: 1
            },
            {
                title: '本編',
                collapsable: false,
                children: [
                    '/create',
                    '/overview',
                    '/rendering',
                    '/v-for',
                    '/v-if',
                    '/methods',
                    '/event'
                ],
                initialOpenGroupIndex: 1
            }
        ]
    }
};