function scrollToApp() {
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// STEP 1: Define the playlist data object
// =====================================================
const playlistData = {
  focus: [
    { title: "Tycho — Awake", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80" },
    { title: "Lo-fi Beats", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80" },
    { title: "Hans Zimmer — Time", cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&q=80" },
    { title: "Bonus: Brian Eno — An Ending", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80" },
  ],
  chill: [
    { title: "Frank Ocean — Pink + White", cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
    { title: "SZA — Good Days", cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&q=80" },
    { title: "Daniel Caesar — Best Part", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&q=80" },
    { title: "Bonus: Beach House — Space Song", cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&q=80" },
  ],
  hype: [
    { title: "Drake — Nonstop", cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80" },
    { title: "Travis Scott — SICKO MODE", cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80" },
    { title: "Kanye West — POWER", cover: "https://images.unsplash.com/photo-1464375117522-1311dd6d0cd1?w=300&q=80" },
    { title: "Bonus: Run The Jewels — Legend Has It", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80" },
  ],
};

/* DOM ELEMENTS */
const selector = document.getElementById("mood-selector");
const modeSelector = document.getElementById("mode-selector");
const container = document.getElementById("playlist-container");
const feedback = document.getElementById("feedback");
const milestone = document.getElementById("milestone");

// Counts songs removed in the current playlist. Powers the milestone tracker.
let songsRemovedCount = 0;

/* =====================================================
   STEP 2: Basic Event Listener Setup
   ===================================================== */
selector.addEventListener("change", buildPlaylist);
modeSelector.addEventListener("change", buildPlaylist);

function buildPlaylist() {
  /* =====================================================
     STEP 3: Getting the Selected Mood
     ===================================================== */
  const mood = selector.value;
  console.log("Selected mood:", mood);

  if (!mood) {
    feedback.textContent = "Your personalized playlist will appear here.";
    feedback.className = "feedback-box";
    container.innerHTML = "";
    milestone.textContent = "";
    return;
  }

  /* =====================================================
     STEP 4: Dynamic Data Access
     ===================================================== */
  const allSongs = playlistData[mood];
  console.log("Songs for this mood:", allSongs);

  /* =====================================================
     STEP 5: Listening Mode Logic
     ===================================================== */
  const mode = modeSelector.value;
  let songs;

  if (mode === "quickPlay") {
    songs = allSongs.slice(0, 3);
  } else if (mode === "fullSession") {
    songs = allSongs;
  } else {
    songs = allSongs; // fallback
  }

  /* =====================================================
     STEP 6: Conditional Feedback
     ===================================================== */
  container.innerHTML = "";
  songsRemovedCount = 0;
  milestone.textContent = "";

  if (!songs || songs.length === 0) {
    feedback.textContent = "No songs found for this mood.";
    feedback.className = "feedback-box error";
  } else {
    feedback.textContent = `Loaded ${songs.length} songs for your ${mood} playlist.`;
    feedback.className = "feedback-box success";
  }

  /* =====================================================
     STEP 7: The Loop
     ===================================================== */
  if (songs && songs.length > 0) {
    songs.forEach((song) => {
      /* =====================================================
         STEP 8: Create and Display DOM Elements
         ===================================================== */
      const row = document.createElement("div");
      row.className = "song-row";

      const img = document.createElement("img");
      img.src = song.cover;
      img.alt = song.title;
      img.onerror = function () {
        this.src = "https://placehold.co/60x60?text=Music";
      };

      const titleSpan = document.createElement("span");
      titleSpan.textContent = song.title;

      const hintSpan = document.createElement("span");
      hintSpan.className = "remove-hint";
      hintSpan.textContent = "click to remove";

      row.appendChild(img);
      row.appendChild(titleSpan);
      row.appendChild(hintSpan);

      /* =====================================================
         STEP 9: DOM Element Removal on Click
         ===================================================== */
      row.addEventListener("click", function () {
        row.classList.add("removing");
        setTimeout(() => {
          row.remove();
          songsRemovedCount++;
          updateMilestone();
        }, 200);
      });

      container.appendChild(row);
    });
  }
}

/* =====================================================
   STEP 10: Milestone Tracking (Bonus)
   ===================================================== */
function updateMilestone() {
  const milestones = [
    { count: 1, message: "🎵 First song cleared!" },
    { count: 3, message: "🔥 Three songs down — keep the vibe going!" },
    { count: 4, message: "⭐ Full playlist cleared. You're on fire!" },
  ];

  milestones.forEach((m) => {
    if (songsRemovedCount === m.count) {
      milestone.textContent = m.message;
    }
  });
}
