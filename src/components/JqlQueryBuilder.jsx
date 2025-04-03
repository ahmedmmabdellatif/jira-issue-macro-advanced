// JQL Query Builder component to help users create JQL queries
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import Form, { Field } from '@atlaskit/form';

const Container = styled.div`
  margin-top: 10px;
  padding: 16px;
  background-color: #F4F5F7;
  border-radius: 3px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 8px;
`;

const JqlQueryBuilder = ({ onApply }) => {
  const [conditions, setConditions] = useState([
    { field: 'project', operator: '=', value: '' }
  ]);

  const [conjunction, setConjunction] = useState('AND');

  const fieldOptions = [
    { label: 'Project', value: 'project' },
    { label: 'Issue Type', value: 'issuetype' },
    { label: 'Status', value: 'status' },
    { label: 'Priority', value: 'priority' },
    { label: 'Assignee', value: 'assignee' },
    { label: 'Reporter', value: 'reporter' },
    { label: 'Created', value: 'created' },
    { label: 'Updated', value: 'updated' },
    { label: 'Resolution', value: 'resolution' },
    { label: 'Labels', value: 'labels' }
  ];

  const operatorOptions = [
    { label: '=', value: '=' },
    { label: '!=', value: '!=' },
    { label: '>', value: '>' },
    { label: '>=', value: '>=' },
    { label: '<', value: '<' },
    { label: '<=', value: '<=' },
    { label: 'IN', value: 'IN' },
    { label: 'NOT IN', value: 'NOT IN' },
    { label: '~', value: '~' },
    { label: 'IS', value: 'IS' },
    { label: 'IS NOT', value: 'IS NOT' }
  ];

  const conjunctionOptions = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' }
  ];

  const handleFieldChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index].field = value;
    setConditions(newConditions);
  };

  const handleOperatorChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index].operator = value;
    setConditions(newConditions);
  };

  const handleValueChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index].value = value;
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { field: 'project', operator: '=', value: '' }]);
  };

  const removeCondition = (index) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };

  const buildJqlQuery = () => {
    return conditions
      .filter(condition => condition.value.trim() !== '')
      .map(condition => {
        const value = condition.value.includes(' ') ? 
          `"${condition.value}"` : condition.value;
        return `${condition.field} ${condition.operator} ${value}`;
      })
      .join(` ${conjunction} `);
  };

  const handleApply = () => {
    const jqlQuery = buildJqlQuery();
    if (jqlQuery && onApply) {
      onApply(jqlQuery);
    }
  };

  return (
    <Container>
      <h4>JQL Query Builder</h4>
      
      {conditions.map((condition, index) => (
        <Row key={index}>
          <Select
            value={fieldOptions.find(option => option.value === condition.field)}
            onChange={option => handleFieldChange(index, option.value)}
            options={fieldOptions}
            placeholder="Field"
            style={{ width: '30%' }}
          />
          
          <Select
            value={operatorOptions.find(option => option.value === condition.operator)}
            onChange={option => handleOperatorChange(index, option.value)}
            options={operatorOptions}
            placeholder="Operator"
            style={{ width: '20%' }}
          />
          
          <TextField
            value={condition.value}
            onChange={e => handleValueChange(index, e.target.value)}
            placeholder="Value"
            style={{ width: '40%' }}
          />
          
          {conditions.length > 1 && (
            <Button
              appearance="subtle"
              iconBefore={<span>×</span>}
              onClick={() => removeCondition(index)}
            />
          )}
        </Row>
      ))}
      
      {conditions.length > 1 && (
        <Row>
          <Select
            value={conjunctionOptions.find(option => option.value === conjunction)}
            onChange={option => setConjunction(option.value)}
            options={conjunctionOptions}
            placeholder="Conjunction"
            style={{ width: '100px' }}
          />
        </Row>
      )}
      
      <ButtonGroup>
        <Button appearance="subtle" onClick={addCondition}>
          Add Condition
        </Button>
        <Button appearance="primary" onClick={handleApply}>
          Apply
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default JqlQueryBuilder;
