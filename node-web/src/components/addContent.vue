<template>
    <div class="list">
        <div class="catalog unit">
            <select v-model="selectVal">
                <option :label="item.name" :value="item._id" v-for="item in options" :key="item.name">{{item.name}}</option>
            </select>
        </div>
        <div class="add-tittle unit">
            <span>标题：</span>
            <div>
                <input type="text" placeholder="请输入标题" v-model="addTitle">
            </div>
        </div>

        <div class="add-intro unit">
            <span>简介：</span>
            <div>
                <input type="text" placeholder="请输入简介" v-model="description">
            </div>
        </div>

        <div class="add-content unit">
            <span>内容：</span>
            <div>
                <input type="text" placeholder="请输入内容" v-model="addContent">
            </div>
        </div>
        <div class="list-wrap unit">
            <button @click="submimtContent">保存</button>
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
            options: [],
            selectVal: '',
            addTitle: '',
            description: '',
            addContent: ''
        }
    },
    mounted () {
        this.initOption();
    },
    methods: {
        initOption () {
            let params = this.$route.query;
            axios.get('/admin/catalog/list')
            .then( res => {
                if( res.sucess && res.data && res.data.length){

                    this.options = res.data;
                    if(params && params._id){
                        console.log(params)
                        this.selectVal = params.catalog;
                        
                        this.addTitle = params.title;
                        this.description = params.description;
                        this.addContent = params.content;
                        return;
                    }
                    this.selectVal = this.options[0]._id;
                }
            })
        },
        submimtContent () {
            let params = this.$route.query
            if( params && params._id ){
                axios.post('/admin/content/edit',{
                    id: params._id,
                    title: this.addTitle,
                    catalog: this.selectVal,
                    description: this.description,
                    content: this.addContent,
                })
                .then( res => {
                    if( res.sucess ){
                        this.$router.push('/admins/content')
                    }else{
                        alert(res.message)
                    }
                })
                return;
            }
            axios.post('/admin/content/add', {
                title: this.addTitle,
                catalog: this.selectVal,
                description: this.description,
                content: this.addContent,
            })
            .then( res => {

                if( res.sucess ){
                    this.$router.push('/admins/content')
                }else{
                    alert(res.message)
                }
            })
        }
    }

}
</script>

<style scoped>
input{
    width: 100%;
}
.unit{
    margin-bottom: 20px;
}
.list-wrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
}
</style>


