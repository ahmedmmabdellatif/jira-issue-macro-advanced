/**
 * Loading system module for Jira Issues Advanced Macro
 * Based on the Interactive Timeplan implementation approach
 */

// Loading states
const LoadingStates = {
  INITIAL: 'initial',
  CONNECTING: 'connecting',
  LOADING_RESOURCES: 'loading_resources',
  INITIALIZING: 'initializing',
  LOADING_DATA: 'loading_data',
  RENDERING: 'rendering',
  COMPLETE: 'complete',
  ERROR: 'error'
};

// Loading system
const EnhancedLoading = {
  currentState: LoadingStates.INITIAL,
  timeoutIds: {},
  
  initialize: function() {
    console.log('Initializing enhanced loading system');
    this.updateLoadingState(LoadingStates.INITIAL);
    
    // Start the loading sequence
    this.startLoading();
  },
  
  startLoading: function() {
    // Show loading indicator
    const loadingContainer = document.getElementById('loading-container');
    if (loadingContainer) {
      loadingContainer.style.display = 'flex';
    }
    
    // Start the loading sequence
    this.updateLoadingState(LoadingStates.CONNECTING);
    this.setStateTimeout(LoadingStates.CONNECTING, 10000); // 10 seconds timeout
    
    // Initialize Confluence Connect API
    this.initializeConnectAPI();
  },
  
  initializeConnectAPI: function() {
    // Check if AP is available
    if (typeof AP !== 'undefined') {
      try {
        AP.require(['confluence'], function(confluence) {
          console.log('Confluence Connect API initialized');
          EnhancedLoading.updateLoadingState(LoadingStates.LOADING_RESOURCES);
          EnhancedLoading.setStateTimeout(LoadingStates.LOADING_RESOURCES, 15000); // 15 seconds timeout
          
          // Load resources
          EnhancedLoading.loadResources();
        });
      } catch (error) {
        if (window.ErrorHandling) {
          window.ErrorHandling.handleError(error, {
            type: 'confluence_api',
            severity: 'high',
            source: 'initializeConnectAPI'
          });
        } else {
          console.error('Error initializing Confluence Connect API:', error);
          this.handleLoadingError(
            'Connection Error',
            'Unable to connect to Confluence. Please refresh the page.'
          );
        }
      }
    } else {
      console.log('AP not available, falling back to standalone mode');
      // Fallback to standalone mode for testing
      this.updateLoadingState(LoadingStates.LOADING_RESOURCES);
      this.loadResources();
    }
  },
  
  loadResources: function() {
    // Simulate loading resources
    setTimeout(function() {
      EnhancedLoading.updateLoadingState(LoadingStates.INITIALIZING);
      EnhancedLoading.setStateTimeout(LoadingStates.INITIALIZING, 10000); // 10 seconds timeout
      
      // Initialize the app
      EnhancedLoading.initializeApp();
    }, 1000);
  },
  
  initializeApp: function() {
    // Get macro parameters
    this.getMacroParameters(function(parameters) {
      EnhancedLoading.updateLoadingState(LoadingStates.LOADING_DATA);
      EnhancedLoading.setStateTimeout(LoadingStates.LOADING_DATA, 20000); // 20 seconds timeout
      
      // Determine if we're in editor mode
      const isEditorMode = window.location.search.includes('mode=editor');
      
      if (isEditorMode) {
        // Show editor
        const editorContainer = document.getElementById('editor-container');
        if (editorContainer) {
          editorContainer.style.display = 'block';
        }
        
        // Initialize editor
        if (typeof window.initializeEditor === 'function') {
          window.initializeEditor(parameters);
        }
      } else {
        // Show renderer
        const rendererContainer = document.getElementById('renderer-container');
        if (rendererContainer) {
          rendererContainer.style.display = 'block';
        }
        
        // Initialize renderer
        if (typeof window.initializeRenderer === 'function') {
          window.initializeRenderer(parameters);
        }
      }
      
      // Complete loading
      EnhancedLoading.updateLoadingState(LoadingStates.COMPLETE);
      
      // Hide loading indicator
      const loadingContainer = document.getElementById('loading-container');
      if (loadingContainer) {
        loadingContainer.style.display = 'none';
      }
    });
  },
  
  getMacroParameters: function(callback) {
    // Try to get parameters from Confluence
    if (typeof AP !== 'undefined') {
      try {
        AP.require(['confluence'], function(confluence) {
          confluence.getMacroData(function(data) {
            callback(data || {});
          });
        });
      } catch (error) {
        console.error('Error getting macro parameters:', error);
        callback({});
      }
    } else {
      // Fallback for testing: parse URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const params = {};
      
      // Extract parameters from URL
      for (const [key, value] of urlParams.entries()) {
        params[key] = value;
      }
      
      callback(params);
    }
  },
  
  updateLoadingState: function(newState) {
    console.log('Loading state changed:', this.currentState, '->', newState);
    this.currentState = newState;
    
    // Update loading indicator text
    this.updateLoadingIndicator();
  },
  
  updateLoadingIndicator: function() {
    const loadingText = document.querySelector('.loading-text');
    if (!loadingText) return;
    
    switch (this.currentState) {
      case LoadingStates.CONNECTING:
        loadingText.textContent = 'Connecting to Confluence...';
        break;
      case LoadingStates.LOADING_RESOURCES:
        loadingText.textContent = 'Loading resources...';
        break;
      case LoadingStates.INITIALIZING:
        loadingText.textContent = 'Initializing...';
        break;
      case LoadingStates.LOADING_DATA:
        loadingText.textContent = 'Loading Jira data...';
        break;
      case LoadingStates.RENDERING:
        loadingText.textContent = 'Rendering content...';
        break;
      case LoadingStates.COMPLETE:
        loadingText.textContent = 'Complete!';
        break;
      default:
        loadingText.textContent = 'Loading Jira Issues Advanced...';
    }
  },
  
  setStateTimeout: function(state, timeout) {
    this.clearStateTimeout(state);
    
    this.timeoutIds[state] = setTimeout(function() {
      if (EnhancedLoading.currentState === state) {
        console.log('Timeout reached for state:', state);
        EnhancedLoading.handleLoadingError(
          'Loading Timeout',
          `The app is taking longer than expected to ${EnhancedLoading.getTimeoutMessage(state)}. Please try refreshing the page.`
        );
      }
    }, timeout);
  },
  
  clearStateTimeout: function(state) {
    if (this.timeoutIds[state]) {
      clearTimeout(this.timeoutIds[state]);
      delete this.timeoutIds[state];
    }
  },
  
  getTimeoutMessage: function(state) {
    switch (state) {
      case LoadingStates.CONNECTING:
        return 'connect to Confluence';
      case LoadingStates.LOADING_RESOURCES:
        return 'load resources';
      case LoadingStates.INITIALIZING:
        return 'initialize';
      case LoadingStates.LOADING_DATA:
        return 'load Jira data';
      case LoadingStates.RENDERING:
        return 'render content';
      default:
        return 'load';
    }
  },
  
  handleLoadingError: function(title, message) {
    this.updateLoadingState(LoadingStates.ERROR);
    
    // Use ErrorHandling if available
    if (window.ErrorHandling) {
      window.ErrorHandling.showErrorMessage(title, message, true);
    } else {
      // Fallback error handling
      const loadingContainer = document.getElementById('loading-container');
      if (loadingContainer) {
        loadingContainer.style.display = 'none';
      }
      
      const errorContainer = document.getElementById('error-container');
      const errorTitle = errorContainer.querySelector('.error-title');
      const errorMessage = document.getElementById('error-message');
      
      if (errorTitle) errorTitle.textContent = title;
      if (errorMessage) errorMessage.textContent = message;
      if (errorContainer) errorContainer.style.display = 'flex';
    }
  }
};

// Export for global access
window.EnhancedLoading = EnhancedLoading;
