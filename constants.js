module.exports = class Constants {
  static get DEFAULT_ACTIVITY() {
    return {
      details: '🔍 Navegando...',
      state: `🌐 ${Constants.URL.split('https://').pop()}`,
      timestamps: { start: Date.now() },
      assets: {
        large_image: 'wiseflix', // large image key from developer portal > rich presence > art assets
        large_text: 'Filmes e Séries Online'
      },
      buttons: [
        { label: 'Acessar Wiseflix', url: Constants.URL }
      ]
    }
  }

  static get URL() {
    return 'https://wiseflix.me'
  }
}