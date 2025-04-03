/**
 * Initialization module for Jira Issues Advanced Macro
 * Based on the Interactive Timeplan implementation approach
 */

// Initialize the application
function initializeApp() {
  console.log('Initializing Jira Issues Advanced Macro');
  
  // Load external scripts if needed
  loadExternalScripts();
  
  // Initialize modules
  if (typeof window.ErrorHandling !== 'undefined') {
    window.ErrorHandling.initialize();
  }
  
  if (typeof window.EnhancedLoading !== 'undefined') {
    window.EnhancedLoading.initialize();
  } else {
    // Fallback initialization
    startBasicLoading();
  }
  
  if (typeof window.ViewportManagement !== 'undefined') {
    window.ViewportManagement.initialize();
  }
}

// Load any additional external scripts
function loadExternalScripts() {
  // No additional scripts needed for now
  console.log('External scripts loaded');
}

// Basic loading fallback
function startBasicLoading() {
  console.log('Using basic loading fallback');
  
  // Show loading indicator
  const loadingContainer = document.getElementById('loading-container');
  if (loadingContainer) {
    loadingContainer.style.display = 'flex';
  }
  
  // Determine if we're in editor mode
  const isEditorMode = window.location.search.includes('mode=editor');
  
  // Initialize appropriate component
  if (isEditorMode) {
    initializeEditor({});
  } else {
    initializeRenderer({});
  }
  
  // Hide loading indicator after a delay
  setTimeout(function() {
    if (loadingContainer) {
      loadingContainer.style.display = 'none';
    }
  }, 2000);
}

// Initialize the editor component
function initializeEditor(parameters) {
  console.log('Initializing editor with parameters:', parameters);
  
  const editorContainer = document.getElementById('editor-container');
  if (!editorContainer) return;
  
  // Show editor container
  editorContainer.style.display = 'block';
  
  // Render React component if available
  if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined' && typeof JiraIssuesMacroEditor !== 'undefined') {
    ReactDOM.render(
      React.createElement(JiraIssuesMacroEditor, parameters),
      editorContainer
    );
  } else {
    // Fallback for when React is not available
    editorContainer.innerHTML = `
      <div class="fallback-editor">
        <h2>Jira Issues Advanced Editor</h2>
        <p>The editor could not be loaded. Please refresh the page or try again later.</p>
      </div>
    `;
  }
}

// Initialize the renderer component
function initializeRenderer(parameters) {
  console.log('Initializing renderer with parameters:', parameters);
  
  const rendererContainer = document.getElementById('renderer-container');
  if (!rendererContainer) return;
  
  // Show renderer container
  rendererContainer.style.display = 'block';
  
  // Render React component if available
  if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined' && typeof JiraIssuesRenderer !== 'undefined') {
    // Mock data for testing
    const mockIssues = [
      {
        key: 'TEST-1',
        fields: {
          summary: 'User Story 1',
          status: {
            name: 'Open',
            statusCategory: { key: 'new' }
          }
        }
      },
      {
        key: 'TEST-2',
        fields: {
          summary: 'User Story 2',
          status: {
            name: 'In Progress',
            statusCategory: { key: 'indeterminate' }
          }
        }
      },
      {
        key: 'TEST-3',
        fields: {
          summary: 'User Story 3',
          status: {
            name: 'Done',
            statusCategory: { key: 'done' }
          }
        }
      }
    ];
    
    // Merge parameters with mock data for testing
    const props = {
      issues: mockIssues,
      jqlQuery: parameters.jqlQuery || 'project = TEST',
      displayType: parameters.displayType || 'table',
      columns: (parameters.columns || 'key,summary,status').split(','),
      totalIssues: mockIssues.length,
      jiraBaseUrl: 'https://your-jira-instance.atlassian.net'
    };
    
    ReactDOM.render(
      React.createElement(JiraIssuesRenderer, props),
      rendererContainer
    );
  } else {
    // Fallback for when React is not available
    rendererContainer.innerHTML = `
      <div class="fallback-renderer">
        <h2>Jira Issues Advanced</h2>
        <p>The renderer could not be loaded. Please refresh the page or try again later.</p>
      </div>
    `;
  }
}

// Make functions globally available
window.initializeApp = initializeApp;
window.initializeEditor = initializeEditor;
window.initializeRenderer = initializeRenderer;

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Start initialization
  initializeApp();
});
