// Define a new component called todo-item
Vue.component('meal', {
    template: `<div class="meal">
        <course :course="meal.starter" :meal-cals="meal.cals"></course>
        <course :course="meal.dish" :meal-cals="meal.cals"></course>
        <course :course="meal.desert" :meal-cals="meal.cals"></course>
    </div>`,
    
    props : [ 'meal' ]
});