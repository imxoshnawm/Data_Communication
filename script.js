   // Variables for slide control
   let currentSlide = 1;
   const totalSlides = document.querySelectorAll('.slide').length;

   // Wait for DOM to load
   document.addEventListener('DOMContentLoaded', function() {
       // Initialize slide counter
       updateSlideCounter();
       
       // Add keyboard navigation
       document.addEventListener('keydown', function(event) {
           if (event.key === "ArrowRight" || event.key === " ") {
               changeSlide(1);
           } else if (event.key === "ArrowLeft") {
               changeSlide(-1);
           }
       });
       
       // Add swipe support for touch devices
       let touchStartX = 0;
       let touchEndX = 0;
       
       document.addEventListener('touchstart', function(event) {
           touchStartX = event.changedTouches[0].screenX;
       });
       
       document.addEventListener('touchend', function(event) {
           touchEndX = event.changedTouches[0].screenX;
           handleSwipe();
       });
       
       function handleSwipe() {
           // Detect swipe direction
           if (touchEndX < touchStartX - 50) {
               // Swipe left (next slide)
               changeSlide(1);
           } else if (touchEndX > touchStartX + 50) {
               // Swipe right (previous slide)
               changeSlide(-1);
           }
       }
       
       // Add animation for initial slide
       animateSlideIn(currentSlide);
       
       // Create network background
       createNetworkBackground();
   });

   // Function to change slides
   function changeSlide(direction) {
       const slides = document.querySelectorAll('.slide');
       
       // Hide current slide
       slides[currentSlide - 1].style.display = 'none';
       
       // Calculate new slide index
       currentSlide = currentSlide + direction;
       
       // Handle reaching the beginning or end
       if (currentSlide > totalSlides) {
           currentSlide = 1;
       } else if (currentSlide < 1) {
           currentSlide = totalSlides;
       }
       
       // Show new slide with animation
       animateSlideIn(currentSlide);
       
       // Update the slide counter
       updateSlideCounter();
   }

   // Function to update slide counter
   function updateSlideCounter() {
       document.getElementById('slide-counter').textContent = `${currentSlide} / ${totalSlides}`;
   }

   // Function to animate slide in
   function animateSlideIn(slideIndex) {
       const slides = document.querySelectorAll('.slide');
       const currentSlideElement = slides[slideIndex - 1];
       
       // Set initial state for animation
       currentSlideElement.style.display = 'block';
       currentSlideElement.style.opacity = '0';
       
       // Use requestAnimationFrame for smooth animation
       requestAnimationFrame(() => {
           currentSlideElement.style.transition = 'opacity 0.5s ease';
           currentSlideElement.style.opacity = '1';
       });
   }

   // Function to create network background
   function createNetworkBackground() {
       const networkBg = document.getElementById('networkBg');
       const nodeCount = 15;
       const nodes = [];
       
       // Create nodes
       for (let i = 0; i < nodeCount; i++) {
           const node = document.createElement('div');
           node.className = 'node';
           
           // Random position
           const left = Math.random() * 100;
           const top = Math.random() * 100;
           
           node.style.left = `${left}%`;
           node.style.top = `${top}%`;
           
           networkBg.appendChild(node);
           nodes.push({
               element: node,
               left: left,
               top: top
           });
       }
       
       // Create connections between nodes
       for (let i = 0; i < nodes.length; i++) {
           for (let j = i + 1; j < nodes.length; j++) {
               // Only connect some nodes (not all)
               if (Math.random() > 0.7) continue;
               
               const connection = document.createElement('div');
               connection.className = 'connection';
               
               // Calculate position and angle
               const x1 = nodes[i].left;
               const y1 = nodes[i].top;
               const x2 = nodes[j].left;
               const y2 = nodes[j].top;
               
               // Calculate distance
               const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
               
               // Calculate angle
               const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
               
               // Set connection style
               connection.style.width = `${distance}%`;
               connection.style.left = `${x1}%`;
               connection.style.top = `${y1}%`;
               connection.style.transform = `rotate(${angle}deg)`;
               
               networkBg.appendChild(connection);
           }
       }
       
       // Add network icons
       const iconTypes = ['router', 'switch', 'server', 'computer'];
       for (let i = 0; i < 8; i++) {
           const icon = document.createElement('div');
           const iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)];
           icon.className = `network-icon ${iconType}-icon`;
           
           // Random position
           icon.style.left = `${Math.random() * 90 + 5}%`;
           icon.style.top = `${Math.random() * 90 + 5}%`;
           
           // Random animation delay
           icon.style.animationDelay = `${Math.random() * 2}s`;
           
           networkBg.appendChild(icon);
       }
   }



   // Mobile JavaScript Enhancements

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slide counter
    updateSlideCounter();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowRight" || event.key === " ") {
            changeSlide(1);
        } else if (event.key === "ArrowLeft") {
            changeSlide(-1);
        }
    });
    
    // Enhanced touch support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        // Calculate horizontal and vertical distance
        const horizontalDist = touchEndX - touchStartX;
        const verticalDist = touchEndY - touchStartY;
        
        // Only register as swipe if horizontal movement is greater than vertical
        // This prevents accidental swipes when scrolling vertically
        if (Math.abs(horizontalDist) > Math.abs(verticalDist) + 30) {
            if (horizontalDist < -50) {
                // Swipe left (next slide)
                changeSlide(1);
            } else if (horizontalDist > 50) {
                // Swipe right (previous slide)
                changeSlide(-1);
            }
        }
    }
    
    // Add animation for initial slide
    animateSlideIn(currentSlide);
    
    // Create network background with reduced elements for mobile
    createResponsiveNetworkBackground();
    
    // Check if mobile and adjust accordingly
    checkMobileAndAdjust();
    
    // Listen for orientation changes
    window.addEventListener('resize', checkMobileAndAdjust);
});

