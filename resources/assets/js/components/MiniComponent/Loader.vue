<template>

        <div>
            <div class="center-of-page">
                <bounce-loader size="60px" class="loader-position" :color="color"></bounce-loader>
            </div>
            <div class="full-page"></div>
        </div>

</template>

<script>
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

    export default {
        components:{
            'bounce-loader': BounceLoader
        },
        props:{
            duration:{type:Number, default: 4000},
            color : { type : String, default : config.color}
        }
    };
</script>

<style type="text/css">
    .center-of-page{
        width: 100px;
        height: 100px;
        text-align: center;
        position: fixed;
        top: 25%;
        left: 12%;
        transform: translate(-50%, -50%);
        transform: -webkit-translate(-50%, -50%);
        transform: -moz-translate(-50%, -50%);
        transform: -ms-translate(-50%, -50%);
        bottom: 0;
        right: 0;
        z-index:100000;
        margin: auto;
    }


</style>