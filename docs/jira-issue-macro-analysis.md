# Jira Issue Macro Analysis

## Overview
The Jira Issue Macro is a powerful integration tool in Confluence that allows users to display and interact with Jira issues directly within Confluence pages. This document analyzes the functionality, features, and implementation requirements for our MVP.

## Core Functionality

Based on our research, the Jira Issue Macro provides the following key features:

1. **Display Options**:
   - Display a single issue with key and summary
   - Display multiple issues in a table format
   - Display a count of issues matching specific criteria
   - Customize columns displayed in the table view

2. **Search Capabilities**:
   - Search using Jira Query Language (JQL)
   - Filter issues by project, status, assignee, etc.
   - Select specific issues from search results
   - Support for recently viewed issues

3. **Integration Points**:
   - Connect to Jira instances via Application Links
   - Authentication handling for restricted issues
   - Auto-convert Jira URLs pasted into Confluence
   - Create new Jira issues directly from Confluence

4. **UI Components**:
   - Macro browser/picker interface
   - Search input with JQL support
   - Issue selection interface
   - Display options configuration panel
   - Issue creation form

## User Interaction Flow

1. User inserts the macro while editing a Confluence page
2. User selects a Jira instance (if multiple are connected)
3. User searches for issues using keywords or JQL
4. User selects specific issues or includes all search results
5. User configures display options (columns, count vs. table, etc.)
6. User inserts the configured macro into the page
7. Viewers of the page see the rendered Jira issues with links back to Jira

## Technical Requirements

1. **Authentication**:
   - OAuth integration with Jira
   - Handling of user permissions and access control

2. **API Integration**:
   - Jira REST API for issue retrieval
   - Confluence API for macro rendering

3. **UI Components**:
   - Macro browser interface
   - Search and filter components
   - Display configuration options
   - Issue rendering templates

4. **Performance Considerations**:
   - Caching mechanisms for issue data
   - Pagination for large result sets
   - Asynchronous loading of issue data

## MVP Scope

For our MVP implementation, we will focus on:

1. Basic macro structure that can be inserted into Confluence pages
2. JQL search functionality to retrieve issues from Jira
3. Display of issues in table format with configurable columns
4. Single issue display with key and summary
5. Issue count display option
6. Links back to the original Jira issues

Future enhancements beyond MVP could include:
- Issue creation directly from Confluence
- Advanced display customization options
- Integration with other Atlassian products
- Custom JQL templates for common queries
