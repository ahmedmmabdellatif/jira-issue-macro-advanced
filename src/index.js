// Main entry point for client-side React application
import React from 'react';
import ReactDOM from 'react-dom';
import JiraIssuesMacroEditor from './components/JiraIssuesMacroEditor';
import JiraIssuesRenderer from './components/JiraIssuesRenderer';
import JqlQueryBuilder from './components/JqlQueryBuilder';

// Initialize Atlassian Connect JS
const initializeAP = () => {
  if (window.AP) {
    window.AP.require(['confluence'], function(confluence) {
      console.log('Atlassian Connect JS initialized');
    });
  }
};

// Render the appropriate component based on the current page
const renderApp = () => {
  const editorContainer = document.getElementById('jira-issues-editor');
  const rendererContainer = document.getElementById('jira-issues-renderer');
  
  if (editorContainer) {
    ReactDOM.render(<JiraIssuesMacroEditor />, editorContainer);
  }
  
  if (rendererContainer) {
    // Get data from the container's data attributes
    const issues = JSON.parse(rendererContainer.dataset.issues || '[]');
    const jqlQuery = rendererContainer.dataset.jqlQuery || '';
    const displayType = rendererContainer.dataset.displayType || 'table';
    const columns = (rendererContainer.dataset.columns || 'key,summary,status').split(',');
    const totalIssues = parseInt(rendererContainer.dataset.totalIssues || '0', 10);
    const jiraBaseUrl = rendererContainer.dataset.jiraBaseUrl || '';
    
    ReactDOM.render(
      <JiraIssuesRenderer 
        issues={issues}
        jqlQuery={jqlQuery}
        displayType={displayType}
        columns={columns}
        totalIssues={totalIssues}
        jiraBaseUrl={jiraBaseUrl}
      />, 
      rendererContainer
    );
  }
};

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeAP();
  renderApp();
});

// Export components for use in other files
export {
  JiraIssuesMacroEditor,
  JiraIssuesRenderer,
  JqlQueryBuilder
};
