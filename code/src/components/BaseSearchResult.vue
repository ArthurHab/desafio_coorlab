<template>
    <section class="baseSearchResults flex-grow-1">
        <div v-show="!showData" class="notData">
            Nenhum dado selecionado
        </div>
        <div v-show="showData">
            <div class="d-flex flex-column">
                <div class="cardSpacing titleSpan">
                    Estas são as melhores alternativas de frete que encontramos para você.
                </div>
                <BaseCardTransport :infos="maisBarato" icone="cash-coin"/>
                <BaseCardTransport :infos="maisRapido" icone="clock"/>
                <div class="botaoLimparBox">
                    <BaseButton :action="clearData" text="Limpar"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BaseButton from './BaseButton.vue';
import { mapGetters } from 'vuex';
import BaseCardTransport from './BaseCardTransport.vue';
export default {
    computed: {
        ...mapGetters(['getDataApi','getDados']),
    },
    components: {
    BaseButton,
    BaseCardTransport
},
    watch: {
        getDados: {
            handler(){
                if(!!this.getDados.destino && !!this.getDados.peso){
                    let analisarMaisRapido = this.analisarFreteMaisRapido();
                    let analisarMaisBarato = this.analisarFreteMaisBarato();
                    if(!!analisarMaisRapido && !!analisarMaisBarato){
                        if(this.getDados.peso > 100){
                            this.maisRapido = {
                            transportadora: analisarMaisRapido.name,
                            tempo: analisarMaisRapido.lead_time,
                            preco: (this.formatarPeso(analisarMaisRapido.cost_transport_heavy) * parseInt(this.getDados.peso)).toFixed(2)
                            },
                            this.maisBarato = {
                            transportadora: analisarMaisBarato.name,
                            tempo: analisarMaisBarato.lead_time,
                            preco: (this.formatarPeso(analisarMaisBarato.cost_transport_heavy) * parseInt(this.getDados.peso)).toFixed(2)
                            }
                        } else{
                            this.maisRapido = {
                            transportadora: analisarMaisRapido.name,
                            tempo: analisarMaisRapido.lead_time,
                            preco: (this.formatarPeso(analisarMaisRapido.cost_transport_light) * parseInt(this.getDados.peso)).toFixed(2)
                            },
                            this.maisBarato = {
                            transportadora: analisarMaisBarato.name,
                            tempo: analisarMaisBarato.lead_time,
                            preco: (this.formatarPeso(analisarMaisBarato.cost_transport_light) * parseInt(this.getDados.peso)).toFixed(2)
                            }
                        }
                        this.showData = true;
                    }
                } else{
                    this.showData = false;
                }
            },
            deep: true
        }

    },
    methods:{
        formatarPeso(peso){
            return parseFloat(peso.substring(2, peso.length));
        },
        analisarFreteMaisRapido(){
            let destino = this.getDados.destino;
            let theSameCityArray = this.getDataApi.filter(transport => transport.city === destino);
            
            if (theSameCityArray.length > 1){
                let obj = theSameCityArray[0];
                let tempoAtual = parseInt(obj.lead_time.substring(0, obj.lead_time.length - 1));
                let pesoPesado = this.formatarPeso(obj.cost_transport_heavy);
                let pesoLeve =  this.formatarPeso(obj.cost_transport_light)
                let pesoAtual = parseInt(this.getDados.getPeso);

                theSameCityArray.map((transport) => {
                    if(parseInt(transport.lead_time.substring(0, transport.lead_time.length - 1)) < tempoAtual){
                        obj = transport;
                    } else if(parseInt(transport.lead_time.substring(0, transport.lead_time.length - 1)) === tempoAtual){
                        if (pesoAtual> 100){
                            if(pesoAtual*pesoPesado > pesoAtual*parseFloat(transport.cost_transport_heavy.substring(2, transport.cost_transport_heavy.length)) ){
                                obj = transport;
                            }
                        } else{
                            if(pesoAtual*pesoLeve > pesoAtual*parseFloat(transport.cost_transport_light.substring(2, transport.cost_transport_light.length)) ){
                                obj = transport;
                            }
                        }
                    }
                })
                return obj;
            } else if (theSameCityArray.length === 1){
                return theSameCityArray[0];
            } 
            else{
                return null;
            }
        },
        analisarFreteMaisBarato(){
            let destino = this.getDados.destino;
            let theSameCityArray = this.getDataApi.filter(transport => transport.city === destino);

            if (theSameCityArray.length > 1){
                let obj = theSameCityArray[0];

                let pesoPesado = this.formatarPeso(obj.cost_transport_heavy);
                let pesoLeve = this.formatarPeso(obj.cost_transport_light);
                let pesoAtual = parseInt(this.getDados.peso);

                theSameCityArray.map((transport) => {
                    if (pesoAtual > 100){
                        if(pesoAtual*pesoPesado > pesoAtual*parseFloat(transport.cost_transport_heavy.substring(2, transport.cost_transport_heavy.length)) ){
                                obj = transport;
                            }
                    } else{
                        if(pesoAtual*pesoLeve > pesoAtual*parseFloat(transport.cost_transport_light.substring(2, transport.cost_transport_light.length)) ){
                                obj = transport;
                            }
                    }
                })

                return obj;

            } else if (theSameCityArray.length === 1){
                return theSameCityArray[0];
            }
            else{
                return null;
            }
        },
        clearData(){
            let newData = {
                destino: null,
                peso: null
            }
            this.$store.dispatch('setDados', newData);
            this.$store.dispatch('setLimpar', true);
        }
    },
    data(){
        return{
            showData: false,
            maisBarato: {
                transportadora: '',
                tempo: '',
                preco: ''
            },
            maisRapido: {
                transportadora: '',
                tempo: '',
                preco: ''
            },
        }
    }
}
</script>

<style>
.baseSearchResults{
    font-size: 14px;
}
.cardSpacing{
    margin-bottom: 15px;
}
.iconeSize{
    height: 70%;
    width: 70%;
}
.boxIcon{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background-color: cadetblue;
    border-radius: 10px 0px 0px 10px;
}
.titleSpan{
    font-size: 16px;
}
.botaoLimparBox{
    margin-top: 20px;
    display: flex;
    justify-content: end;
    align-items: end;
}
.notData{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}
</style>