



import Vue from 'vue';
import Panels from '../src/Panels.vue';
import Panel from '../src/Panel.vue';


new Vue({
    el: 'body',
    components: {Panels, Panel},
    methods: {
        open(panelRef) {
            this.$broadcast('panels:open', panelRef);
        }
    }
})