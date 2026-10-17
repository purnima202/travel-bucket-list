
const buttons = document.querySelectorAll(".save-button");
const bucketList = document.getElementById("bucket-list");

let savedPlaces = [];

try {
  const storedPlaces = localStorage.getItem("wanderlist");

  if (storedPlaces) {
    savedPlaces = JSON.parse(storedPlaces);
  }
} catch (error) {
  console.error("Could not load saved places:", error);
}

function renderBucketList() {
  bucketList.innerHTML = "";

  if (savedPlaces.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Your adventure starts with one place!";
    bucketList.appendChild(item);
    return;
  }

  savedPlaces.forEach((place) => {
    const item = document.createElement("li");
    item.textContent = place;
    bucketList.appendChild(item);
  });
}

function updateButtons() {
  buttons.forEach((button) => {
    const isSaved = savedPlaces.includes(button.dataset.place);

    button.classList.toggle("saved", isSaved);
    button.setAttribute("aria-pressed", String(isSaved));
    button.textContent = isSaved
      ? "✓ Added to list"
      : "♡ Add t list";
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const place = button.dataset.place;

    if (savedPlaces.includes(place)) {
      savedPlaces = savedPlaces.filter((item) => item !== place);
    } else {
      savedPlaces.push(place);
    }

    try {
      localStorage.setItem("wanderlist", JSON.stringify(savedPlaces));
    } catch (error) {
      console.error("Could not save your bucket list:", error);
    }

    renderBucketList();
    updateButtons();
  });
});

renderBucketList();
updateButtons();
