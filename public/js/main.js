var app = new Vue({
    el: '#app',
    data: {
      loading: false,
      meals : []
    },
    methods : {
        loadData : function() {
            var self = this;
            self.loading = true;
            axios.get('/api/meal_planner')
            .then(function (response) {
                console.log(response.data)
                self.meals = response.data;
                self.loading = false;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                self.loading = false;
            })
        }
    }
})