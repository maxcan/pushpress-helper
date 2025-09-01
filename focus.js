(function () {
  const FOCUS_CLASS = "__workout-focus-active__";

  if (document.body.classList.contains(FOCUS_CLASS)) {
    document.body.classList.remove(FOCUS_CLASS);
    document
      .querySelectorAll(".__workout-focus-style__")
      .forEach((e) => e.remove());
    document
      .querySelectorAll(".__workout-focus-btn__")
      .forEach((e) => e.remove());
    document.querySelectorAll("._workout_original_hide").forEach((el) => {
      el.style.display = "";
      el.classList.remove("_workout_original_hide");
    });
    return;
  }

  document.body.classList.add(FOCUS_CLASS);

  // // Enter fullscreen mode
  // if (document.documentElement.requestFullscreen) {
  //   document.documentElement.requestFullscreen();
  // } else if (document.documentElement.webkitRequestFullscreen) {
  //   document.documentElement.webkitRequestFullscreen();
  // } else if (document.documentElement.msRequestFullscreen) {
  //   document.documentElement.msRequestFullscreen();
  // }

  const workout = document.querySelector(".workout");
  if (!workout) {
    alert("Workout section not found!");
    document.body.classList.remove(FOCUS_CLASS);
    return;
  }

  // Hide everything except .workout
  Array.from(document.body.children).forEach((child) => {
    // Hide <fuse-sidebar>, <navbar>, <toolbar>
    if (
      child.tagName.toLowerCase() === "fuse-sidebar" ||
      child.tagName.toLowerCase() === "footer" ||
      child.tagName.toLowerCase() === "navbar" ||
      child.tagName.toLowerCase() === "toolbar"
    ) {
      child.style.display = "none";
      child.classList.add("_workout_original_hide");
    }
    // Hide all siblings that aren't the workout or a parent of workout
    else if (child !== workout && !child.contains(workout)) {
      child.style.display = "none";
      child.classList.add("_workout_original_hide");
    }
  });

  // Hide these tags globally (in case they're nested somewhere)
  document
    .querySelectorAll("fuse-sidebar, footer, navbar, toolbar")
    .forEach((el) => {
      el.style.display = "none";
      el.classList.add("_workout_original_hide");
    });

  //   // HIDE .content SECTIONS THAT SAY "Coach View Only"
  //   document.querySelectorAll(".workout .content").forEach((contentEl) => {
  //     // Check if any descendant contains "coach view only" (case insensitive)
  //     const hasCoachViewOnly = Array.from(contentEl.querySelectorAll("p")).some(
  //       (el) =>
  //         (el.textContent || "").trim().toLowerCase().includes("coach view only")
  //     );
  //     if (hasCoachViewOnly) {
  //       contentEl.style.display = "none";
  //       contentEl.classList.add("_workout_original_hide");
  //     }
  //   });

  // Get all content divs that are not "coach view only"
  const contentDivs = Array.from(workout.querySelectorAll(".content")).filter(
    (contentEl) =>
      !(contentEl.textContent || "").toLowerCase().includes("coach view only")
  );

  console.log(`Found ${contentDivs.length} content divs:`, contentDivs);

  let currentIndex = 0;
  let baseFontSize = 8; // Base font size in rem
  let currentFontSize = baseFontSize; // Current font size in rem

  // Function to update font size
  function updateFontSize(fontSize) {
    // Update CSS style rule dynamically instead of inline styles
    const existingStyleRule = document.querySelector("#__dynamic-font-style__");
    if (existingStyleRule) {
      existingStyleRule.remove();
    }

    const dynamicStyle = document.createElement("style");
    dynamicStyle.id = "__dynamic-font-style__";
    dynamicStyle.textContent = `
      .workout,
      .workout *,
      .workout .content,
      .workout .content * {
        font-size: ${fontSize}rem !important;
      }
    `;
    document.head.appendChild(dynamicStyle);
  }

  // Function to scroll to specific content div
  function scrollToContent(index) {
    console.log(`Scrolling to content ${index} of ${contentDivs.length}`);
    if (contentDivs[index]) {
      contentDivs[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      console.log(`Scrolled to div ${index}:`, contentDivs[index]);
    }
  }

  document.querySelectorAll(".workout .content").forEach((contentEl) => {
    if (
      (contentEl.textContent || "").toLowerCase().includes("coach view only")
    ) {
      contentEl.style.display = "none !important";
      contentEl.style.setProperty("display", "none", "important");
      contentEl.classList.add("_workout_original_hide");
    }
  });

  // Style .workout for full screen, big text, center, etc.
  const style = document.createElement("style");
  style.className = "__workout-focus-style__";
  style.textContent = `
  .content {
		padding: 0 !important;
		margin: 0 !important;
	}
		._workout_original_hide {
		display: none !important;}
    .badge { display: none !important; }
    .workout-title {
      font-size: 3rem !important;
      opacity: 0.8 !important;
      font-weight: bold !important;
      margin-bottom: 1rem !important;
    }
    .workout-subtitle {
      font-size: 2rem !important;
      opacity: 0.8 !important;
      font-weight: semi-bold !important;
      margin-bottom: 1rem !important;
    }
    .workout {
      position: fixed !important;
      top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
      margin: 0 !important;
      padding: 1vw !important;
      background: #fff !important;
      z-index: 999999 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      padding-right: 5vw !important;
      height: 100vh !important;
      overflow: auto !important;
      font-size: 8rem !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-direction: column !important;
      box-shadow: none !important;
	  border: none !important;
	  font-weight: 800 !important;
    }
    .workout .content {
     max-width: 95vw !important;
}
	  .workout pre {
	  line-height: 1.2 !important;
	  white-space: pre-wrap !important;
	  word-wrap: break-word !important;
	  overflow-wrap: break-word !important;
	  max-width: 100% !important;
	  box-sizing: border-box !important;}
	.workout-content {
      box-shadow: none !important;
	  border: none !important;
	}
    .__workout-focus-btn__ {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 1000000;
      font-size: 1.2rem;
      padding: 0.5em 1.2em;
      background: #007aff;
      color: #fff;
      border: none;
      border-radius: 1.5em;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .__workout-scroll-btns__ {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000000;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .__workout-zoom-btns__ {
      position: fixed;
      bottom: 400px;
      right: 24px;
      z-index: 1000000;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .__workout-btn__ {
      width: 6vw;
      height: 9vw;
      font-size: 3vw;
      font-weight: bold;
      background: rgba(0, 122, 255, 0.9);
      color: #fff;
      border: 4px solid rgb(0,122,255);
      border-radius: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .__workout-btn__:hover {
      background: rgba(0, 122, 255, 0.1);
    }
    @media (max-width: 600px) {
      .workout {
        font-size: 5vw !important;
        padding: 6vw !important;
      }
      .__workout-focus-btn__ {
        top: 8px;
        right: 8px;
        font-size: 1rem;
      }
    }
  `;
  document.head.appendChild(style);

  // Add keyboard navigation
  const keyHandler = (e) => {
    console.log(`🚀 - focus.js:160 - keyHandler - e:`, e.key);
    if (e.key === "PageDown") {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % contentDivs.length;
      scrollToContent(currentIndex);
    } else if (e.key === "PageUp") {
      e.preventDefault();
      currentIndex =
        (currentIndex - 1 + contentDivs.length) % contentDivs.length;
      scrollToContent(currentIndex);
    }
  };

  document.addEventListener("keydown", keyHandler);

  // Add a toggle button (in case user wants to revert)
  const btn = document.createElement("button");
  btn.className = "__workout-focus-btn__";
  btn.innerText = "Exit Focus Mode";
  btn.onclick = () => {
    // Exit fullscreen
    // if (document.exitFullscreen) {
    //   document.exitFullscreen();
    // } else if (document.webkitExitFullscreen) {
    //   document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) {
    //   document.msExitFullscreen();
    // }

    document.body.classList.remove(FOCUS_CLASS);
    style.remove();
    btn.remove();
    scrollBtns.remove();
    zoomBtns.remove();
    // Remove dynamic font style
    const dynamicFontStyle = document.querySelector("#__dynamic-font-style__");
    if (dynamicFontStyle) {
      dynamicFontStyle.remove();
    }
    document.removeEventListener("keydown", keyHandler);
    document.querySelectorAll("._workout_original_hide").forEach((el) => {
      el.style.display = "";
      el.classList.remove("_workout_original_hide");
    });
  };
  document.body.appendChild(btn);

  // Add zoom buttons
  const zoomBtns = document.createElement("div");
  zoomBtns.className = "__workout-zoom-btns__";

  const plusBtn = document.createElement("button");
  plusBtn.className = "__workout-btn__";
  plusBtn.innerHTML = "+";
  plusBtn.onclick = () => {
    currentFontSize = Math.min(currentFontSize * 1.15, baseFontSize * 4); // Max 4x base size
    updateFontSize(currentFontSize);
  };

  const minusBtn = document.createElement("button");
  minusBtn.className = "__workout-btn__";
  minusBtn.innerHTML = "-";
  minusBtn.onclick = () => {
    currentFontSize = Math.max(currentFontSize * 0.85, baseFontSize * 0.25); // Min 0.25x base size
    updateFontSize(currentFontSize);
  };

  zoomBtns.appendChild(plusBtn);
  zoomBtns.appendChild(minusBtn);
  document.body.appendChild(zoomBtns);

  // Add scroll buttons
  const scrollBtns = document.createElement("div");
  scrollBtns.className = "__workout-scroll-btns__";

  const upBtn = document.createElement("button");
  upBtn.className = "__workout-btn__";
  upBtn.innerHTML = "↑";
  upBtn.onclick = () => {
    workout.scrollBy({
      top: -window.innerHeight * 0.25,
      behavior: "smooth",
    });
  };

  const downBtn = document.createElement("button");
  downBtn.className = "__workout-btn__";
  downBtn.innerHTML = "↓";
  downBtn.onclick = () => {
    workout.scrollBy({
      top: window.innerHeight * 0.25,
      behavior: "smooth",
    });
  };

  scrollBtns.appendChild(upBtn);
  scrollBtns.appendChild(downBtn);
  document.body.appendChild(scrollBtns);

  // Scroll to first content section
  scrollToContent(0);
})();
