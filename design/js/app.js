

const app = new Vue({
  el: '#app',
  data: {
    openMenuVertical: false
  },
  methods: {
    openMenu: function() {
      const bod = document.getElementById('body')
      const menu = document.getElementById('menu')
      bod.classList.add('scroll')
      menu.classList.add('open')
      this.openMenuVertical = true
    },
    closeMenu: function() {
      const bod = document.getElementById('body')
      const menu = document.getElementById('menu')
      bod.classList.remove('scroll')
      menu.classList.remove('open')
      this.openMenuVertical = false
    },
    //INICIO - DONACIONES
    openDonation: () => {
      console.log('Holis')
      const bod = document.getElementById('body')
      const donation = document.getElementById('donation')
      bod.classList.add('scroll')
      donation.classList.add('open_donation')
    },
    closeDonation: function() {
      const bod = document.getElementById('body')
      const donation = document.getElementById('donation')

      if(!this.openMenuVertical) {
        console.log('===')
        bod.classList.remove('scroll')
      }

      donation.classList.remove('open_donation')
    }
    //FIN - DONACIONES
  }
})