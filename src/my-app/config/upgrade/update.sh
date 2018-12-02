#!/bin/bash
#
# Update yarn and all dependencies

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# define variables
old=$1
new=$2
localpath=$3
# remoterepo=$4

# make this script executable for next run
chmod a+x "v$new/$localpath/update.sh"

# navigate to destination directory
cd "v$new"

# upgrade yarn
brew upgrade yarn

# install dependencies
yarn

# install react-redux-firebase
yarn add react-redux-firebase redux-firestore # https://youtu.be/gf5bVfVlNUM?t=104

# install fontawesome
yarn add --dev @fortawesome/fontawesome-free # https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
yarn add @fortawesome/fontawesome-svg-core # https://github.com/FortAwesome/react-fontawesome#or-with-yarn
yarn add @fortawesome/free-solid-svg-icons # https://github.com/FortAwesome/react-fontawesome#or-with-yarn
yarn add @fortawesome/free-brands-svg-icons # https://github.com/FortAwesome/react-fontawesome#or-with-yarn
yarn add @fortawesome/react-fontawesome # https://github.com/FortAwesome/react-fontawesome#or-with-yarn

# install carousel solution
yarn add nuka-carousel # https://www.npmjs.com/package/nuka-carousel

# install other solutions
yarn add react-chartist
yarn add chartist
yarn add email-validator # https://www.npmjs.com/package/email-validator
yarn add react-number-format # https://www.npmjs.com/package/react-number-format

# integrate git
# ref: https://stackoverflow.com/a/53325899/1640892
# git init
# git clone <url_of_the_github_repository_extension_dot_git>
# git clone https://github.com/username/repo_name.git
# git add .
# git commit -m "first commit"
# git push origin master

# return to home path
cd ..