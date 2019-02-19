// Define a new component called todo-item
Vue.component('course', {
    template: `<div class="course card" :class="course.type">
        <img :src="course.imgUrl" class="card-img-top" :alt="course.display_name">
        <div class="card-body">
            <h5 class="card-title">{{ course.display_name }}</h5>
            <dl>
                <dt>Carbs</dt>
                <dd>{{ Math.floor(course.carbs) }}</dd>
                <dt>Fibers</dt>
                <dd>{{ Math.floor(course.fibers) }}</dd>
                <dt>Proteins</dt>
                <dd>{{ Math.floor(course.proteins) }}</dd>
                <dt>Lipids</dt>
                <dd>{{ Math.floor(course.lipids) }}</dd>
                <div class="progress-circle-container">
                <div :class="'progress-circle progress-' + Math.floor(course.cal * 100 / mealCals)"><span>{{course.cal}}</span></div>
                </div>
            </dl>
        </div>
    </div>`,
    props : [ 'course', 'mealCals' ]
})