// Function to change slides
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    
    // Hide current slide
    slides[currentSlide - 1].style.display = 'none';
    
    // Calculate new slide index
    currentSlide = currentSlide + direction;
    
    // Handle reaching the beginning or end
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    } else if (currentSlide < 1) {
        currentSlide = totalSlides;
    }
    
    // Show new slide with animation
    animateSlideIn(currentSlide);
    
    // Update the slide counter
    updateSlideCounter();
    
    // Scroll to top when changing slides on mobile
    if (window.innerWidth <= 768) {
        slides[currentSlide - 1].scrollTop = 0;
    }
}

// Function to check if mobile and make adjustments
function checkMobileAndAdjust() {
    const isMobile = window.innerWidth <= 768;
    const isLandscape = window.innerWidth > window.innerHeight;
    
    // Get all slides
    const slides = document.querySelectorAll('.slide');
    
    if (isMobile) {
        // Enable scrolling on all slides
        slides.forEach(slide => {
            slide.style.overflowY = 'auto';
        });
        
        // Special handling for slide with multiple area diagrams
        if (document.querySelector('.slide:nth-child(2)')) {
            const areaCircles = document.querySelectorAll('.area-circle');
            
            // Adjust area circles size based on orientation
            if (isLandscape) {
                areaCircles.forEach(circle => {
                    circle.style.transform = 'scale(0.4)';
                });
            } else {
                areaCircles.forEach(circle => {
                    circle.style.transform = 'scale(0.6)';
                });
            }
        }
        
        // Reduce number of background nodes
        adjustNetworkBackground(isMobile);
    } else {
        // Disable scrolling on desktop
        slides.forEach(slide => {
            slide.style.overflowY = 'hidden';
        });
        
        // Reset area circles if they exist
        const areaCircles = document.querySelectorAll('.area-circle');
        areaCircles.forEach(circle => {
            circle.style.transform = '';
        });
        
        // Reset background nodes for desktop
        adjustNetworkBackground(false);
    }
}

// Function to create responsive network background
function createResponsiveNetworkBackground() {
    const networkBg = document.getElementById('networkBg');
    const isMobile = window.innerWidth <= 768;
    
    // Clear existing background
    networkBg.innerHTML = '';
    
    // Determine number of nodes based on device
    const nodeCount = isMobile ? 8 : 15;
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        node.style.left = `${left}%`;
        node.style.top = `${top}%`;
        
        networkBg.appendChild(node);
        nodes.push({
            element: node,
            left: left,
            top: top
        });
    }
    
    // Create fewer connections on mobile
    const connectionThreshold = isMobile ? 0.85 : 0.7;
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            // Only connect some nodes (fewer on mobile)
            if (Math.random() > connectionThreshold) continue;
            
            const connection = document.createElement('div');
            connection.className = 'connection';
            
            // Calculate position and angle
            const x1 = nodes[i].left;
            const y1 = nodes[i].top;
            const x2 = nodes[j].left;
            const y2 = nodes[j].top;
            
            // Calculate distance
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            
            // Calculate angle
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            // Set connection style
            connection.style.width = `${distance}%`;
            connection.style.left = `${x1}%`;
            connection.style.top = `${y1}%`;
            connection.style.transform = `rotate(${angle}deg)`;
            
            networkBg.appendChild(connection);
        }
    }
    
    // Add fewer network icons on mobile
    const iconCount = isMobile ? 4 : 8;
    const iconTypes = ['router', 'switch', 'server', 'computer'];
    
    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('div');
        const iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)];
        icon.className = `network-icon ${iconType}-icon`;
        
        // Random position
        icon.style.left = `${Math.random() * 90 + 5}%`;
        icon.style.top = `${Math.random() * 90 + 5}%`;
        
        // Random animation delay
        icon.style.animationDelay = `${Math.random() * 2}s`;
        
        networkBg.appendChild(icon);
    }
}

// Function to adjust network background based on device
function adjustNetworkBackground(isMobile) {
    const networkBg = document.getElementById('networkBg');
    
    // Adjust opacity for better mobile viewing
    if (isMobile) {
        networkBg.style.opacity = '0.05';
    } else {
        networkBg.style.opacity = '0.1';
    }
}