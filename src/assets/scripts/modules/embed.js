/**
 * Load third-party iframe embeds upon interaction
 *
 * Requires an element with the following markup:
 * <a href="[url]" data-embed-src="[embed url]">
 *   [Fallback content]
 * </a>
 */
export default function embed() {
  const embeds = document.querySelectorAll('[data-embed-src]');

  for (const embed of embeds) {
    // Setup play button
    const button = document.createElement('button');
    button.className = 'embed__button';
    button.textContent = '▶︎';
    button.setAttribute('aria-label', 'Play');

    // Setup embed container
    const container = document.createElement('div');
    container.innerHTML = embed.innerHTML;
    container.style = embed.getAttribute('style');
    container.className = 'embed';
    container.append(button);

    // Insert container after link to embed
    embed.parentNode.insertBefore(container, embed.nextSibling);

    // Remove link to embed
    embed.remove();

    // Click button to replace fallback content with iframe
    button.addEventListener('click', event => {
      event.preventDefault();

      const iframe = document.createElement('iframe');

      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('src', embed.dataset.embedSrc);

      container.innerHTML = '';
      container.append(iframe);
    });
  }
}
