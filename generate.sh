#!/bin/bash

# Ask the user for file name
read -p 'file name: ' filevar

# Create the files with ref to MVC architecture
touch ./src/controllers/$filevar.controller.ts
touch ./src/services/$filevar.service.ts
touch ./src/routes/$filevar.route.ts
touch ./src/schemas/$filevar.schema.ts
touch ./src/interfaces/$filevar.interface.ts