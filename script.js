document.addEventListener('DOMContentLoaded', function() {
  function attachHoverListeners() {
    let imgCards = document.querySelectorAll('.img-card');
    imgCards.forEach(imgCard => {
      let items = imgCard.querySelector('.items');
      imgCard.addEventListener('mouseenter', () => {
        items.classList.remove('hidden');
      });
      imgCard.addEventListener('mouseleave', () => {
        items.classList.add('hidden');
      });
    });
  }

  attachHoverListeners();

  let generateForm = document.querySelector('#search-form');
  let imgGallery = document.querySelector('.image-gallery');

  let unsplashAccessKey = 'k6RjM51KHhISLyo8e2Uo0FrjzuyArF_5cKC6t8PtitE'; 
  let unsplashApiUrl = 'https://api.unsplash.com/photos/random';

  let generateAllImages = async (query, quantity) => {
    try {
      let response = await fetch(`${unsplashApiUrl}?query=${query}&count=${quantity}`, {
        headers: {
          'Authorization': `Client-ID ${unsplashAccessKey}`
        }
      });

      if (!response.ok) {
        let errorText = await response.text();
        throw new Error(`Request failed: ${errorText}`);
      }

      let data = await response.json();
      console.log(data);

      
      let imgCardMarkup = data.map((imgData, index) => `
        <div class="img-card">
          <img src="${imgData.urls.regular}" width="300" height="300">
        </div>
      `).join('');

      imgGallery.innerHTML = imgCardMarkup;
      attachHoverListeners();

    } catch (error) {
      alert(error.message);
    }
  }

  let formSubmit = (e) => {
    e.preventDefault();
    let userQuery = e.target.querySelector('input[type="text"]').value;
    let userImgQuantity = e.target.querySelector('#img-selector').value;

    
    switch (userImgQuantity) {
      case '1img':
        generateAllImages(userQuery, 1);
        break;
      case '2img':
        generateAllImages(userQuery, 2);
        break;
      case '3img':
        generateAllImages(userQuery, 3);
        break;
      case '4img':
        generateAllImages(userQuery, 4);
        break;
      default:
        
        alert('Invalid selection');
    }
  }

  generateForm.addEventListener('submit', formSubmit);
});
