
var app = new Vue({
    el: '#mobile-bar',
    data: {
        showMobileMenu: false
    },
})

var app = new Vue({
    el: '#swipe-sidebar',
    data: {
        showSwipeSidebar: false
    },
})


var app = new Vue({

    el: '#darklight',

    methods: {

        toggleBodyClass(addRemoveClass, className) {


            const el = document.body;

            if (addRemoveClass === 'addClass') {

                if(className === 'light'){
                    el.classList.remove('dark');
                    el.classList.add('light');
                }
                if(className === 'dark'){
                    el.classList.add('dark');
                    el.classList.remove('light');
                }



            }
        },
    },

    created() {
        //this.$cookie.set("color", "light", 86400)
    }

});
