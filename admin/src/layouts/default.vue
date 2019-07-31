<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Logo</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title>Mymy Admin</v-toolbar-title>
      <v-spacer />
      <template v-if="employee">
        <v-toolbar-title>{{ employee.name }}</v-toolbar-title>
        <v-avatar :size="36">
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
      employee: {
          name: 'PW Herman',
          avatarUrl: '/v.png'
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
  @import "~/assets/styles/base.scss";
</style>
