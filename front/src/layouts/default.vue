<template>
  <v-app>
    <v-toolbar :clipped-left="true"
               fixed
               app>
      <v-toolbar-title>Logo</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer />
      <template v-if="employeeInfo">
        <v-toolbar-title>{{ employeeInfo.name }}</v-toolbar-title>
        <v-avatar :size="36">
            <img src="/v.png"><!-- TODO: images for users in the DB? I think just randomizing this here would be fine -->
        </v-avatar>
      </template>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="true" app>
      <span>abc please delete me?</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
    data () {
        return {
            employeeInfo: {
                name: 'PW Herman'
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
