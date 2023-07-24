const larrySVG = `<svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.924 5.76014C24.9408 6.00384 24.9408 6.24752 24.9408 6.49346C24.9408 13.9872 19.236 22.6297 8.80443 22.6297V22.6253C5.72294 22.6297 2.70544 21.7471 0.111328 20.0828C0.559402 20.1368 1.00972 20.1636 1.46117 20.1648C4.01486 20.167 6.49555 19.3101 8.50459 17.7324C6.0778 17.6863 3.94973 16.1041 3.20629 13.794C4.05641 13.958 4.93235 13.9243 5.76673 13.6963C3.12096 13.1618 1.21748 10.8372 1.21748 8.13752C1.21748 8.11281 1.21748 8.08923 1.21748 8.06566C2.00583 8.50475 2.88849 8.74843 3.79138 8.77538C1.29946 7.10998 0.531328 3.79491 2.03615 1.20303C4.9155 4.74608 9.16379 6.89998 13.7243 7.12796C13.2672 5.15822 13.8916 3.09416 15.365 1.7095C17.6492 -0.437664 21.2416 -0.327612 23.3887 1.95544C24.6589 1.70501 25.8763 1.23897 26.9902 0.578645C26.5669 1.89143 25.6807 3.00656 24.4971 3.71517C25.6212 3.58265 26.7196 3.2817 27.7539 2.82239C26.9925 3.96335 26.0335 4.95719 24.924 5.76014Z" fill="#1D9BF0"/></svg>`;
document.addEventListener("DOMContentLoaded", function () {
  const applyButton = document.getElementById("applyButton");
  const imageUrlInput = document.getElementById("imageUrlInput");
  const larryDiv = document.getElementById("larry");
  const resetButton = document.getElementById("resetButton");

  const currentImageUrl = localStorage.getItem("customImageUrl");
  if (currentImageUrl) {
    imageUrlInput.value = currentImageUrl;
  }

  if (currentImageUrl) {
    larryDiv.innerHTML = "";
    if (currentImageUrl.includes("svg")) {
      const div = document.createElement("div");
      div.innerHTML = currentImageUrl;
      const svg = div.firstChild;
      svg.setAttribute("width", "28");
      svg.setAttribute("height", "auto");
      larryDiv.appendChild(svg);
    } else {
      larryDiv.innerHTML = `<img src="${currentImageUrl}" width="28" height="auto" />`;
    }
  } else {
    larryDiv.innerHTML = `<svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.924 5.76014C24.9408 6.00384 24.9408 6.24752 24.9408 6.49346C24.9408 13.9872 19.236 22.6297 8.80443 22.6297V22.6253C5.72294 22.6297 2.70544 21.7471 0.111328 20.0828C0.559402 20.1368 1.00972 20.1636 1.46117 20.1648C4.01486 20.167 6.49555 19.3101 8.50459 17.7324C6.0778 17.6863 3.94973 16.1041 3.20629 13.794C4.05641 13.958 4.93235 13.9243 5.76673 13.6963C3.12096 13.1618 1.21748 10.8372 1.21748 8.13752C1.21748 8.11281 1.21748 8.08923 1.21748 8.06566C2.00583 8.50475 2.88849 8.74843 3.79138 8.77538C1.29946 7.10998 0.531328 3.79491 2.03615 1.20303C4.9155 4.74608 9.16379 6.89998 13.7243 7.12796C13.2672 5.15822 13.8916 3.09416 15.365 1.7095C17.6492 -0.437664 21.2416 -0.327612 23.3887 1.95544C24.6589 1.70501 25.8763 1.23897 26.9902 0.578645C26.5669 1.89143 25.6807 3.00656 24.4971 3.71517C25.6212 3.58265 26.7196 3.2817 27.7539 2.82239C26.9925 3.96335 26.0335 4.95719 24.924 5.76014Z" fill="#1D9BF0"/></svg>`;
  }

  resetButton.addEventListener("click", function () {
    console.log("resetButton clicked");
    localStorage.removeItem("customImageUrl");
    imageUrlInput.value = "";
    imageUrlInput.placeholder = "Enter image URL or SVG";
    imageUrlInput.style.border = "2px solid #1D9BF0";
    larryDiv.innerHTML = "";
    larryDiv.innerHTML = larrySVG;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { imageUrl: "" });
    });
  });

  applyButton.addEventListener("click", function () {
    console.log("applyButton clicked");
    var imageUrl = imageUrlInput.value;

    const regex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );

    if (imageUrl.includes("svg")) {
      const regex = /<svg[^>]+>(.+)<\/svg>/g;
      if (!regex.test(imageUrl)) {
        console.log("invalid svg");
        imageUrlInput.style.border = "2px solid #ff0067";
        larryDiv.innerHTML = larrySVG;
        imageUrlInput.value = "";
        imageUrlInput.placeholder = "Invalid SVG";
        return;
      }
    } else {
      if (!regex.test(imageUrl)) {
        console.log("invalid url");
        imageUrlInput.style.border = "2px solid #ff0067";
        larryDiv.innerHTML = larrySVG;
        imageUrlInput.value = "";
        imageUrlInput.placeholder = "Invalid URL";
        return;
      }
    }

    localStorage.setItem("customImageUrl", imageUrl);

    if (imageUrl) {
      larryDiv.innerHTML = "";
      if (imageUrl.includes("svg")) {
        const div = document.createElement("div");
        div.innerHTML = imageUrl;
        const svg = div.firstChild;
        svg.setAttribute("width", "28");
        svg.setAttribute("height", "auto");
        larryDiv.appendChild(svg);
      } else {
        larryDiv.innerHTML = `<img src="${imageUrl}" width="28" height="auto" />`;
      }
    }

    if (localStorage.getItem("customImageUrl")) {
      console.log("customImageUrl", localStorage.getItem("customImageUrl"));
      // make input have a green border
      imageUrlInput.style.border = "2px solid #35c759";
    } else {
      // make input have a red border
      imageUrlInput.style.border = "2px solid #ff0067";
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { imageUrl: imageUrl });
    });
  });
});
