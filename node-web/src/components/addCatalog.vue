<template>
    <div class="list">

        <div class="list-wrap">
            <span>添加分类：</span>
            <input type="text" v-model="catalogName" />
            <button @click="submimtCatalog">保存</button>
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
            catalogName: '',
            catalogId: ''
        }
    },
    mounted () {
        if(this.$route.query && this.$route.query.id){
            this.catalogName = this.$route.query.name;
            this.catalogId = this.$route.query.id;
        }
    },
    methods: {
        submimtCatalog () {

            if( this.$route.query && this.$route.query.id ){
                axios.post('/admin/catalog/edit',{
                    name: this.catalogName,
                    id: this.catalogId
                })
                .then( res => {
                    if( res.sucess ){
                        this.$router.push('/admins/catalog')
                    }else{
                        alert(res.message)
                    }
                })
                return;
            }
            axios.post('/admin/catalog/add', {
                name: this.catalogName
            })
            .then( res => {

                if( !res.sucess ){
                    alert(res.message)
                    return;
                }
                this.$router.push('/admins/catalog')
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
    justify-content: space-around;
}
</style>


