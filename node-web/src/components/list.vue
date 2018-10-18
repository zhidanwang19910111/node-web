<template>
    <div class="list">
        <div class="list-img">
            <img src="@static/image/banner.jpg" alt="">
        </div>
        <div class="list-flex">

            <div class="list-wrap" v-for="item in listArr" :key="item.name">
                <div @click="catalogClick(item)">{{item.name}}</div>
            </div>
        </div>

        <div class="list-content">
            <div style="overflow:hidden;">
                <div class="list-content-wrap" v-for="(item,index) in contentList" :key="item._id">
                    <div>{{index+1}}</div>
                    <div>{{item.title}}</div>
                    <div>{{item.content}}</div>
                    <div>{{item.description}}</div>
                    <div>{{item.views}}</div>
                    <div>{{item.addTime}}</div>
                    <div @click="viewClick">点击阅读</div>
                    
                </div>
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
            listArr: [],
            catalogId: '',
            contentList: []
        }
    },
    mounted () {
        let that = this;
        this.initTab().then(function(){
            that.initContent();
        })
    },
    methods: {
        initTab () {
            return axios.get('/admin/catalog/list')
            .then( res => {
                if( res.sucess && res.data && res.data.length){

                    this.listArr = res.data
                }
            })
        },
        initContent () {
            let that = this;
            axios.get('/admin//content/list',{
                params: {
                    catalogId: this.catalogId
                }
            })
            .then(function( res ){
                console.log(res)
                that.contentList = res.data
            })
        },
        catalogClick ( item ) {
            this.catalogId = item._id;
            this.initContent();
        },
        viewClick () {
            
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
    margin: 40px 0;

}
.list-img{
    width: 1200px;
    height: 200px;
}
.list-img img{
    width: 1200px;
    height: 200px;
}
.list-content{
    min-height: 400px;
    background-color: #ffffff;
}
.list-content-wrap{
    display: flex;
    justify-content: space-around;
    margin: 20px;
    background: #dcdcdc;

}
</style>


