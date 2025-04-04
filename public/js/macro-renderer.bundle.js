// Renderer bundle for Jira Issues Advanced Macro
(function() {
  'use strict';
  
  // Initialize the renderer component when the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Renderer bundle loaded');
    initializeRenderer();
  });
  
  // Initialize the renderer component
  function initializeRenderer() {
    console.log('Initializing renderer component');
    const rendererContainer = document.getElementById('renderer-container');
    if (rendererContainer) {
      rendererContainer.style.display = 'block';
      
      // Get macro parameters from Confluence
      // Using AP.getContext() instead of AP.confluence.getMacroData()
      AP.getContext(function(context) {
        // Default values if no data is provided
        const project = context.extension?.parameters?.project || 'TEST';
        const status = context.extension?.parameters?.status || '';
        const display = context.extension?.parameters?.display || 'table';
        
        // Render the appropriate view based on display type
        if (display === 'count') {
          renderCountView(project, status);
        } else if (display === 'single') {
          renderSingleIssueView(project, status);
        } else {
          renderTableView(project, status);
        }
      });
    }
  }
  
  // Render the table view of Jira issues
  function renderTableView(project, status) {
    const rendererContainer = document.getElementById('renderer-container');
    rendererContainer.innerHTML = '<div class="renderer-content"><h3>Jira Issues</h3><table class="jira-issues-table"><thead><tr><th>Key</th><th>Summary</th><th>Status</th><th>Priority</th></tr></thead><tbody><tr><td><a href="#">' + project + '-1</a></td><td>User Story 1</td><td>Open</td><td>Medium</td></tr><tr><td><a href="#">' + project + '-2</a></td><td>User Story 2</td><td>Open</td><td>Medium</td></tr><tr><td><a href="#">' + project + '-3</a></td><td>User Story 3</td><td>Open</td><td>Medium</td></tr></tbody></table></div>';
  }
  
  // Render the count view of Jira issues
  function renderCountView(project, status) {
    const rendererContainer = document.getElementById('renderer-container');
    rendererContainer.innerHTML = '<div class="renderer-content"><div class="issue-count"><span class="count-number">3</span><span class="count-label">issues found</span></div></div>';
  }
  
  // Render the single issue view
  function renderSingleIssueView(project, status) {
    const rendererContainer = document.getElementById('renderer-container');
    rendererContainer.innerHTML = '<div class="renderer-content"><div class="single-issue"><div class="issue-key"><a href="#">' + project + '-1</a></div><div class="issue-summary">User Story 1</div><div class="issue-details"><span class="issue-status">Open</span><span class="issue-priority">Medium</span></div></div></div>';
  }
})();
