// React component for rendering Jira issues in different formats
import React from 'react';
import styled from 'styled-components';

// Styled components for the macro
const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #172B4D;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.th`
  background-color: #F4F5F7;
  text-align: left;
  padding: 8px 12px;
  border-bottom: 2px solid #DFE1E6;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid #DFE1E6;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #F4F5F7;
  }
`;

const IssueKey = styled.a`
  color: #0052CC;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const IssueStatus = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.category) {
      case 'new': return '#E2FCEF';
      case 'indeterminate': return '#DEEBFF';
      case 'done': return '#DFE1E6';
      default: return '#F4F5F7';
    }
  }};
  color: ${props => {
    switch (props.category) {
      case 'new': return '#006644';
      case 'indeterminate': return '#0747A6';
      case 'done': return '#42526E';
      default: return '#172B4D';
    }
  }};
`;

const IssueCount = styled.div`
  font-size: 16px;
  margin: 10px 0;
`;

const CountLink = styled.a`
  color: #0052CC;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SingleIssue = styled.div`
  border: 1px solid #DFE1E6;
  border-radius: 3px;
  padding: 12px;
  margin: 10px 0;
`;

const SingleIssueHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const IssueSummary = styled.span`
  margin-left: 8px;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  color: #DE350B;
  padding: 10px;
  background-color: #FFEBE6;
  border-radius: 3px;
  margin: 10px 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
`;

const JiraIssuesRenderer = ({ 
  issues, 
  jqlQuery, 
  displayType, 
  columns, 
  totalIssues, 
  jiraBaseUrl 
}) => {
  if (!issues || issues.length === 0) {
    return (
      <Container>
        <ErrorMessage>
          No issues found matching the query: {jqlQuery}
        </ErrorMessage>
      </Container>
    );
  }

  // Table view
  if (displayType === 'table') {
    return (
      <Container>
        <Table>
          <thead>
            <TableRow>
              {columns.map(column => (
                <TableHeader key={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {issues.map(issue => (
              <TableRow key={issue.key}>
                {columns.map(column => {
                  if (column === 'key') {
                    return (
                      <TableCell key={`${issue.key}-${column}`}>
                        <IssueKey 
                          href={`${jiraBaseUrl}/browse/${issue.key}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {issue.key}
                        </IssueKey>
                      </TableCell>
                    );
                  } else if (column === 'status') {
                    return (
                      <TableCell key={`${issue.key}-${column}`}>
                        <IssueStatus category={issue.fields.status.statusCategory.key.toLowerCase()}>
                          {issue.fields.status.name}
                        </IssueStatus>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={`${issue.key}-${column}`}>
                        {issue.fields[column] || ''}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </tbody>
        </Table>
        <Pagination>
          Showing {issues.length} of {totalIssues} issues
        </Pagination>
      </Container>
    );
  }

  // Single issue view
  if (displayType === 'single') {
    const issue = issues[0];
    return (
      <Container>
        <SingleIssue>
          <SingleIssueHeader>
            <IssueKey 
              href={`${jiraBaseUrl}/browse/${issue.key}`} 
              target="_blank"
              rel="noopener noreferrer"
            >
              {issue.key}
            </IssueKey>
            <IssueSummary>{issue.fields.summary}</IssueSummary>
          </SingleIssueHeader>
          <div>
            Status: 
            <IssueStatus category={issue.fields.status.statusCategory.key.toLowerCase()}>
              {issue.fields.status.name}
            </IssueStatus>
          </div>
        </SingleIssue>
      </Container>
    );
  }

  // Count view
  if (displayType === 'count') {
    return (
      <Container>
        <IssueCount>
          <CountLink 
            href={`${jiraBaseUrl}/issues/?jql=${encodeURIComponent(jqlQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {totalIssues} issue{totalIssues !== 1 ? 's' : ''} found
          </CountLink>
        </IssueCount>
      </Container>
    );
  }

  // Fallback
  return (
    <Container>
      <ErrorMessage>
        Invalid display type specified.
      </ErrorMessage>
    </Container>
  );
};

export default JiraIssuesRenderer;
