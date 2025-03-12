#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Setting up backend for deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Install type definitions
echo "Installing type definitions..."
npm install --save-dev @types/cors @types/express @types/node

# Build TypeScript code
echo "Building TypeScript code..."
npm run build

echo "Backend build completed successfully!" 