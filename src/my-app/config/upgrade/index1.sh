#!/bin/bash
#
# Config Upgrades
#
# ref: https://www.macs.hw.ac.uk/~hwloidl/Courses/LinuxIntro/x984.html
#
# Usage:
# non-recurring, make it executable
# chmod a+x v03/src/my-app/config/upgrade/index.sh
# run the following each time; in this case, to upgrade from v03 to v04
# ./v03/src/my-app/config/upgrade/index.sh v03 v04
# -----------------------------------------------------------------------------
# run the script while in the following directory
# cd dropbox/swap/fuse

# copy list of files to xfer, store them in a temp file in the dest directory
cp $1/src/my-app/config/upgrade/xfer.txt $2/files-to-xfer-temp.txt

# navigate to destination directory
cd $2
# rename certain files in destination directory
# ref: https://unix.stackexchange.com/a/481334/167174
while read ; do mv "$REPLY" "${REPLY%.js}-orig.js" ; done < files-to-xfer-temp.txt
# cleanup
rm files-to-xfer-temp.txt

# navigate to source directory
cd ../$1
# copy files listed in xfter.txt from source then paste to destination directories
# ref: https://unix.stackexchange.com/a/481043/167174
cpio -u --create < src/my-app/config/upgrade/xfer.txt | (cd ../$2 && cpio --extract)

# navigate back to parent directory
cd ..

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   
#
#   COPY DIRECTORIES
#
#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   
# create destination directories
# mkdir $2/src/my-app/
# mkdir $2/src/store/actions/my-actions
# mkdir $2/src/store/reducers/my-reducers
# # copy directories
# cp -r $1/src/my-app/ $2/src/my-app/
# cp -r $1/src/store/actions/my-actions $2/src/store/actions/my-actions
# cp -r $1/src/store/reducers/my-reducers $2/src/store/reducers/my-reducers
# INSTRUCTIONS FOR COPYING DIRECTORIES AND CONTENTS
# mkdir v03/src/store/actions/my-actions && mkdir v03/src/store/reducers/my-reducers
# # adds folder to destination (because it does NOT have a trailing slash behind the source directory '/')
# cp -r v01/src/store/actions/my-actions v03/src/store/actions/my-actions && cp -r v01/src/store/reducers/my-reducers v03/src/store/reducers/my-reducers
# cp -r v01/src/store/actions/my-actions v03/src/store/actions/my-actions/ && cp -r v01/src/store/reducers/my-reducers v03/src/store/reducers/my-reducers/
# # does NOT add a folder to destination (because it has trailing slash behind the source directory '/')
# cp -r v01/src/store/actions/my-actions/ v03/src/store/actions/my-actions && cp -r v01/src/store/reducers/my-reducers/ v03/src/store/reducers/my-reducers
# # a trailing slash behind the source directory means only the directory contents are copied not the directory itself
# # the trailing slash makes a `mkdir` command necessary prior to the `cp` command
# # to do the copy paste in a single command, omit the trailing slash from the source directory in the `cp` command as follows
# cp -r v01/src/store/actions/my-actions v03/src/store/actions/my-actions && cp -r v01/src/store/reducers/my-reducers v03/src/store/reducers/my-reducers
# # the following lines correctly implement the `cp` command to copy the directory contents and the directory itself
cp -r $1/src/my-app $2/src/my-app
cp -r $1/src/store/actions/my-actions $2/src/store/actions/my-actions
cp -r $1/src/store/reducers/my-reducers $2/src/store/reducers/my-reducers
#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# make this script executable for next run
chmod a+x $2/src/my-app/config/upgrade/index.sh

# navigate to destination directory
cd $2

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

# start dev server
yarn start



# NOTES
# - add all new files to /src/my-app
# - ~@edit@~ remove (comment out) footer and rightSidePanel from <FuseLayout> in index.js
# - insert new logo in root/public/assets/images/logos/new-brand.svg
# - ~@edit@~ branding in src/main/MainNavbarHeader.js (2 places)

# 1. /src/fuse-configs/fuseNavigationConfig.js -- duplicate(append: `-orig`); rewrite file
# 3. /src/main/content/components/ComponentsConfig.js => /src/my-app/ComponentsConfig.js (now /src/my-app/config/ComponentsConfig.js)
#    - when editing routes in 3 (ComponentsConfig), make sure they match the url in 1 (fuseNavigationConfig).
#    - and that the redirectTo in 2 (fuseRoutesConfig) matches the first (home) route in both 1 (fuseNavigationConfig) and 3 (ComponentsConfig)
# 4. note: home page redirection is via
#    A. /src/fuse-configs/fuseRoutesConfig.js
#    B. /src/main/content/apps/dashboards/analytics/AnalyticsDashboardAppConfig.js
#       note: to avoid collisions, might want to turn off this path/link connection at a later time