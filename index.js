const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Atlassian Connect Express setup
const ace = require('atlassian-connect-express');
const addon = ace(app);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(addon.middleware());

// Routes
app.get('/', (req, res) => {
  res.redirect('/atlassian-connect.json');
});

// Lifecycle hooks
app.post('/installed', addon.authenticate(), (req, res) => {
  console.log('Addon installed successfully');
  res.status(200).send('Installed');
});

// Macro endpoints
app.get('/macro/jira-issues', addon.authenticate(), (req, res) => {
  const { jqlQuery, displayType, columns, maxResults } = req.query;
  
  // In a real implementation, we would fetch data from Jira here
  // For MVP, we'll return a placeholder
  res.render('macro', {
    jqlQuery,
    displayType: displayType || 'table',
    columns: columns ? columns.split(',') : ['key', 'summary', 'status'],
    maxResults: maxResults || 10,
    issues: [] // This would be populated with real data from Jira
  });
});

app.get('/macro/jira-issues/editor', addon.authenticate(), (req, res) => {
  res.render('editor');
});

// Views setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
