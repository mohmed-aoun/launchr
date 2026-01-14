(function () {
  const PARAM = 'ref';
  const STORAGE_KEY = 'affiliate_ref';

  // 1. Capture ref from URL
  const params = new URLSearchParams(window.location.search);
  const ref = params.get(PARAM);

  if (ref) {
    localStorage.setItem(STORAGE_KEY, ref);
  }

  // 2. Read stored ref
  const storedRef = localStorage.getItem(STORAGE_KEY);
  if (!storedRef) return;

  // 3. Append to all booking links
  document.querySelectorAll('a[href*="book.html"]').forEach(link => {
    const url = new URL(link.href, window.location.origin);
    url.searchParams.set('utm_campaign', storedRef);
    url.searchParams.set('utm_source', 'affiliate');
    link.href = url.toString();
  });
})();
