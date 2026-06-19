/**
 * European Super League Quiz Group - UI Interactions & Shared State Audio Engine
 */

// Global playlist array state configurations
const playlist = [
    { src: 'track1.mp3', title: 'ESL Official Anthem', artist: 'Mariah' },
    { src: 'track2.mp3', title: 'Track 2', artist: 'ESL' },
    { src: 'track3.mp3', title: 'Track 3', artist: 'ESL' },
    { src: 'track4.mp3', title: 'Track 4', artist: 'ESL' },
    { src: 'track5.mp3', title: 'Track 5', artist: 'ESL' }, 
    { src: 'track6.mp3', title: 'Track 6', artist: 'ESL' }, 
];

let currentTrackIndex = 0;
let isAudioPlaying = false;

// ==========================================================================
// CENTRAL MANAGER PROFILE DATABASE
// ==========================================================================
const managerDatabase = {
    "eskay": {
        name: "Eskay",
        club: "Mamelodi Sundowns / Real Madrid",
        titles: "5 ESL Trophies",
        ballonDor: "2-Time Winner",
        status: "Active Legend",
        bio: "Widely regarded as one of the most clinical minds in ESL quiz history. Known for shifting match momentum during high-pressure knockout stages."
    },
    "daylin": {
        name: "Daylin",
        club: "Manchester City",
        titles: "3 ESL Trophies",
        ballonDor: "1-Time Winner",
        status: "Active Contender",
        bio: "A tactical mastermind who relies on meticulous depth and historical trivia accuracy to secure crucial league clean sheets."
    },
    "jean": {
        name: "Jean",
        club: "Arsenal / Barcelona",
        titles: "2 ESL Trophies",
        ballonDor: "0",
        status: "Elite Veteran",
        bio: "Consistently lethal from set-pieces and sudden-death tiebreakers. Jean remains a tier-one threat on any given tournament week."
    },
    "yaqeen": {
        name: "Yaqeen",
        club: "Liverpool / AC Milan",
        titles: "1 ESL Trophy",
        ballonDor: "1-Time Winner",
        status: "Title Challenger",
        bio: "A highly explosive competitor capable of sweeping major tournaments. Famed for holding the record for the highest scoring run in a single season group stage."
    },
    "daniel": {
        name: "Daniel",
        club: "Chelsea / Paris Saint-Germain",
        titles: "League Commissioner",
        ballonDor: "Honorary President",
        status: "ESL Board Boardroom",
        bio: "The foundational architect and structural operator managing the European Super League's dynamic infrastructure, regulations, and tournament layouts."
    }
};

