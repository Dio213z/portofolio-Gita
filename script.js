'use strict';
(() => {
  const container = document.querySelector('#experiment-container');
  if (!container) return;

  const experiments = Array.isArray(window.experimentLab) ? window.experimentLab.slice(0, 3) : [];

  container.replaceChildren();

  experiments.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'project experiment-card';

    // Container visual utama (gambar + overlay caption)
    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'experiment-media';

    const img = document.createElement('img');
    img.className = 'experiment-img';
    img.alt = item.title || `Experiment ${index + 1}`;

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'experiment-fallback';
    fallbackDiv.hidden = true;
    fallbackDiv.innerHTML = `<span>✦</span><p>${item.title || 'Image Unavailable'}</p>`;

    img.addEventListener('error', () => {
      img.hidden = true;
      fallbackDiv.hidden = false;
    });

    if (item.imageUrl) {
      img.src = item.imageUrl;
    } else {
      img.hidden = true;
      fallbackDiv.hidden = false;
    }

    const captionDiv = document.createElement('div');
    captionDiv.className = 'experiment-caption-overlay';
    captionDiv.textContent = item.caption || '';

    mediaDiv.append(img, fallbackDiv, captionDiv);

    // Body card
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'project-body experiment-body';

    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.textContent = item.label || `0${index + 1} / EXPERIMENT`;

    const titleH3 = document.createElement('h3');
    titleH3.textContent = item.title || '';

    const descP = document.createElement('p');
    descP.textContent = item.description || '';

    const linkA = document.createElement('a');
    linkA.className = 'experiment-link';
    linkA.href = item.linkUrl || '#';
    linkA.textContent = item.linkText || 'Lihat project ↗';

    bodyDiv.append(tagSpan, titleH3, descP, linkA);

    article.append(mediaDiv, bodyDiv);
    container.append(article);
  });
})();
