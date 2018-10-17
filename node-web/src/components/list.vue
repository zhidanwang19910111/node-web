<template>
    <div class="list">
        <div class="list-img">
            <img src="@static/image/banner.jpg" alt="">
        </div>
        <div class="list-flex">

            <div class="list-wrap" v-for="item in listArr" :key="item.name">
                <div>{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name: 'list',
    data () {
        return {
            listArr: []
        }
    },
    mounted () {
        this.initTab();
    },
    methods: {
        initTab () {
            axios.get('/admin/catalog/list')
            .then( res => {
                if( res.sucess && res.data && res.data.length){

                    this.listArr = res.data
                }
            })
        }
    }
}
</script>

<style scoped>
.list{
    width: 1200px;
    margin: 0 auto;
}
.list-flex{
    display: flex;
    justify-content: space-around;
    margin-top: 40px;

}
.list-img{
    width: 1200px;
    height: 200px;
}
.list-img img{
    width: 1200px;
    height: 200px;
}
</style>


