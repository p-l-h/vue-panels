

<template>
    <div>
        <div v-bind:class="{open: opened}" v-on:click="close()" class="panels-mask"></div>
        <slot></slot>
    </div>
</template>

<script>

    const documentBody = document.body;
    
    let currentPanels = {};
    
    
    const panelsFactory = {
        close: function (id) {
            
            let shownPanels = 0;
            
            for (var key in currentPanels) {
                if (currentPanels[key]['opened']) {
                    shownPanels++;
                }
            }
            
            if (shownPanels <= 1) {
                documentBody.className = documentBody.className.replace('overflow-hidden', '');
            }
            
            
            let currentPanelId = this.opened;
            let $parent = this.$parent;
            
            if (currentPanelId && ($parent['$refs'][currentPanelId])) {
                $parent['$refs'][currentPanelId].close();
                this.opened = false;
                this.$broadcast('panels:closed', currentPanelId);
            }
        },
        open: function (id) {
            
            
            documentBody.className = documentBody.className + ' overflow-hidden';

            
            let currentPanelId = this.opened;
            let $parent = this.$parent;
            let currentPanel = $parent['$refs'][currentPanelId]

            
            if (currentPanelId === id) {
                return;
            }
            
            if (currentPanelId && currentPanel) {
                panelsFactory.close(currentPanelId);
            }
            
            let targetPanel = $parent['$refs'][id];
            if (id && targetPanel) {
                targetPanel.open();
                 this.opened = id;
                 panelsFactory.currentPanel = targetPanel;
                 this.$broadcast('panels:opened', id);
            }
            
           
        }
    }
    
    let id = 0;
    export default {
        data() {
            return {
                panelsFactory: panelsFactory,
                opened: false
            }
        },
        created() {
            this._panels_id = id++;
            currentPanels[this._panels_id] = this;
        },
        methods: {
            close: function (id) {
                id  = id || panelsFactory.opened;
                panelsFactory.close.call(this, id);
            }
        },
        events: {
            'panels:open': function (panelId) {
                panelsFactory.open.call(this, panelId);
            },
            'panels:close': function (panelId) {
                panelsFactory.close.call(this, panelId);
            }
        }
       
    }
</script>

<style lang="sass">

.panels-mask {
    background: #000;
    opacity: .5;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: none;
    
    &.open {
        display: block;
    }
}


.panels {
    -ms-scrollbar-face-color: #EEE; 
    -ms-scrollbar-highlight-color: #555;
    -ms-scrollbar-shadow-color: #EEE; 
    -ms-scrollbar-3dlight-color: #EEE;
    -ms-scrollbar-arrow-color: #EEE; 
    -ms-scrollbar-track-color: #FFF;
    -ms-scrollbar-darkshadow-color: #EEE;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    background:#efefef;
    display:block;
    overflow: auto;
    pointer-events:all;
    position:fixed;
    transition:.5s ease-in-out;
    z-index:1032;
    
}

.panels::-webkit-scrollbar {
    width:5px;
}

.panels::-webkit-scrollbar-thumb {
    background-color:rgba(0,0,0,0.3);
}

.panels::-webkit-scrollbar-thumb:hover {
    background-color:rgba(0,0,0,0.5);
}

.panels::-webkit-scrollbar-track {
    background-color:transparent;
}


.panels.panel-top, .panels.panel-bottom {
    width:100%;
    left: 0;
}

.panels.panel-top.open {
    box-shadow:0 20px 80px 0 rgba(0,0,0,0.7);
}

.panels.panel-bottom.open {
    box-shadow:0 -20px 80px 0 rgba(0,0,0,0.7);
}

.panels.panel-left, .panels.panel-right {
    height:100%;
    top: 0;
}


.panels.panel-left.open {
    box-shadow:20px 0 80px 0 rgba(0,0,0,0.7);
}


.panels.panel-right.open {
    box-shadow:-20px 0 80px 0 rgba(0,0,0,0.7);
}
</style>