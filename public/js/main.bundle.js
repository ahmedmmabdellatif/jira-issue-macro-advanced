// Main bundle for Jira Issues Advanced Macro
(function() {
  'use strict';
  
  // Initialize the application when the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Main bundle loaded');
    
    // Get the mode from URL parameters (editor or renderer)
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'renderer';
    
    // Initialize the appropriate component based on mode
    if (mode === 'editor') {
      initializeEditor();
    } else {
      initializeRenderer();
    }
  });
  
  // Initialize the editor component
  function initializeEditor() {
    console.log('Initializing editor component');
    const editorContainer = document.getElementById('editor-container');
    if (editorContainer) {
      editorContainer.style.display = 'block';
      editorContainer.innerHTML = '<div class="editor-content"><h2>Jira Issues Advanced Editor</h2><p>Configure your Jira query below:</p><div class="form-group"><label>Project:</label><input type="text" id="project-input" placeholder="e.g., TEST"></div><div class="form-group"><label>Status:</label><select id="status-select"><option value="">Any</option><option value="open">Open</option><option value="in-progress">In Progress</option><option value="done">Done</option></select></div><div class="form-group"><label>Display as:</label><select id="display-select"><option value="table">Table</option><option value="count">Count</option><option value="single">Single Issue</option></select></div><div class="button-group"><button id="save-button" class="primary-button">Save</button><button id="cancel-button" class="secondary-button">Cancel</button></div></div>';
      
      // Add event listeners
      document.getElementById('save-button').addEventListener('click', function() {
        saveConfiguration();
      });
      
      document.getElementById('cancel-button').addEventListener('click', function() {
        cancelConfiguration();
      });
    }
  }
  
  // Initialize the renderer component
  function initializeRenderer() {
    console.log('Initializing renderer component');
    const rendererContainer = document.getElementById('renderer-container');
    if (rendererContainer) {
      rendererContainer.style.display = 'block';
      rendererContainer.innerHTML = '<div class="renderer-content"><h3>Jira Issues</h3><table class="jira-issues-table"><thead><tr><th>Key</th><th>Summary</th><th>Status</th><th>Priority</th></tr></thead><tbody><tr><td><a href="#">TEST-1</a></td><td>User Story 1</td><td>Open</td><td>Medium</td></tr><tr><td><a href="#">TEST-2</a></td><td>User Story 2</td><td>Open</td><td>Medium</td></tr><tr><td><a href="#">TEST-3</a></td><td>User Story 3</td><td>Open</td><td>Medium</td></tr></tbody></table></div>';
    }
  }
  
  // Save the configuration and close the editor
  function saveConfiguration() {
    console.log('Saving configuration');
    const project = document.getElementById('project-input').value;
    const status = document.getElementById('status-select').value;
    const display = document.getElementById('display-select').value;
    
    // In a real implementation, this would save the configuration to Confluence
    // and close the editor
    AP.confluence.saveMacro({
      project: project,
      status: status,
      display: display
    });
    
    AP.dialog.close();
  }
  
  // Cancel the configuration and close the editor
  function cancelConfiguration() {
    console.log('Canceling configuration');
    AP.dialog.close();
  }
})();
