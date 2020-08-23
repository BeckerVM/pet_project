function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah')
        .attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}



const app = new Vue({
  el: '#app',
  delimiters: ["[[", "]]"],
  data: {
    openMenuVertical: false,
    url: window.location.href,
    petWeb: { nombre: '', informacion: '', historia: '', sexo: '', pelaje: '', tamano: '' },
    petImagesWeb: [],
    petImageWebSelected: '',
    petsWeb: [],
    newsWeb: [],
    storiesWeb: [],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    donations: [],
    voucher: ''
  },
  created: function () {
    this.url = window.location.href
    this.getPetbyId()
    this.getPets()
    this.getPetsByAge()
    this.getNewsAdmin()
    this.getStoriesAdmin()
    this.getDonationsAdmin()
  },
  methods: {
    //INICIO - ADMIN
    getNewsAdmin: function () {
      if (this.url.includes('/dashboard/news')) {
        axios.post('http://localhost:5000/dashboard/news').then((response) => {
          this.newsWeb = response.data.news
          console.log(this.newsWeb)
        })
      }
    },
    getStoriesAdmin: function () {
      if (this.url.includes('/dashboard/stories')) {
        axios.post('http://localhost:5000/dashboard/stories').then((response) => {
          this.storiesWeb = response.data.stories
          console.log(this.storiesWeb)
        })
      }
    },
    getDonationsAdmin: function() {
      if(this.url.includes('/dashboard/donations')) {
        axios.post('http://localhost:5000/dashboard/donations').then((response) => {
          this.donations = response.data.donations
        })
      }
    },
    //FIN - ADMIN
    //INICIO - MASCOTAS - CLIENT
    getPetbyId: function () {

      if (this.url.includes('/pet/')) {//PARA LA INFO DE LA MASCOTA INDIVIDUAL
        const petId = this.url.split('/')[4]

        axios.post(`http://localhost:5000/pet/${petId}`).then((response) => {
          this.petWeb = response.data.pet[0]
          this.petImagesWeb = response.data.petImages,
            this.petImageWebSelected = this.petImagesWeb[0]
          console.log(this.petImagesWeb)
        })
      }
    },
    getPets: function () {
      if (this.url.includes('/pets')) {
        axios.post('http://localhost:5000/pets').then((response) => {
          this.petsWeb = response.data.pets
          console.log(this.petsWeb)
        })
      }
    },
    getPetsByAge: function () {
      if (this.url.includes('/pets/')) {
        const petAge = this.url.split('/')[4]

        axios.post(`http://localhost:5000/pets/${petAge}`).then((response) => {
          this.petsWeb = response.data.pets
        })
      }
    },
    changePetImageWeb: function (petImageWeb) {
      this.petImageWebSelected = petImageWeb
      console.log(this.petImageWebSelected)
    },
    //FIN - MASCOTAS




































































    openMenu: function () {
      const bod = document.getElementById('body')
      const menu = document.getElementById('menu')
      bod.classList.add('scroll')
      menu.classList.add('open')
      this.openMenuVertical = true
    },
    closeMenu: function () {
      const bod = document.getElementById('body')
      const menu = document.getElementById('menu')
      bod.classList.remove('scroll')
      menu.classList.remove('open')
      this.openMenuVertical = false
    },
    //INICIO - DONACIONES
    openDonation: function () {
      const bod = document.getElementById('body')
      const donation = document.getElementById('donation')
      bod.classList.add('scroll')
      donation.classList.add('open_donation')
    },
    closeDonation: function () {
      const bod = document.getElementById('body')
      const donation = document.getElementById('donation')

      if (!this.openMenuVertical) {
        bod.classList.remove('scroll')
      }

      donation.classList.remove('open_donation')
    },
    openVoucher: function(urlVoucher) {
      this.voucher = urlVoucher
      const bod = document.getElementById('body')
      const voucher = document.getElementById('voucher')
      bod.classList.add('scroll')
      voucher.classList.add('open_donation')
      
    },
    closeVoucher: function() {
      this.voucher = ''
      const bod = document.getElementById('body')
      const voucher = document.getElementById('voucher')
      bod.classList.remove('scroll')
      voucher.classList.remove('open_donation')
    }
    //FIN - DONACIONES

  }
})