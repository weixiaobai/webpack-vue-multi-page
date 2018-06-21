<template>
    <div id="app">
        <a><router-link to="/p1vue" >路由2</router-link></a>
        <a ><router-link to="/" >路由1</router-link></a>
        <div class="box">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
}
</script>

<style>
a{color: #000;line-height: 30px;padding:5px;}
.box{width:500px;height: 400px;border: 2px solid #555;}
</style>
