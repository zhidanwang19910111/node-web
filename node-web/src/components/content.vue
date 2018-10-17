<template>
    <div class="list">
        <div class="list-wrap" v-for="item in userList" :key="item._id">
            <div>
                <span>分类名字:</span>
                <span>{{item.title}}</span>
            </div>
            <div>
                <span>内容id:</span>
                 <span>{{item._id}}</span>
            </div>

            <div>
                <button @click="catalogEdit(item.name, item._id)">修改</button>
                <button @click="catalogDelete(item._id)">删除</button>
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
            userList: []
        }
    },
    mounted () {
        this.initUser()
    },
    methods: {
        initUser () {
            axios.get('/admin/content/list')
            .then( res => {
                if( res.sucess && res.data && res.data.length){

                    this.userList = res.data
                }
            })
        },
        catalogEdit (name, id) {
            this.$router.push({
                path: '/admins/addCatalog',
                query: {
                    id: id,
                    name: name
                }
            })
        },
        catalogDelete (id){
            axios.post('/admin/catalog/delete',{
                id: id
            })
            .then( res => {
                if( !res.sucess ){
                    alert(res.message)
                    return;
                }

                alert(res.message);
                this.$router.go(0)
            })
        }
    }

}
</script>

<style scoped>
.list-wrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
}
</style>


