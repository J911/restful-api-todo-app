<template>
    <div id="signInComponent">
        <div class="header">
            <h3>Todo Connect</h3>
        </div>
        <div class="inputs">
            <input type="text" class="inputs__input" name="name" v-model="name" placeholder="Account name">
            <input type="password" class="inputs__input" name="password" v-model="password" placeholder="Account password">
            <input type="button" class="inputs__button" value="SIGN IN" @click="signIn()">
            <input type="button" class="inputs__button--red" value="SIGN UP">
        </div>
    </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import HttpService from '../../service/http.service'

  @Component
  export default class SignInComponent extends Vue {

    public name: string;
    public password: string;

    private httpService: HttpService;

    constructor() {
      super();
      this.httpService = new HttpService();
    }


    public async signIn(): void {
      const result = await this.httpService.httpPost('/auth/sign-in', {
        name: '123',
        password: '1234'
      });
      console.log(result);
    }

  }
</script>
<style>
    @import '../../style/spa/auth/sign-in.css';
</style>
