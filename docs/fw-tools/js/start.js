'use strict';

//const vConsole = new VConsole();
//window.datgui = new dat.GUI();

const decoder = new TextDecoder("utf-8");

var vue_options = {
    el: "#top",
    mixins: [mixins_bootstrap],
    data: {
        serial_connected: false,
        serial_baud: 115200,
        serial_auto_scroll: true,
        serial_console: "",
    },
    computed: {
    },
    methods: {
        serial_connect: async function(enable){
            try{
                await this.serial_disconnect();
            }catch(error){}

            try{
                var port = await navigator.serial.requestPort();
                await port.open({ baudRate: this.serial_baud });
                this.port = port;
                this.serial_connected = true;
                this.serial_console += "[[connected]]\n";
                this.receiveLoop();
            }catch(error){
                console.log(error);
                alert(error);
            }
        },
        serial_disconnect: async function(){
            if( this.port ){
                if( this.reader )
                    await this.reader.cancel();
                await this.port.close();
                this.port = null;
            }
            this.serial_connected = false;
        },
        data_process: function(value){
            this.serial_console += decoder.decode(value);
            if( this.serial_auto_scroll ){
              const el = document.getElementById('el');
              el.scrollTo(0, el.scrollHeight);
            }
        },
        receiveLoop: async function(){
            if( !this.port || !this.port.readable )
                throw 'port status invalid';

            this.reader = this.port.readable.getReader();
            return new Promise(async (resolve, reject) =>{
                do{
                    try{
                        var { value, done } = await this.reader.read();
                        if( done ){
                            this.serial_console += '[[read done detected]]\n';
                            this.serial_connected = false;
//                            this.serial_disconnect();
                            return reject("read done detected");
                        }
                        this.data_process(value);
                    }catch(error){
                      console.log(error);
                      this.serial_connected = false;
                      this.serial_console += '[[throw exception]]\n';
                      return reject(error);
                    }
                }while(true);
            })
            .catch(error =>{
                console.log(error);
            });
        },
        serial_clear: function(){
            this.serial_console = "";
        }
    },
    created: function(){
    },
    mounted: function(){
        proc_load();
    }
};
vue_add_data(vue_options, { progress_title: '' }); // for progress-dialog
vue_add_global_components(components_bootstrap);
vue_add_global_components(components_utils);

/* add additional components */
  
window.vue = new Vue( vue_options );

