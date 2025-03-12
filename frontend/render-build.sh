#!/usr/bin/env bash
# exit on error
set -o errexit

# These environment variables will be set in the Render dashboard
# and made available during the build
echo "Setting up environment variables for the build..."

# Export all environment variables with REACT_APP_ prefix
# so they're available to the React app during build time
export REACT_APP_SUPABASE_URL=$REACT_APP_SUPABASE_URL
export REACT_APP_SUPABASE_ANON_KEY=$REACT_APP_SUPABASE_ANON_KEY
export REACT_APP_API_URL=$REACT_APP_API_URL

# Make the script executable
chmod +x render-build.sh

# Install dependencies and build the app
echo "Installing dependencies..."
npm install

echo "Building the application..."
npm run build

echo "Build completed successfully!" 