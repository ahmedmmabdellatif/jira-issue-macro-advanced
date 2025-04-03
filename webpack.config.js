const path = require('path');

module.exports = {
  entry: {
    'macro-editor': './src/components/JiraIssuesMacroEditor.jsx',
    'macro-renderer': './src/components/JiraIssuesRenderer.jsx',
    'main': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
