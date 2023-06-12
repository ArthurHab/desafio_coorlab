<template>
    <div class="d-flex flex-row cardSpacing">
        <div class="flex-grow-1 d-flex flex-row cardInfo">
            <div class="boxIcon">                          
                <b-icon :icon="iconeReturn" class="iconeSize"></b-icon>
                </div>
                <div class="d-flex flex-column cardInfoText">
                    <span class="bold">Frete com menor valor</span>
                    <span>Transportadora: {{ infos.transportadora }}</span>
                    <span>Tempo estimado: {{ infos.tempo }}</span>
                </div>
        </div>
        <div class=" d-flex flex-column preco cardInfoPrice">
            <span class="bold">Preço</span>
            <span>R$ {{ infos.preco }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['infos','icone'],
    computed: {
        iconeReturn(){
            return this.icone;
        }
    }
}
</script>

<style>
.bold{
    font-weight: bold;
}
.preco{
    width: 150px;
}
.cardInfo{
    margin-right: 10px;
    background-color: rgb(232, 232, 232);
    border-radius: 10px;
}
.cardInfoText{
    padding: 15px 15px;
    border-radius: 0px 10px 10px 0px;
}
.cardInfoPrice{
    border-radius: 10px;
    background-color: rgb(232, 232, 232);
    padding: 10px 30px;
    justify-content: center;
    align-items:flex-start;
}
</style>