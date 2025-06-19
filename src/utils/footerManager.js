// Footer height management with ResizeObserver
(function() {
  'use strict';
  
  const footer = document.querySelector('.footer');
  if (!footer) return;
  
  // Update CSS custom property
  function updateFooterHeight() {
    // Get the total height including padding and borders
    const rect = footer.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(footer);
    const totalHeight = rect.height + 
      parseFloat(computedStyle.marginTop) + 
      parseFloat(computedStyle.marginBottom);
    
    document.documentElement.style.setProperty('--footer-h', `${totalHeight}px`);
  }
  
  // ResizeObserver for dynamic content changes
  const resizeObserver = new ResizeObserver(() => {
    updateFooterHeight();
  });
  
  resizeObserver.observe(footer);
  
  // Handle orientation and resize events
  function handleResize() {
    // Small delay to ensure layout is complete
    setTimeout(updateFooterHeight, 100);
  }
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  
  // Initial setup - wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFooterHeight);
  } else {
    updateFooterHeight();
  }
  
  // Cleanup function (optional)
  window.addEventListener('beforeunload', () => {
    resizeObserver.disconnect();
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
  });
})(); 