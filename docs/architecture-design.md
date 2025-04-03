# MVP Architecture Design for Jira Issue Macro Advanced

## Overview
This document outlines the architecture design for our MVP implementation of the Jira Issue Macro Advanced. The design focuses on creating a modular, maintainable, and extensible solution that replicates the core functionality of the original Jira Issue Macro.

## Architecture Components

### 1. Core Components

#### 1.1 Macro Framework
- **Atlassian Connect Framework**: Base framework for developing Confluence macros
- **Macro Descriptor**: JSON configuration defining the macro properties and capabilities
- **Macro Editor**: UI component for configuring the macro in the Confluence editor

#### 1.2 Data Layer
- **Jira API Client**: Module for communicating with Jira REST API
- **Authentication Service**: Handles OAuth authentication with Jira
- **Data Cache**: Temporary storage for retrieved Jira issues to improve performance

#### 1.3 UI Components
- **Macro Editor UI**: Interface for configuring the macro
- **Issue Renderer**: Renders issues in different formats (table, single issue, count)
- **Search Interface**: UI for searching and filtering Jira issues

### 2. Component Interactions

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Confluence     │     │  Jira Issue     │     │  Jira           │
│  Page           │◄────┤  Macro          │◄────┤  REST API       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              │
                        ┌─────▼─────┐
                        │           │
                        │  Macro    │
                        │  Editor   │
                        │           │
                        └───────────┘
```

## Technical Stack

### Frontend
- **React**: For building the macro editor and rendering interfaces
- **Atlassian Design System**: For UI components that match Atlassian's look and feel
- **CSS Modules**: For component-scoped styling

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework for handling API requests
- **Axios**: For making HTTP requests to Jira API

### Development Tools
- **Webpack**: For bundling and building the application
- **Babel**: For transpiling modern JavaScript
- **ESLint**: For code quality and consistency
- **Jest**: For unit testing

## Data Flow

1. **Macro Configuration**:
   - User inserts macro in Confluence editor
   - Macro editor loads and presents configuration options
   - User configures search criteria and display options
   - Configuration is saved with the macro

2. **Data Retrieval**:
   - When a page with the macro is loaded, the macro requests data from Jira
   - Authentication is handled via OAuth
   - JQL query is executed against Jira API
   - Results are cached for performance

3. **Rendering**:
   - Issues are rendered according to the configured display options
   - Links back to Jira are included
   - User interactions (if any) are handled

## MVP Implementation Plan

### Phase 1: Setup and Basic Structure
- Initialize project with Atlassian Connect Express (ACE)
- Configure basic macro descriptor
- Set up development environment

### Phase 2: Core Functionality
- Implement Jira API client
- Create authentication service
- Develop JQL query builder

### Phase 3: UI Components
- Build macro editor interface
- Implement issue rendering components
- Create search and filter UI

### Phase 4: Integration and Testing
- Integrate all components
- Test in Confluence environment
- Fix bugs and optimize performance

## Security Considerations

- OAuth tokens must be securely stored
- User permissions must be respected when retrieving Jira issues
- Input validation for all user-provided data
- XSS protection for rendered content

## Future Extensibility

The architecture is designed to be extensible for future enhancements:
- Additional display formats
- Advanced JQL templates
- Custom field support
- Issue creation and editing capabilities
- Integration with other Atlassian products
