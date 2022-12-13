# Running Locally
### Pre-requisite
Before getting started, make sure you have:
1. Node (version 16 or greater) and npm installed
2. Terraform installed
3. AWS CLI installed and configured with your AWS account credentials

### Running cascade-backend
1. clone the `cascade-backend` repo
2. in the `cdktf` directory, run `npm install`
3. in the root directory, run `npm install && npm install -g cdktf-cli`
4. run `npm start` to get the server running

### Running cascade-gui
1. clone the `cascade-gui` repo
2. run `npm install` in the terminal
3. run `npm run dev` to start the application

After both components are running, you can visit `localhost:3000` to use the Cascade GUI.

# Running with Docker
Follow the instructions in [Cascade Compose](https://github.com/try-cascade/cascade-compose)