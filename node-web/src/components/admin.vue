<template>
    <div class="admin">
        <p>
            <router-link to="/admins/index">管理首页</router-link>
            <router-link to="/admins/user">管理列表页</router-link>
            <router-link to="/admins/catalog">分类列表页</router-link>
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

</style>


