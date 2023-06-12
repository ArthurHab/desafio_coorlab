<template>
    <div class="cardForm">
        <div>
            <b-icon icon="map" class="iconeMap"></b-icon>
            <span class="titleForm">Insira o destino e o peso</span>
        </div>
        <b-form @submit.prevent="handleClick" class="form">
            <label for="city" class="labelAjust">Destino</label>
            <b-form-select class="selectCity" v-model="city" :options="cities">
            </b-form-select>
            <b-form-group label="Peso">
                <b-form-input v-model="peso" aria-required="true" type="number"></b-form-input>
            </b-form-group>
            <BaseButton :action="verifyModal" text="Analisar"/>
        </b-form>
        <b-modal v-model="modalShow" hide-footer hide-header class="modal">
            <div class="cardModal">
                <b-icon icon="exclamation-square" class="icone"></b-icon>
                <span>Insira os valores para realizar a análise</span>
                <BaseButton :action="closeModal" text="Fechar"/>
            </div>
        </b-modal>

    </div>
</template>

<script>
import {
    BForm,
    BModal,
    BFormGroup,
    BFormInput,
    BIcon
} from 'bootstrap-vue'
import BaseButton from './BaseButton.vue';
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['getDataApi','getDestino','getPeso','getLimpar']),
        cities(){
            return this.getCitiesName();
        }
    },
    components: {
        BForm,
        BFormGroup,
        BFormInput,
        BModal,
        BaseButton,
        BIcon
    },
    watch:{
        getLimpar: {
            handler(){
                if(this.getLimpar === true){
                    this.clearData();
                    this.$store.dispatch('setLimpar', false);
                }
            }
        },

    },
    data(){
        return{
            city: null,
            peso: null,
            modalShow: false
        }
    },
    methods: {
        onSubmit(event){
            event.preventDefault();
            console.log('foi')
        },
        handleClick(){
            let newData = {
                destino: this.city,
                peso: this.peso
            }
            this.$store.dispatch('setDados', newData);
        },
        OpenModal(){
            this.modalShow = true;
        },
        closeModal(){
            this.modalShow = false;
        },
        getCitiesName(){
            let cities = [{ text: 'Selecione o destino', value: null}];
            this.getDataApi.map((transport) => {
                cities.push(transport.city)
            })
            cities = [...new Set(cities)];
            return cities;
        },
        clearData(){
            this.city = null,
            this.peso = null
        },
        verifyModal(){
            if(this.city == null || this.peso == null || this.peso.length < 1){
                this.OpenModal();
            }
        }
    }
}
</script>

<style>
.cardForm{
    font-size: 18px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding: 0px 30px;
    background-color: rgb(232, 232, 232);
    border-radius: 10px;
}
.form{
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.titleForm{
    font-weight: 500;
}
.cardModal{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 40px 0px;
    font-size: 18px;
}
.selectCity{
    font-size: 14px;
    width: 100%;
    padding: 6px 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}
.icone{
    height: 40px;
    width: 40px;
}
.iconeMap{
    margin-right: 5px;
}
.labelAjust{
    text-align: start;
    width: 100%;
}
</style>