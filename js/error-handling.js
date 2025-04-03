/**
 * Error handling module for Jira Issues Advanced Macro
 * Based on the Interactive Timeplan implementation approach
 */

// Error types and severity levels
const ErrorTypes = {
  INITIALIZATION: 'initialization',
  CONFLUENCE_API: 'confluence_api',
  JIRA_API: 'jira_api',
  DATA_PROCESSING: 'data_processing',
  UI_RENDERING: 'ui_rendering',
  NETWORK: 'network',
  UNKNOWN: 'unknown'
};

const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Error handling system
const ErrorHandling = {
  initialize: function() {
    console.log('Initializing error handling system');
    
    // Set up global error handler
    window.onerror = function(message, source, lineno, colno, error) {
      ErrorHandling.handleError(error || new Error(message), {
        type: ErrorTypes.UNKNOWN,
        severity: ErrorSeverity.HIGH,
        source: source,
        line: lineno,
        column: colno
      });
      return true; // Prevent default browser error handling
    };
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      ErrorHandling.handleError(event.reason, {
        type: ErrorTypes.UNKNOWN,
        severity: ErrorSeverity.HIGH,
        source: 'promise_rejection'
      });
    });
    
    // Initialize retry button
    const retryButton = document.getElementById('retry-button');
    if (retryButton) {
      retryButton.addEventListener('click', function() {
        ErrorHandling.hideErrorMessage();
        if (typeof window.initializeApp === 'function') {
          window.initializeApp();
        }
      });
    }
  },
  
  handleError: function(error, metadata = {}) {
    const type = metadata.type || ErrorTypes.UNKNOWN;
    const severity = metadata.severity || ErrorSeverity.MEDIUM;
    const source = metadata.source || 'unknown';
    
    // Log error with metadata
    console.error(`Error [${type}][${severity}][${source}]:`, error);
    
    // Attempt recovery based on error type and severity
    if (severity !== ErrorSeverity.CRITICAL) {
      this.attemptRecovery(type, error);
    } else {
      this.showErrorMessage(
        'Critical Error',
        'A critical error occurred. Please refresh the page.'
      );
    }
  },
  
  attemptRecovery: function(type, error) {
    console.log(`Attempting recovery from ${type} error`);
    
    switch (type) {
      case ErrorTypes.INITIALIZATION:
        // Try reinitializing the app
        if (typeof window.initializeApp === 'function') {
          setTimeout(window.initializeApp, 1000);
        }
        break;
        
      case ErrorTypes.CONFLUENCE_API:
        // Try reconnecting to Confluence API
        this.showErrorMessage(
          'Confluence Connection Error',
          'Having trouble connecting to Confluence. Retrying...'
        );
        if (typeof window.reconnectToConfluence === 'function') {
          setTimeout(window.reconnectToConfluence, 2000);
        }
        break;
        
      case ErrorTypes.JIRA_API:
        // Show error but allow continuing with limited functionality
        this.showErrorMessage(
          'Jira Connection Error',
          'Unable to connect to Jira. Some features may be limited.',
          true
        );
        break;
        
      case ErrorTypes.NETWORK:
        // Retry network requests
        this.showErrorMessage(
          'Network Error',
          'Network connection issue detected. Retrying...'
        );
        if (typeof window.retryNetworkRequests === 'function') {
          setTimeout(window.retryNetworkRequests, 3000);
        }
        break;
        
      default:
        // For unknown errors, show message and allow retry
        this.showErrorMessage(
          'Unexpected Error',
          'An unexpected error occurred. Please try again.',
          true
        );
    }
  },
  
  showErrorMessage: function(title, message, showRetry = true) {
    const errorContainer = document.getElementById('error-container');
    const errorTitle = errorContainer.querySelector('.error-title');
    const errorMessage = document.getElementById('error-message');
    const retryButton = document.getElementById('retry-button');
    const loadingContainer = document.getElementById('loading-container');
    
    // Hide loading indicator if visible
    if (loadingContainer) {
      loadingContainer.style.display = 'none';
    }
    
    // Update error message
    if (errorTitle) errorTitle.textContent = title;
    if (errorMessage) errorMessage.textContent = message;
    
    // Show/hide retry button
    if (retryButton) {
      retryButton.style.display = showRetry ? 'block' : 'none';
    }
    
    // Show error container
    if (errorContainer) {
      errorContainer.style.display = 'flex';
    }
  },
  
  hideErrorMessage: function() {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.style.display = 'none';
    }
  }
};

// Export for global access
window.ErrorHandling = ErrorHandling;
