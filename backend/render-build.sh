#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Setting up backend for deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build TypeScript code
echo "Building TypeScript code..."
npm run build

echo "Backend build completed successfully!" 