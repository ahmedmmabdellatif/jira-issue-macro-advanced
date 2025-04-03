# Jira Issue Macro Advanced

An advanced implementation of the Jira issue macro for Confluence that enhances the functionality of the standard Jira Issues macro.

## Features

- Display Jira issues in multiple formats (table, single issue, count)
- Advanced JQL query builder for easy filtering
- Customizable columns and display options
- Modern UI using Atlassian Design System
- Seamless integration with Confluence and Jira

## Development Setup

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- Atlassian Connect Express (ACE)
- Confluence Cloud development instance

### Installation

1. Clone the repository:
```
git clone https://github.com/ahmedmmabdellatif/jira-issue-macro-advanced.git
cd jira-issue-macro-advanced
```

2. Install dependencies:
```
npm install
```

3. Build the frontend assets:
```
npm run build
```

4. Start the development server:
```
npm run dev
```

## Configuration

The macro is configured through the `atlassian-connect.json` file, which defines the macro's capabilities, parameters, and integration points with Confluence.

## Testing

To test the macro in a Confluence environment:

1. Ensure your development server is running
2. Use ngrok or a similar tool to expose your local server to the internet
3. Install the macro in your Confluence test instance using the exposed URL
4. Add the macro to a Confluence page and configure it

## Deployment

For production deployment:

1. Build the application:
```
npm run build
```

2. Deploy to a hosting service that supports Node.js applications
3. Update the `baseUrl` in `atlassian-connect.json` to point to your production URL
4. Install the macro in your Confluence instance using the production URL

## License

MIT

## Author

Ahmed Abdellatif
