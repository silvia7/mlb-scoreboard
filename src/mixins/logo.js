export const logo ={
  mounted() {
    console.log('hello from mixin!')
  },
  methods: {
    getLogoClass: teamCode => "bbclub-" + teamCode
  }
}
