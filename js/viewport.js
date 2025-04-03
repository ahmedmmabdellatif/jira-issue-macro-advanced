/**
 * Viewport management module for Jira Issues Advanced Macro
 * Based on the Interactive Timeplan implementation approach
 */

// Viewport management system
const ViewportManagement = {
  viewportDimensions: {
    width: 0,
    height: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    contentWidth: 0,
    contentHeight: 0
  },
  resizeTimeout: null,
  resizeObserver: null,
  
  initialize: function() {
    console.log('Initializing viewport management system');
    
    // Get initial viewport dimensions
    this.updateViewportDimensions();
    
    // Set up resize handling
    this.setupResizeHandling();
    
    // Set up iframe resizing
    this.setupIframeResizing();
    
    // Apply responsive layout
    this.fixResponsiveLayout();
  },
  
  updateViewportDimensions: function() {
    this.viewportDimensions = {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      contentWidth: Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      ),
      contentHeight: Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      )
    };
    
    console.log('Viewport dimensions updated:', this.viewportDimensions);
  },
  
  setupResizeHandling: function() {
    // Use ResizeObserver if available
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(function(entries) {
        clearTimeout(ViewportManagement.resizeTimeout);
        ViewportManagement.resizeTimeout = setTimeout(function() {
          ViewportManagement.handleResize();
        }, 100);
      });
      
      this.resizeObserver.observe(document.body);
      this.resizeObserver.observe(document.documentElement);
    } else {
      // Fallback for browsers without ResizeObserver
      window.addEventListener('resize', function() {
        clearTimeout(ViewportManagement.resizeTimeout);
        ViewportManagement.resizeTimeout = setTimeout(function() {
          ViewportManagement.handleResize();
        }, 100);
      });
    }
    
    // Handle content changes that might affect size
    document.addEventListener('DOMContentLoaded', this.handleResize.bind(this));
    window.addEventListener('load', this.handleResize.bind(this));
  },
  
  handleResize: function() {
    // Update viewport dimensions
    this.updateViewportDimensions();
    
    // Update responsive layout
    this.fixResponsiveLayout();
    
    // Resize iframe
    this.resizeIframe();
  },
  
  setupIframeResizing: function() {
    // Set up mutation observer to detect content changes
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function(mutations) {
        clearTimeout(ViewportManagement.resizeTimeout);
        ViewportManagement.resizeTimeout = setTimeout(function() {
          ViewportManagement.resizeIframe();
        }, 100);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }
    
    // Initial resize
    setTimeout(this.resizeIframe.bind(this), 500);
  },
  
  resizeIframe: function() {
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    
    if (typeof AP !== 'undefined') {
      try {
        AP.resize('100%', height);
        console.log('Iframe resized to height:', height);
      } catch (error) {
        console.error('Error resizing iframe:', error);
        
        // Try alternative resize method
        try {
          AP.sizeToParent();
          console.log('Used sizeToParent as fallback');
        } catch (fallbackError) {
          console.error('Fallback resize also failed:', fallbackError);
        }
      }
    } else {
      console.log('AP not available, iframe resize skipped');
    }
  },
  
  fixResponsiveLayout: function() {
    const body = document.body;
    
    // Remove existing responsive classes
    body.classList.remove('viewport-xs', 'viewport-sm', 'viewport-md', 'viewport-lg');
    
    // Add appropriate class based on viewport width
    if (this.viewportDimensions.width < 576) {
      body.classList.add('viewport-xs');
    } else if (this.viewportDimensions.width < 768) {
      body.classList.add('viewport-sm');
    } else if (this.viewportDimensions.width < 992) {
      body.classList.add('viewport-md');
    } else {
      body.classList.add('viewport-lg');
    }
  }
};

// Export for global access
window.ViewportManagement = ViewportManagement;
