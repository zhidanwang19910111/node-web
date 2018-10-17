<template>
    <div class="admin">
        <p class="admin-wrap">
            <router-link to="/admins/index">管理首页</router-link>
            <router-link to="/admins/user">管理列表页</router-link>
            <router-link to="/admins/catalog">分类列表页</router-link>
            <router-link to="/admins/addCatalog">添加分类</router-link>
            <router-link to="/admins/content">内容首页</router-link>
            <router-link to="/admins/addContent">添加内容</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'list',
    computed: {
        
    },

}
</script>

<style scoped>
.admin{
    width: 1200px;
    margin: 0 auto;
}
.admin-wrap{
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
}
.router-link-active{
    color: red;
}
</style>


