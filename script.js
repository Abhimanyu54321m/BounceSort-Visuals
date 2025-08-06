document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("barsContainer");
  const controlsForm = document.getElementById("controls");
  const themeToggle = document.getElementById("theme-toggle");

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function displayBars(array, compareIdx = [], swapIdx = [], sortedIdx = -1) {
    container.innerHTML = "";

    array.forEach((val, idx) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${val * 5}px`;

      const label = document.createElement("span");
      label.textContent = val;
      bar.appendChild(label);

      if (compareIdx.includes(idx)) {
        bar.classList.add("compare");
      }
      if (swapIdx.includes(idx)) {
        bar.classList.add("swap");
      }
      if (sortedIdx !== -1 && idx >= sortedIdx) {
        bar.classList.add("sorted");
      }

      container.appendChild(bar);
    });
  }

  async function bubbleSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        displayBars(array, [j, j + 1]);
        await sleep(400);

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          displayBars(array, [], [j, j + 1]);
          await sleep(400);
        }
      }
      displayBars(array, [], [], n - i - 1); // Mark sorted
      await sleep(300);
    }
    displayBars(array, [], [], 0); // All sorted
  }

  async function startVisualization(event) {
    event.preventDefault();

    const size = parseInt(document.getElementById("arraySize").value);
    const elementsInput = document.getElementById("arrayElements").value.trim();
    
    if (!elementsInput) {
        alert("Please enter the array elements.");
        return;
    }
      
    const elements = elementsInput.split(/\s+/).map(Number);

    if (elements.length !== size || elements.some(isNaN)) {
      alert("Please enter valid numbers matching the array size.");
      return;
    }

    await bubbleSort(elements);
  }

  // Theme switcher logic
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
        themeToggle.checked = true;
    }
  } else {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
  });

  controlsForm.addEventListener("submit", startVisualization);
});