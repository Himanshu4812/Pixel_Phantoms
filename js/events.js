async function loadEvents() {
    const container = document.getElementById("events-container");

    try {
        const res = await fetch("data/events.json");

        if (!res.ok) throw new Error("Failed to load events");

        const events = await res.json();
        container.innerHTML = ""; // Clear loading message

        events.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <h2>${event.title}</h2>
                <p class="event-date"><i class="fa-solid fa-calendar"></i> ${event.date}</p>
                <p class="event-location"><i class="fa-solid fa-location-dot"></i> ${event.location}</p>
                <p class="event-description">${event.description}</p>
                <a href="${event.link}" class="btn-event">Learn More</a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p class="error-msg">Unable to load events 😢</p>`;
    }
}

loadEvents();

async function loadEvents() {
    const container = document.getElementById("events-container");

    try {
        const res = await fetch("data/events.json"); // Uses existing data file
        if (!res.ok) throw new Error("Failed to load events");

        const events = await res.json();
        container.innerHTML = ""; 

        // 1. Find the next upcoming event for the Countdown
        const now = new Date();
        // Filter for future events and sort by date (nearest first)
        const upcomingEvents = events
            .filter(e => new Date(e.date) > now)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcomingEvents.length > 0) {
            initCountdown(upcomingEvents[0]);
        }

        // 2. Render Event Cards (Existing Logic)
        events.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");
            // Highlight the card if it's the next featured event
            const isNext = upcomingEvents.length > 0 && event === upcomingEvents[0];
            if (isNext) card.style.borderColor = "var(--accent-color)";

            card.innerHTML = `
                ${isNext ? '<div style="color:var(--accent-color); font-weight:bold; font-size:0.8rem; margin-bottom:5px;">🔥 UP NEXT</div>' : ''}
                <h2>${event.title}</h2>
                <p class="event-date"><i class="fa-solid fa-calendar"></i> ${event.date}</p>
                <p class="event-location"><i class="fa-solid fa-location-dot"></i> ${event.location}</p>
                <p class="event-description">${event.description}</p>
                <a href="${event.link}" class="btn-event">Learn More</a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p class="error-msg">Unable to load events 😢</p>`;
    }
}

function initCountdown(event) {
    const section = document.getElementById('countdown-section');
    const nameEl = document.getElementById('next-event-name');
    const targetDate = new Date(event.date).getTime();

    section.classList.remove('countdown-hidden');
    nameEl.innerHTML = `Counting down to: <span style="color:var(--accent-color)">${event.title}</span>`;

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            section.innerHTML = "<h3>The Event Has Started! 🚀</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    };

    setInterval(updateTimer, 1000);
    updateTimer(); // Run immediately
}

loadEvents();