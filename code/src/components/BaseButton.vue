<template>
    <button class="button" @click="action">{{text}}</button>
</template>

<script>
export default{
    props: ['action','text'],
}
</script>

<style>
.button{
    padding: 5px 30px;
    background-color: cadetblue;
    font-size: 14px;
    border: none;
    border-radius: 10px;
}
</style>