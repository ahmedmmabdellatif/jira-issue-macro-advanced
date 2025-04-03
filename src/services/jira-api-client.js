/**
 * Jira API Client Service
 * 
 * This service handles communication with the Jira REST API
 * to fetch issues based on JQL queries and other parameters.
 */

const axios = require('axios');

class JiraApiClient {
  constructor(addon) {
    this.addon = addon;
  }

  /**
   * Get Jira issues based on JQL query
   * 
   * @param {Object} httpClient - The HTTP client from Atlassian Connect
   * @param {string} jqlQuery - JQL query string
   * @param {Array} fields - Fields to retrieve
   * @param {number} maxResults - Maximum number of results to return
   * @returns {Promise} - Promise resolving to issues data
   */
  async getIssues(httpClient, jqlQuery, fields = ['key', 'summary', 'status'], maxResults = 10) {
    try {
      const response = await httpClient.get('/rest/api/3/search', {
        params: {
          jql: jqlQuery,
          fields: fields.join(','),
          maxResults
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching Jira issues:', error);
      throw error;
    }
  }

  /**
   * Get a single Jira issue by key
   * 
   * @param {Object} httpClient - The HTTP client from Atlassian Connect
   * @param {string} issueKey - Jira issue key (e.g., PROJECT-123)
   * @param {Array} fields - Fields to retrieve
   * @returns {Promise} - Promise resolving to issue data
   */
  async getIssue(httpClient, issueKey, fields = ['key', 'summary', 'status', 'description']) {
    try {
      const response = await httpClient.get(`/rest/api/3/issue/${issueKey}`, {
        params: {
          fields: fields.join(',')
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching Jira issue ${issueKey}:`, error);
      throw error;
    }
  }

  /**
   * Get count of issues matching a JQL query
   * 
   * @param {Object} httpClient - The HTTP client from Atlassian Connect
   * @param {string} jqlQuery - JQL query string
   * @returns {Promise} - Promise resolving to issue count
   */
  async getIssueCount(httpClient, jqlQuery) {
    try {
      const response = await httpClient.get('/rest/api/3/search', {
        params: {
          jql: jqlQuery,
          maxResults: 0
        }
      });
      
      return response.data.total;
    } catch (error) {
      console.error('Error fetching Jira issue count:', error);
      throw error;
    }
  }
}

module.exports = JiraApiClient;
