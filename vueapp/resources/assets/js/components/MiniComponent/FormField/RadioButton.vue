<template>
   
        <div :class="classname">
            <label for="HOurs" :style="labelStyle">{{ label }}</label>
            <tool-tip v-if="hint" :message="lang(hint)" size="small"></tool-tip>
            <div>
            <div class="row">
                <div :class="optionClass" v-for="(option,index) in options">
                    <input class="radio_align" :name="name" v-model="checked"  type="radio" :value="option.value"> {{lang(option.name)}}&nbsp;<tool-tip v-if="option.hint" :message="lang(option.hint)" size="small"></tool-tip>&nbsp;
                 </div>
            </div>
        </div>
        </div>
    

</template>

<script>
    import ToolTip from 'components/MiniComponent/ToolTip'
    export default {
        name : "checkbox",

        description : "Checkbox with default css class and other required props to be used throughout the project",

        props : {

            options : {type:Array,default:()=>{}},

            value : {type: Number | String, default: 0},

            name : {type: String, default: 'radio'},

            label : {type: String, default: 'label'},

            classname : {type: String, default: 'col-sm-4'},

            optionClass : {type: String, default: 'col-sm-4'},

            /**
             * The function which will be called as soon as value of the field changes
             * It should have two arguments `value` and `name`
             *     `value` will be the updated value of the field
             *     `name` will be thw name of the state in the parent class
             *
             * An example function :  
             *         onChange(value, name){
             *             this[name]= selectedValue
             *         }
             *         
             * @type {Function}
             */
            onChange:{type: Function, Required: true},

            labelStyle:{type:Object, default: () => {} },

            hint : { type : String , default : '' }
        },

        data(){
            return {

                /**
                 * value of the checkbox field
                 * @type {Boolean}
                 */
                checked: this.value 
            }
        },

        watch:{

            value(newValue,oldValue){
                this.checked = newValue
            },

            checked(newVal){

                //calls onChange method of parent component to update values
                this.onChange(newVal, this.name)
            }
        },
    
        components:{
            'tool-tip': ToolTip
        }

    };

</script>

<style type="text/css">
    .absolute {
        position: absolute;
        margin-left: 5px;
    }

.radio_align {
    width: 13px;
    height: 13px;
    padding: 0;
    margin:0;
    vertical-align: bottom;
    position: relative;
    top: -3px;
    *overflow: hidden;
}
</style>