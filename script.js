document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const usernameInput = document.getElementById("user-input");
  const btnSpinner = document.getElementById("btn-spinner");
  const btnText = document.getElementById("btn-text");

  // Panels
  const emptyState = document.getElementById("empty-state");
  const progressPanel = document.getElementById("progress-panel");
  const cardsSection = document.getElementById("cards-section");

  // SVG ring elements
  const ringEasy = document.getElementById("ring-easy");
  const ringMedium = document.getElementById("ring-medium");
  const ringHard = document.getElementById("ring-hard");

  // Center labels
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const easyTotal = document.getElementById("easy-total");
  const mediumTotal = document.getElementById("medium-total");
  const hardTotal = document.getElementById("hard-total");

  // Summary badge
  const totalSolvedDisplay = document.getElementById("total-solved-display");

  // Cards container
  const statsCardGrid = document.getElementById("stats-card-grid");

  // SVG ring circumference for r=45: C = 2πr ≈ 282.74
  const CIRCUMFERENCE = 2 * Math.PI * 45;

  // ── Validation ──────────────────────────────────────────────────
  function validateUserName(username) {
    if (username.trim() === "") {
      showError("Username cannot be empty.");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      showError("Invalid username. Only letters, numbers, _ and - are allowed (max 15 chars).");
    }
    return isMatching;
  }

  // ── UI State Helpers ─────────────────────────────────────────────
  function setLoading(loading) {
    searchButton.disabled = loading;
    btnSpinner.classList.toggle("active", loading);
    btnText.textContent = loading ? "Searching…" : "Search";
  }

  function showError(message) {
    emptyState.style.display = "";
    progressPanel.hidden = true;
    cardsSection.hidden = true;

    emptyState.innerHTML = `
      <span class="state-icon">⚠️</span>
      <p class="state-title">Something went wrong</p>
      <p>${message}</p>
    `;
  }

  function showEmpty() {
    emptyState.style.display = "";
    progressPanel.hidden = true;
    cardsSection.hidden = true;
    emptyState.innerHTML = `
      <span class="state-icon">🔍</span>
      <p class="state-title">No data yet</p>
      <p>Enter a LeetCode username above to load stats.</p>
    `;
  }

  // ── Fetch ────────────────────────────────────────────────────────
  async function fetchUserDetails(username) {
    try {
      setLoading(true);

      const graphql = JSON.stringify({
        query: `
          query userSessionProgress($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `,
        variables: { username },
      });

      // Use the Vercel serverless proxy — no CORS issues in production or locally
      const response = await fetch("/api/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: graphql,
      });

      if (!response.ok) {
        throw new Error("Unable to fetch user details. The proxy may be unavailable.");
      }

      const parsedData = await response.json();

      if (!parsedData.data?.matchedUser) {
        throw new Error(`User "${username}" not found on LeetCode.`);
      }

      displayUserData(parsedData);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Search Button ────────────────────────────────────────────────
  searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    if (validateUserName(username)) {
      fetchUserDetails(username);
    }
  });

  usernameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const username = usernameInput.value.trim();
      if (validateUserName(username)) {
        fetchUserDetails(username);
      }
    }
  });

  // ── Display Data ─────────────────────────────────────────────────
  function displayUserData(parsedData) {
    const allQ = parsedData.data.allQuestionsCount;
    const acNums = parsedData.data.matchedUser.submitStats.acSubmissionNum;
    const totalNums = parsedData.data.matchedUser.submitStats.totalSubmissionNum;

    const totalQues = allQ[0].count;
    const totalEasyQues = allQ[1].count;
    const totalMediumQues = allQ[2].count;
    const totalHardQues = allQ[3].count;

    const solvedTotal = acNums[0].count;
    const solvedEasy = acNums[1].count;
    const solvedMedium = acNums[2].count;
    const solvedHard = acNums[3].count;

    // Show total badge
    totalSolvedDisplay.textContent = `${solvedTotal} / ${totalQues}`;

    // Animate rings
    animateRing(ringEasy, solvedEasy, totalEasyQues, easyLabel, easyTotal);
    animateRing(ringMedium, solvedMedium, totalMediumQues, mediumLabel, mediumTotal);
    animateRing(ringHard, solvedHard, totalHardQues, hardLabel, hardTotal);

    // Build submission cards
    const cardsData = [
      {
        label: "Overall Submissions",
        value: totalNums[0].submissions,
        icon: "📊",
        cls: "total",
      },
      {
        label: "Easy Submissions",
        value: totalNums[1].submissions,
        icon: "🟢",
        cls: "easy-card",
      },
      {
        label: "Medium Submissions",
        value: totalNums[2].submissions,
        icon: "🟡",
        cls: "medium-card",
      },
      {
        label: "Hard Submissions",
        value: totalNums[3].submissions,
        icon: "🔴",
        cls: "hard-card",
      },
    ];

    statsCardGrid.innerHTML = cardsData
      .map(
        (d) => `
        <div class="card ${d.cls}">
          <div class="card-icon">${d.icon}</div>
          <h4>${d.label}</h4>
          <p>${d.value.toLocaleString()}</p>
        </div>`
      )
      .join("");

    // Reveal panels
    emptyState.style.display = "none";
    progressPanel.hidden = false;
    cardsSection.hidden = false;
  }

  // ── Ring Animation ────────────────────────────────────────────────
  function animateRing(ringEl, solved, total, labelEl, totalEl) {
    const pct = total > 0 ? solved / total : 0;
    const offset = CIRCUMFERENCE * (1 - pct);

    // Reset without transition first for re-searches
    ringEl.style.transition = "none";
    ringEl.style.strokeDashoffset = CIRCUMFERENCE;

    // Force reflow then animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ringEl.style.transition =
          "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
        ringEl.style.strokeDashoffset = offset;
      });
    });

    // Update labels
    labelEl.textContent = solved;
    totalEl.textContent = `/ ${total}`;
  }
});
