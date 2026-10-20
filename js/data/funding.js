/* PokéSurvival no habilita donaciones ni patrocinios. */
G.Funding = {
  kofi: '',
  sponsors: '',
  costs: [],
  get url() { return this.kofi ? 'https://ko-fi.com/' + this.kofi : ''; }
};