window.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // PART 1: STAGGERED OPENING CARD GRID SEQUENCE (Safe Check for Index Page)
    // ==========================================================================
    const cards = document.querySelectorAll('.competition-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });

    // ==========================================================================
    // PART 2: REAL-TIME SEARCH FILTER INPUT SYSTEM
    // ==========================================================================
    const searchInput = document.getElementById('groupSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    const applyCombinedFilters = () => {
        const query = searchInput.value.toLowerCase().trim();
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

        cards.forEach(card => {
            const textContent = card.textContent.toLowerCase();
            const matchesCategory = (selectedCategory === 'all' || card.classList.contains(selectedCategory));
            const matchesSearch = (query === "" || textContent.includes(query));

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                card.classList.add('fade-in');
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });
    };

    if (searchInput) {
        searchInput.addEventListener('input', applyCombinedFilters);
    }

    // ==========================================================================
    // PART 3: CATEGORY QUICK-FILTER PILLS ENGINE
    // ==========================================================================
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyCombinedFilters();
        });
    });

    // ==========================================================================
    // PART 4: SIDEBAR DRAWER (WALL OF ESL BACKGROUND SCROLL LOCK SETUP)
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const sidebarPanel = document.getElementById('sidebarPanel');
    const closeMenu = document.getElementById('closeMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    const openSidebar = () => {
        if (sidebarPanel && sidebarOverlay) {
            sidebarPanel.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.classList.add('no-scroll'); 
        }
    };

    const closeSidebar = () => {
        if (sidebarPanel && sidebarOverlay) {
            sidebarPanel.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll'); 
        }
    };

    if (menuToggle) menuToggle.addEventListener('click', openSidebar);
    if (closeMenu) closeMenu.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // ==========================================================================
    // PART 4B: DIRECT HTML-TO-MODAL CONTROLLER HOOKS
    // ==========================================================================
    const managerModal = document.getElementById('managerModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');

    const modalTitle = document.getElementById('modalManagerName');
    const modalClub = document.getElementById('modalManagerClub');
    const modalTitles = document.getElementById('modalManagerTitles');
    const modalDor = document.getElementById('modalManagerDor');
    const modalStatus = document.getElementById('modalManagerStatus');
    const modalBio = document.getElementById('modalManagerBio');

    const closeManagerModal = () => {
        if (managerModal) managerModal.classList.remove('active');
        if (modalOverlay) modalOverlay.classList.remove('active');
        
        const sidebarPanel = document.getElementById('sidebarPanel');
        if (!sidebarPanel || !sidebarPanel.classList.contains('active')) {
            document.body.classList.remove('no-scroll');
        }
    };

    document.body.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.manager-info-btn');
        
        if (targetBtn) {
            e.preventDefault();
            
            const name = targetBtn.getAttribute('data-manager-name') || 'Unknown Manager';
            const club = targetBtn.getAttribute('data-manager-club') || 'N/A';
            const titles = targetBtn.getAttribute('data-manager-titles') || 'N/A';
            const dor = targetBtn.getAttribute('data-manager-dor') || '0';
            const status = targetBtn.getAttribute('data-manager-status') || 'N/A';
            const bio = targetBtn.getAttribute('data-manager-bio') || 'No biography provided.';

            if (modalTitle) modalTitle.textContent = name;
            if (modalClub) modalClub.textContent = club;
            if (modalTitles) modalTitles.textContent = titles;
            if (modalDor) modalDor.textContent = dor;
            if (modalStatus) modalStatus.textContent = status;
            if (modalBio) modalBio.textContent = bio;

            if (managerModal) managerModal.classList.add('active');
            if (modalOverlay) modalOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeManagerModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeManagerModal);

    // ==========================================================================
    // PART 5: CROSS-PAGE AUDIO SYNC ENGINE
    // ==========================================================================
    const bgAudio = document.getElementById('bgAudio');
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = audioToggle ? audioToggle.querySelector('.audio-icon') : null;
    const audioToast = document.getElementById('audioToast');
    const toastText = document.getElementById('toastText');
    const toastNextBtn = document.getElementById('toastNextBtn');

    if (!bgAudio) return;

    function updateTrackDisplay(track) {
        if (toastText) {
            toastText.innerHTML = `🎵 ${track.title} — <i>${track.artist}</i>`;
        }
        if (audioToast) {
            audioToast.classList.add('active-playing');
        }
    }

    function playTrack(index) {
        if (!bgAudio) return;
        currentTrackIndex = index;
        bgAudio.src = playlist[index].src;
        bgAudio.load();
        
        bgAudio.play()
            .then(() => {
                isAudioPlaying = true;
                if (audioIcon) audioIcon.textContent = '⏸';
                updateTrackDisplay(playlist[index]);
            })
            .catch(err => console.log("System background audio restriction handled:", err));
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        playTrack(currentTrackIndex);
    }

    const savedTrackIndex = localStorage.getItem("esl_track_idx");
    const savedTime = localStorage.getItem("esl_track_time");
    const savedPlayingState = localStorage.getItem("esl_track_playing");

    if (savedTrackIndex !== null) {
        currentTrackIndex = parseInt(savedTrackIndex, 10);
    }
    bgAudio.src = playlist[currentTrackIndex].src;

    if (savedTime !== null) {
        bgAudio.currentTime = parseFloat(savedTime);
    }

    if (savedPlayingState === "true") {
        bgAudio.play()
            .then(() => {
                isAudioPlaying = true;
                if (audioIcon) audioIcon.textContent = '⏸';
                updateTrackDisplay(playlist[currentTrackIndex]);
            })
            .catch(err => {
                console.log("Autoplay restriction layer waiting for click action.");
                isAudioPlaying = false;
                if (audioIcon) audioIcon.textContent = '▶';
                if (audioToast) audioToast.classList.remove('active-playing');
                if (toastText) toastText.innerHTML = `🎵 Music Paused`;
            });
    } else {
        if (toastText) toastText.innerHTML = `🎵 Music Paused`;
    }

    window.addEventListener("beforeunload", () => {
        localStorage.setItem("esl_track_idx", currentTrackIndex);
        localStorage.setItem("esl_track_time", bgAudio.currentTime);
        localStorage.setItem("esl_track_playing", isAudioPlaying);
    });

    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            if (!isAudioPlaying) {
                if (!bgAudio.src || bgAudio.src === window.location.href) {
                    playTrack(currentTrackIndex);
                } else {
                    bgAudio.play().then(() => {
                        isAudioPlaying = true;
                        if (audioIcon) audioIcon.textContent = '⏸';
                        updateTrackDisplay(playlist[currentTrackIndex]);
                    });
                }
            } else {
                bgAudio.pause();
                isAudioPlaying = false;
                if (audioIcon) audioIcon.textContent = '▶';
                if (audioToast) audioToast.classList.remove('active-playing');
                if (toastText) toastText.innerHTML = `🎵 Music Paused`;
            }
        });
    }

    if (toastNextBtn) {
        toastNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextTrack();
        });
    }

    bgAudio.addEventListener('ended', () => {
        nextTrack();
    });

    //     // ==========================================================================
    // PART 6: INLINE SINGLE-PAGE NEWSROOM INTERACTION CONTROLLER
    // ==========================================================================
    const openNewsroomBtn = document.getElementById('openNewsroomBtn');
    const closeNewsroomBtn = document.getElementById('closeNewsroomBtn');
    const newsroomSection = document.getElementById('newsroomSection');

    if (openNewsroomBtn && newsroomSection) {
        openNewsroomBtn.addEventListener('click', () => {
            newsroomSection.style.display = 'block';
            document.body.classList.add('no-scroll'); 
        });
    }

    if (closeNewsroomBtn && newsroomSection) {
        closeNewsroomBtn.addEventListener('click', () => {
            newsroomSection.style.display = 'none';
            document.body.classList.remove('no-scroll'); 
        });
    }

    // ==========================================================================
    // PART 7: COMMISSIONER'S HQ WINDOW CONTROLLER & FEEDBACK LOGIC
    // ==========================================================================
    const openHqBtn = document.getElementById('openHqBtn');
    const closeHqBtn = document.getElementById('closeHqBtn');
    const hqSection = document.getElementById('hqSection');

    if (openHqBtn && hqSection) {
        openHqBtn.addEventListener('click', () => {
            hqSection.style.display = 'block';
            document.body.classList.add('no-scroll');
        });
    }

    if (closeHqBtn && hqSection) {
        closeHqBtn.addEventListener('click', () => {
            hqSection.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });
    }

    // Real-Time LocalStorage Reaction Code
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const likeCountEl = document.getElementById('likeCount');
    const dislikeCountEl = document.getElementById('dislikeCount');
    const ratingStatusText = document.getElementById('ratingStatusText');

    // Initialize custom starter base seeds
    if (localStorage.getItem('esl_likes') === null) {
        localStorage.setItem('esl_likes', '7'); 
    }
    if (localStorage.getItem('esl_dislikes') === null) {
        localStorage.setItem('esl_dislikes', '0');  
    }

    let currentLikes = parseInt(localStorage.getItem('esl_likes'), 10);
    let currentDislikes = parseInt(localStorage.getItem('esl_dislikes'), 10);
    
    if (likeCountEl) likeCountEl.textContent = currentLikes;
    if (dislikeCountEl) dislikeCountEl.textContent = currentDislikes;

    if (localStorage.getItem('esl_user_voted') === 'true' && ratingStatusText) {
        ratingStatusText.textContent = "Thanks for your feedback!";
    }

    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            if (localStorage.getItem('esl_user_voted') === 'true') {
                ratingStatusText.textContent = "You've already submitted your feedback!";
                return;
            }
            currentLikes += 1;
            localStorage.setItem('esl_likes', currentLikes.toString());
            localStorage.setItem('esl_user_voted', 'true');
            if (likeCountEl) likeCountEl.textContent = currentLikes;
            if (ratingStatusText) ratingStatusText.textContent = "Awesome! Glad you like it.";
        });
        
        likeBtn.addEventListener('mouseenter', () => likeBtn.style.transform = 'scale(1.04)');
        likeBtn.addEventListener('mouseleave', () => likeBtn.style.transform = 'scale(1)');
    }

    if (dislikeBtn) {
        dislikeBtn.addEventListener('click', () => {
            if (localStorage.getItem('esl_user_voted') === 'true') {
                ratingStatusText.textContent = "You've already submitted your feedback!";
                return;
            }
            currentDislikes += 1;
            localStorage.setItem('esl_dislikes', currentDislikes.toString());
            localStorage.setItem('esl_user_voted', 'true');
            if (dislikeCountEl) dislikeCountEl.textContent = currentDislikes;
            if (ratingStatusText) ratingStatusText.textContent = "Feedback received. We'll keep improving!";
        });

        dislikeBtn.addEventListener('mouseenter', () => dislikeBtn.style.transform = 'scale(1.04)');
        dislikeBtn.addEventListener('mouseleave', () => dislikeBtn.style.transform = 'scale(1)');
    }
});
