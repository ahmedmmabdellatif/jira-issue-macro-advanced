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
      
      // Get existing parameters if any
      AP.getContext(function(context) {
        const project = context.extension?.parameters?.project || '';
        const status = context.extension?.parameters?.status || '';
        const display = context.extension?.parameters?.display || 'table';
        
        editorContainer.innerHTML = '<div class="editor-content"><h2>Jira Issues Advanced Editor</h2><p>Configure your Jira query below:</p><div class="form-group"><label>Project:</label><input type="text" id="project-input" placeholder="e.g., TEST" value="' + project + '"></div><div class="form-group"><label>Status:</label><select id="status-select"><option value="">Any</option><option value="open" ' + (status === 'open' ? 'selected' : '') + '>Open</option><option value="in-progress" ' + (status === 'in-progress' ? 'selected' : '') + '>In Progress</option><option value="done" ' + (status === 'done' ? 'selected' : '') + '>Done</option></select></div><div class="form-group"><label>Display as:</label><select id="display-select"><option value="table" ' + (display === 'table' ? 'selected' : '') + '>Table</option><option value="count" ' + (display === 'count' ? 'selected' : '') + '>Count</option><option value="single" ' + (display === 'single' ? 'selected' : '') + '>Single Issue</option></select></div><div class="button-group"><button id="save-button" class="primary-button">Save</button><button id="cancel-button" class="secondary-button">Cancel</button></div></div>';
        
        // Add event listeners
        document.getElementById('save-button').addEventListener('click', function() {
          saveConfiguration();
        });
        
        document.getElementById('cancel-button').addEventListener('click', function() {
          cancelConfiguration();
        });
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
    AP.dialog.close({
      parameters: {
        project: project,
        status: status,
        display: display
      }
    });
  }
  
  // Cancel the configuration and close the editor
  function cancelConfiguration() {
    console.log('Canceling configuration');
    AP.dialog.close();
  }
})();
