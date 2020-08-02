const app = new Vue({
  el: '#app',
  delimiters: ["[[", "]]"],
  data: {
    openMenuVertical: false,
    url: window.location.href,
    petWeb: { nombre: '', informacion: '', historia: '', sexo: '', pelaje: '', tamano: '' },
    petImagesWeb: [],
    petImageWebSelected: '',
    petsWeb: []
  },
  created: function() {
    this.url = window.location.href
    this.getPetbyId()
    this.getPets()
    this.getPetsByAge()
  },
  methods: {
    //INICIO - MASCOTAS
    getPetbyId: function() {

      if(this.url.includes('/pet/')) {//PARA LA INFO DE LA MASCOTA INDIVIDUAL
        const petId = this.url.split('/')[4]

        axios.post(`http://localhost:5000/pet/${petId}`).then((response) => {
          this.petWeb = response.data.pet[0]
          this.petImagesWeb = response.data.petImages,
          this.petImageWebSelected = this.petImagesWeb[0]
          console.log(this.petImagesWeb)
        })
      }
    },
    getPets: function() {
      if(this.url.includes('/pets')) {
        axios.post('http://localhost:5000/pets').then((response) => {
          this.petsWeb = response.data.pets
        })
      }
    },
    getPetsByAge: function() {
      if(this.url.includes('/pets/')) {
        const petAge = this.url.split('/')[4]

        axios.post(`http://localhost:5000/pets/${petAge}`).then((response) => {
          this.petsWeb = response.data.pets
        })
      }
    },
    changePetImageWeb: function(petImageWeb) {
      this.petImageWebSelected = petImageWeb
      console.log(this.petImageWebSelected)
    },
    //FIN - MASCOTAS




































































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
    openDonation: function() {
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
        bod.classList.remove('scroll')
      }

      donation.classList.remove('open_donation')
    }
    //FIN - DONACIONES

  }
})