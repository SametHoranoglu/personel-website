// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    });
});


// google maps
function initMap() {
// Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.7503, lng: 39.3172 },
        zoom: 12,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}

//cv button active
  document.querySelector(".btn-outline-danger").addEventListener("click", function () {
    let link = document.createElement("a");
    link.href = "assets/my-cv/my-cv.pdf"; // Göreceli yol
    link.setAttribute("download", "cv_dosyam.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  
//cv yazzdırma 
function printResume() {
  var printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write('<html><head><title>Yazdır</title></head><body>');
  printWindow.document.write('<object data="assets/my-cv/my-cv.pdf" type="application/pdf" width="100%" height="100%"></object>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  printWindow.onload = function() {
    printWindow.print(); // PDF yazdırma işlemi başlatılıyor
  };
}

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//components 

document.addEventListener('DOMContentLoaded', function() {
  const modeToggle = document.getElementById('modeToggle');
  const body = document.body;

  // Karanlık tema geçişi
  modeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      modeToggle.textContent = isDarkMode ? '☀️' : '🌙';
      localStorage.setItem('darkMode', isDarkMode);
  });

  // Kullanıcının karanlık tema tercihini hatırla
  const storedDarkMode = localStorage.getItem('darkMode');
  if (storedDarkMode === 'true') {
      body.classList.add('dark-mode');
      modeToggle.textContent = '☀️';
  }

  // Proje filtreleme
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          const filter = this.dataset.filter;

          // Aktif butonu işaretle
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');

          projectCards.forEach(card => {
              if (filter === 'all' || card.classList.contains(filter)) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });

  // Beğeni butonu (sadece görsel geri bildirim - backend yok)
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(button => {
      button.addEventListener('click', function() {
          this.textContent = '❤️'; // Beğenildiğini görsel olarak göster
          // Burada backend'e istek gönderme gibi işlemler yapılabilir.
      });
  });

  // İletişim formu gönderme (sadece frontend doğrulama - backend yok)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

      const nameInput = this.querySelector('input[type="text"]');
      const emailInput = this.querySelector('input[type="email"]');
      const messageTextarea = this.querySelector('textarea');

      if (!nameInput.value.trim()) {
          alert('Lütfen adınızı girin.');
          return;
      }

      if (!emailInput.value.trim()) {
          alert('Lütfen e-posta adresinizi girin.');
          return;
      } else if (!isValidEmail(emailInput.value.trim())) {
          alert('Lütfen geçerli bir e-posta adresi girin.');
          return;
      }

      if (!messageTextarea.value.trim()) {
          alert('Lütfen mesajınızı girin.');
          return;
      }

      alert('Mesajınız başarıyla gönderildi! (Bu sadece bir frontend örneğidir)');
      this.reset(); // Formu temizle
  });

  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
});
