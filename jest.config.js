const projects = [
  '<rootDir>/apps/**/jest.config.js',
  // '<rootDir>/configs/**/jest.config.js',
  // '<rootDir>/features/**/*/jest.config.js',
  // '<rootDir>/libs/**/jest.config.js',
];

module.exports = require('@configs/jest')({ projects });
