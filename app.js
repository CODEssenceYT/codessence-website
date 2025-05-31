const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Ganti dengan API key yang kamu dapatkan
const CHANNEL_ID = 'UCxkJ6Q35F2FjQXh1f56sjrQ'; // Ganti dengan ID channel YouTube yang diinginkan

const pages = {
  home: `
    <h2>Welcome to CODEssenceYT!</h2>
    <p>This is a channel dedicated to coding tutorials, tips, and tech discussions. Subscribe and level up your skills!</p>
  `,
  videos: `
    <h2>Latest Videos</h2>
    <div id="video-list" class="video-container">
      <!-- Video akan dimuat di sini -->
    </div>
  `,
  about: `
    <h2>About CODEssenceYT</h2>
    <p>We are passionate about helping people learn to code. Whether you're a beginner or experienced developer, you'll find value here.</p>
  `,
  contact: `
    <h2>Contact Us</h2>
    <p>Email: contact@codessenceyt.com</p>
    <p>Follow us on social media for updates!</p>
  `
};

// Memuat halaman video dengan data YouTube
function loadVideos() {
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video`)
    .then(response => response.json())
    .then(data => {
      const videoListContainer = document.getElementById("video-list");
      videoListContainer.innerHTML = ''; // Kosongkan dulu

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const videoDescription = item.snippet.description;

        // Membuat elemen video
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        
        videoItem.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <h4>${videoTitle}</h4>
          <p>${videoDescription}</p>
        `;

        videoListContainer.appendChild(videoItem);
      });
    })
    .catch(err => {
      console.error('Error fetching videos: ', err);
    });
}

function loadPage(page) {
  const content = document.getElementById("content");
  content.innerHTML = pages[page] || "<h2>Page not found.</h2>";

  // Jika halaman "videos", load video dari YouTube
  if (page === "videos") {
    loadVideos();
  }
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    window.history.pushState({ page }, "", `#${page}`);
    loadPage(page);
  });
});

// Handle browser back/forward
window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home";
  loadPage(page);
});

// Initial load
const initialPage = location.hash.replace("#", "") || "home";
loadPage(initialPage);
