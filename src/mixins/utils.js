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
    }

  }
}
