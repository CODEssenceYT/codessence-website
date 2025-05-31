const CHANNEL_ID = 'UCxkJ6Q35F2FjQXh1f56sjrQ'; // Channel ID
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace('UC', 'UU'); // Ubah jadi playlist ID

const pages = {
  home: `
    <h2>Welcome to CODEssenceYT!</h2>
    <p>This is a channel dedicated to coding tutorials, tips, and tech discussions. Subscribe and level up your skills!</p>
  `,
  videos: `
    <h2>Latest Videos</h2>
    <div class="video-container" style="text-align:center;">
      <iframe width="100%" height="400" src="https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}" 
        frameborder="0" allowfullscreen></iframe>
      <p>Subscribe to see more!</p>
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

function loadPage(page) {
  const content = document.getElementById("content");
  content.innerHTML = pages[page] || "<h2>Page not found.</h2>";
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    window.history.pushState({ page }, "", `#${page}`);
    loadPage(page);
  });
});

window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home";
  loadPage(page);
});

const initialPage = location.hash.replace("#", "") || "home";
loadPage(initialPage);
