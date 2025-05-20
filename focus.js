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
  document.querySelectorAll("fuse-sidebar, navbar, toolbar").forEach((el) => {
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
    .workout {
      position: fixed !important;
      top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
      margin: 0 !important;
      padding: 1vw !important;
      background: #fff !important;
      z-index: 999999 !important;
      width: 100vw !important;
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
	  .workout pre {
	  line-height: 1.2 !important;}
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

  // Add a toggle button (in case user wants to revert)
  const btn = document.createElement("button");
  btn.className = "__workout-focus-btn__";
  btn.innerText = "Exit Focus Mode";
  btn.onclick = () => {
    document.body.classList.remove(FOCUS_CLASS);
    style.remove();
    btn.remove();
    document.querySelectorAll("._workout_original_hide").forEach((el) => {
      el.style.display = "";
      el.classList.remove("_workout_original_hide");
    });
  };
  document.body.appendChild(btn);
})();
