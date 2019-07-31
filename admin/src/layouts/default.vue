<template>
  <v-app>
    <v-app-bar app>
      <img src="~/assets/images/logo.png">
      <v-spacer />
      <!-- TODO: hook up to route name -->
      <v-toolbar-title>Admin</v-toolbar-title>
      <v-spacer />
      <template v-if="employee">
        <v-toolbar-title>{{ employee.name }}</v-toolbar-title>
        <v-avatar :size="36" class="ml-2">
          <img :src="employee.avatarUrl"><!-- TODO: images for users in the DB? I think just randomizing this here would be fine -->
        </v-avatar>
      </template>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      // TODO: Login system, pull content into the store
      // hardcoded
      employee: {
        name: 'PW Herman',
        avatarUrl: require('~/assets/images/peewee.jpg')
      }
    }
  }
}
</script>
<style lang="scss">
  @import "~/assets/styles/base.scss";

  .theme--light.v-sheet > .v-toolbar__content, .v-card__title {
    background: linear-gradient(107deg, rgb(37, 96, 159) 0%, rgb(20, 37, 54) 100%);
    color: #efefef;
  }
</style>
