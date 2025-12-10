document.addEventListener('DOMContentLoaded', function() {
  const blogsTrack = document.getElementById('blogsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!blogsTrack || !prevBtn || !nextBtn) return;

  let currentPosition = 0;
  const blogItems = blogsTrack.querySelectorAll('.blog');
  const itemsToShow = 2;
  const totalItems = blogItems.length;
  
  // Initialize
  updateCarouselState();
  
  prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition--;
      updateCarousel();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentPosition < totalItems - itemsToShow) {
      currentPosition++;
      updateCarousel();
    }
  });
  
  function updateCarousel() {
    // Calculate translation: move by (100 / itemsToShow)% for each step
    const translatePercent = currentPosition * (100 / itemsToShow);
    blogsTrack.style.transform = `translateX(-${translatePercent}%)`;
    updateCarouselState();
  }
  
  function updateCarouselState() {
    // Disable prev button if at start
    prevBtn.disabled = currentPosition === 0;
    
    // Disable next button if at end (when remaining items <= items to show)
    nextBtn.disabled = currentPosition >= totalItems - itemsToShow;
  }
});
