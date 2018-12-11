#!/bin/bash
#
# compare files for changes
# compare all files in xfer.txt

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# define variables
old=$1
new=$2
localpath=$3
# remoterepo=$4
compareto=$4

# ref: https://unix.stackexchange.com/a/481182/167174
# md5 -r v03/README-orig.md
# md5 -c <file1> <file2>
# md5 v03/src/@fuse/components/FuseAuthorization/FuseAuthorization-orig.js \
# md5 v04/src/@fuse/components/FuseAuthorization/FuseAuthorization.js
# while IFS= read -r filename;
#   # do diff $old/"$filename-orig" $new/"$filename"; # verbose
#   do [[ $(md5 v$old/"$filename-orig") = $(md5 v$new/"$filename") ]] || echo $filename differs; # boolean
#   done < v$old/$localpath/$compareto
# ref: https://stackoverflow.com/a/965072/1640892
# https://www.cyberciti.biz/faq/bash-loop-over-file/
# while IFS= read -r fullfile; # path/to/foo.bar # does not read last line
# solution: https://stackoverflow.com/a/12919766/1640892
# # loop over every file in the directory labeled "v$old/$localpath/$compareto"
while IFS= read -r fullfile || [ -n "$fullfile" ]; # path/to/foo.bar
  do
    filename="${fullfile##*/}" # foo.bar
    pathto="${fullfile%/*}" # path/to
    prefix="${filename%.*}"; # foo
    extension="${filename##*.}" # bar
    # echo "fullfile: $fullfile"
    # echo "pathto: $pathto"
    # echo "filename: $filename"
    # echo "prefix: $prefix"
    # echo "extension: $extension"
    derivative="$pathto/$prefix-orig.$extension" # path/to/foo-orig.bar
    oldfile="v$old/$derivative"
    newfile="v$new/$derivative"
    md5 "$oldfile"
    md5 "$newfile"
    # use the md5 hash checksum algorithm to compare each file in the list
    [[ $(md5 -q "$oldfile") == $(md5 -q "$newfile") ]] || echo "differs: $derivative"; # boolean
  done < "v$old/$localpath/$compareto"

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# compare the two directories for changes in the apps (original vs modified)
dir1="v$new/src/main/content/apps/"
dir2="v$new/src/my-app/apps-orig/"
# TODO start while loop
# dir1="v$new/src/main/content/pages/profile"
# dir2="v$new/src/my-app/profile-orig"
# TODO end whild loop
echo "Comparing $dir1 to $dir2..."
# rsync -ai --dry-run dir1 dir2
rsync -ai --dry-run "$dir1/" "$dir2/"
# ref: https://stackoverflow.com/a/53679909/1640892
# if [[ -n $(rsync -ai --dry-run dir1/ dir2/) ]]; then
if rsync -ai --dry-run "$dir1/" "$dir2/" | grep -q "."
then
  echo "⚠️ The app files are different❗"
  rsync -ai --dry-run "$dir1/" "$dir2/"
  # do the following copy AFTER comparing the files for differences
  # cp -r "v$new/src/main/content/apps" "v$new/src/my-app/apps-orig" # cp -r "src/main/content/apps" "src/my-app/apps-orig" # cp -r "src/main/content/apps" "src/my-app/apps1"
  echo "⚠️ The app files are different❗"
else
  echo "👍 The app files are the same.🚀"
fi

# make this script executable for next run
chmod a+x "v$new/$localpath/compare.sh"