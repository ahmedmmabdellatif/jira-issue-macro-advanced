// React component for the Jira Issues Macro Editor
import React, { useState, useEffect } from 'react';
import Button from '@atlaskit/button';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import Checkbox from '@atlaskit/checkbox';
import { RadioGroup } from '@atlaskit/radio';

const JiraIssuesMacroEditor = () => {
  const [displayType, setDisplayType] = useState('table');
  const [columns, setColumns] = useState(['key', 'summary', 'status']);
  const [maxResults, setMaxResults] = useState(10);
  const [jqlQuery, setJqlQuery] = useState('');
  const [error, setError] = useState('');

  // Get macro data when editing an existing macro
  useEffect(() => {
    if (window.AP) {
      window.AP.require(['confluence'], function(confluence) {
        confluence.getMacroData(function(macroData) {
          if (macroData) {
            setJqlQuery(macroData.jqlQuery || '');
            setDisplayType(macroData.displayType || 'table');
            
            if (macroData.columns) {
              setColumns(macroData.columns.split(','));
            }
            
            if (macroData.maxResults) {
              setMaxResults(parseInt(macroData.maxResults, 10));
            }
          }
        });
      });
    }
  }, []);

  const handleSubmit = () => {
    if (!jqlQuery.trim()) {
      setError('JQL Query is required');
      return;
    }

    if (displayType === 'table' && columns.length === 0) {
      setError('Please select at least one column to display');
      return;
    }

    // Prepare macro parameters
    const macroParams = {
      jqlQuery,
      displayType,
      columns: columns.join(','),
      maxResults: displayType === 'table' ? maxResults : 1
    };

    // Save macro and close editor
    if (window.AP) {
      window.AP.require(['confluence'], function(confluence) {
        confluence.saveMacro(macroParams);
        confluence.closeMacroEditor();
      });
    }
  };

  const handleCancel = () => {
    if (window.AP) {
      window.AP.require(['confluence'], function(confluence) {
        confluence.closeMacroEditor();
      });
    }
  };

  const displayTypeOptions = [
    { name: 'displayType', value: 'table', label: 'Table' },
    { name: 'displayType', value: 'single', label: 'Single Issue' },
    { name: 'displayType', value: 'count', label: 'Issue Count' }
  ];

  const columnOptions = [
    { id: 'key', label: 'Key', value: 'key' },
    { id: 'summary', label: 'Summary', value: 'summary' },
    { id: 'status', label: 'Status', value: 'status' },
    { id: 'assignee', label: 'Assignee', value: 'assignee' },
    { id: 'priority', label: 'Priority', value: 'priority' },
    { id: 'created', label: 'Created', value: 'created' },
    { id: 'updated', label: 'Updated', value: 'updated' }
  ];

  const handleColumnChange = (columnId) => {
    setColumns(prevColumns => {
      if (prevColumns.includes(columnId)) {
        return prevColumns.filter(id => id !== columnId);
      } else {
        return [...prevColumns, columnId];
      }
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Configure Jira Issues Macro</h2>
      
      {error && (
        <div style={{ 
          color: '#DE350B', 
          padding: '10px', 
          backgroundColor: '#FFEBE6', 
          borderRadius: '3px', 
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}
      
      <Form onSubmit={handleSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field name="jqlQuery" label="JQL Query" isRequired>
              {({ fieldProps }) => (
                <TextField
                  {...fieldProps}
                  value={jqlQuery}
                  onChange={e => setJqlQuery(e.target.value)}
                  placeholder="e.g., project = 'PROJECT' AND status = 'Open'"
                  isRequired
                  elemAfterInput={
                    <Button appearance="subtle" iconBefore={<span>?</span>} />
                  }
                />
              )}
            </Field>
            
            <Field name="displayType" label="Display Type">
              {({ fieldProps }) => (
                <RadioGroup
                  {...fieldProps}
                  options={displayTypeOptions}
                  value={displayType}
                  onChange={e => setDisplayType(e.target.value)}
                />
              )}
            </Field>
            
            {displayType === 'table' && (
              <>
                <Field name="columns" label="Columns to Display">
                  {() => (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {columnOptions.map(option => (
                        <Checkbox
                          key={option.id}
                          isChecked={columns.includes(option.value)}
                          onChange={() => handleColumnChange(option.value)}
                          label={option.label}
                          name={`column-${option.id}`}
                        />
                      ))}
                    </div>
                  )}
                </Field>
                
                <Field name="maxResults" label="Maximum Results">
                  {({ fieldProps }) => (
                    <TextField
                      {...fieldProps}
                      type="number"
                      min={1}
                      max={100}
                      value={maxResults}
                      onChange={e => setMaxResults(parseInt(e.target.value, 10))}
                    />
                  )}
                </Field>
              </>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <Button appearance="subtle" onClick={handleCancel}>
                Cancel
              </Button>
              <Button appearance="primary" type="submit">
                Insert
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default JiraIssuesMacroEditor;
