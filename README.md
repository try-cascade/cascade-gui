# Pre-requisite
Before getting started, make sure you have:
1. Node (version 16 or greater) installed with npm
2. Terraform installed
3. AWS CLI installed and configured with your AWS account credentials

# Running cascade-backend
1. clone the `cascade-backend` repo
2. in the cdktf directory, run `npm install -g cdktf-cli && npm install`
3. in the src directory, run `npm install`
4. in the root directory, run `npm start` to get the server running

# Running cascade-gui
1. clone the `cascade-gui` repo
2. run `npm install` in the terminal
3. run `npm run dev` to start the application

After both components are running, you can visit `localhost:3000` to use the Cascade GUI.