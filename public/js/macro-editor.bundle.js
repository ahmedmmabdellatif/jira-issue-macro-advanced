// Editor bundle for Jira Issues Advanced Macro
(function() {
  'use strict';
  
  // Initialize the editor component when the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Editor bundle loaded');
    initializeEditor();
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
