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
        // if(this.$route.query && this.$route.query.id){
        //     this.catalogName = this.$route.query.name;
        //     this.catalogId = this.$route.query.id;
        // }
        this.initOption();
    },
    methods: {
        initOption () {
            axios.get('/admin/catalog/list')
            .then( res => {
                if( res.sucess && res.data && res.data.length){

                    this.options = res.data;
                    this.selectVal = this.options[0].name
                }
            })
        },
        submimtContent () {

            // if( this.$route.query && this.$route.query.id ){
            //     axios.post('/admin/catalog/edit',{
            //         name: this.catalogName,
            //         id: this.catalogId
            //     })
            //     .then( res => {
            //         if( res.sucess ){
            //             this.$router.push('/admins/catalog')
            //         }else{
            //             alert(res.message)
            //         }
            //     })
            //     return;
            // }
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


