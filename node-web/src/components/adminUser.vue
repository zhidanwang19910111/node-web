<template>
    <div class="list">
        <div class="list-wrap" v-for="item in userList" :key="item._id">
            <div>
                <span>用户名字:</span>
                <span>{{item.username}}</span>
            </div>
            <div>
                <span>用户id:</span>
                 <span>{{item._id}}</span>
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
            axios.get('/admin/allUser', {
                params: {
                    page: 1,
                    limit: 2
                }
            })
            .then( res => {
                if( res.sucess && res.data && res.data.length){

                    this.userList = res.data
                }
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


