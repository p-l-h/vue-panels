
<template>
    <div class="panels component-panel" v-bind:class="classObject"  v-bind:style="styleObject">
        <div class="component-panel-header" v-if="title">
            <strong>{{ title }}</strong>
        </div>
        <slot></slot>
        <i class="icon icon-times" @click="$parent.close()"></i>

    </div>
</template>

<script>

    const panelHelper = {
        getStyleObject: function (panel) {
            
            let result = {};            
            result[panel.position] = (panel.opened ? "0" : "-" + panel.size);

            switch (panel.position) {
                case "top": case "bottom":
                    result.height = panel.size;
                    break;

                case "left": case "right":
                    result.width = panel.size;
                    break;
                default:
                    break;
            }
            
            return result;
        },
        getClassObject: function (panel) {
            let result = {}
            result['panel-' + panel.position] = true;
            result.open = panel.opened;
            return result;
        }
    };
    
    export default {
        props: ['position', 'size', 'title'],
        data() {
            return {
                opened: false
            }
        },
        computed: {
            styleObject: function () {
                return panelHelper.getStyleObject(this);
            },
            classObject: function () {
                return panelHelper.getClassObject(this);
            }
        },
        methods: {
            open: function () {
                this.opened = true;
            },
            close: function () {
                this.opened  = false;
            }
        }
    }
</script>

<style lang="sass">
.component-panel {
    
    &-header {
        position: relative;
        padding: 10px 20px 0;
        font-size: 22px;
        >strong {
            font-weight: 400;
        }
        
    }
    
    >.icon-times {
        position: absolute;
        right: 10px;
        font-size: 24px;
        cursor: pointer;
        top: 10px;
    }
}
</style>