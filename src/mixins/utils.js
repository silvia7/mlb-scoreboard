export const utils ={
  methods: {
    /* Returns a class name of the team for logo rendering
     * @param: {String} teamCode
     */
    getLogoClass: teamCode => "bbclub-" + teamCode,

    /* Returns corresponding date object if string is valid date string, else return null
     * @param: {String} date in yyyy/mm/dd format
     */
    stringToDate: function ( dateStr ) {
      let date = new Date( dateStr );

      if ( isNaN( date.getTime() ) ) return null;
      return date;
    },

    /* Returns a string of number with padding 0 added to the front, if number is less than 10
     * @param: {Number}
     */
    toTwoDigits: function (n) {
        n = n >= 10 ? '' + n : '0' + n;
        return n;
    }

  }
}
