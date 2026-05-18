(function () {
  'use strict';

  /* ── Copy Button for Code Blocks ────────────────── */
  /* Only adds custom copy button if Chirpy's built-in one is absent */
  function initCopyButtons() {
    const highlights = document.querySelectorAll(
      'div.highlight, figure.highlight'
    );

    highlights.forEach(function (block) {
      /* Chirpy v7 already has .btn-copy-code or button inside .code-header */
      if (block.querySelector('.btn-copy-code, .code-header button, .code-copy-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', '코드 복사');
      btn.textContent = 'copy';
      block.style.position = 'relative';
      block.appendChild(btn);

      btn.addEventListener('click', function () {
        const pre = block.querySelector('pre code') || block.querySelector('pre');
        if (!pre) return;

        const text = (pre.innerText || pre.textContent || '').replace(/^\n|\n$/g, '');
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { showCopied(btn); });
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e) { /* noop */ }
          document.body.removeChild(ta);
          showCopied(btn);
        }
      });
    });
  }

  function showCopied(btn) {
    const orig = btn.textContent;
    btn.textContent = 'copied!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2000);
  }

  /* ── Smooth anchor scrolling offset for sticky topbar ── */
  function initAnchorScroll() {
    const offset = 80;
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ── Active TOC highlight ────────────────────────── */
  function initTocHighlight() {
    const tocLinks = document.querySelectorAll('#toc-wrapper a, .toc-wrapper a');
    if (!tocLinks.length) return;

    const headings = Array.from(
      document.querySelectorAll('.post-content h2, .post-content h3, article .content h2, article .content h3')
    );
    if (!headings.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        if (!id) return;
        tocLinks.forEach(function (l) { l.classList.remove('active'); });
        const active = document.querySelector('#toc-wrapper a[href="#' + id + '"], .toc-wrapper a[href="#' + id + '"]');
        if (active) active.classList.add('active');
      });
    }, { rootMargin: '-80px 0px -60% 0px' });

    headings.forEach(function (h) { observer.observe(h); });
  }

  /* ── Run on DOM ready ────────────────────────────── */
  function init() {
    initCopyButtons();
    initAnchorScroll();
    initTocHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
