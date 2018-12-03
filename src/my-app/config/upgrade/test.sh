#!/bin/bash
# chmod a+x src/my-app/config/test.sh
# ./src/my-app/config/test.sh
# echo hello world
# ./src/my-app/config/test.sh foo bar
# echo $1 $2 # foo bar
# ./v03/src/my-app/config/test.sh 03
# mkdir v$1/src/my-test/
# echo v$1
# while IFS= read -r fullfile; # path/to/foo.bar
while IFS= read -r fullfile || [ -n "$fullfile" ]; # path/to/foo.bar
# while read
# while read line || [ -n "$line" ]; do
# https://stackoverflow.com/a/12919766/1640892
# https://www.cyberciti.biz/faq/bash-loop-over-file/
# files=/src/my-app/config/upgrade/xfer.txt
# for fullfile in $files
  do
    # fullfile="$REPLY" # path/to/foo.bar
    # filename="${fullfile##*/}" # foo.bar
    # pathto="${fullfile%/*}" # path/to
    # prefix="${filename%.*}"; # foo
    # extension="${filename##*.}" # bar
    echo "fullfile: $fullfile"
    # # echo "pathto: $pathto"
    # # echo "filename: $filename"
    # # echo "prefix: $prefix"
    # # echo "extension: $extension"
    # derivative="$pathto/$prefix-orig.$extension"
    # oldfile="v$old/$derivative"
    # newfile="v$new/$derivative"
    # md5 "$oldfile"
    # md5 "$newfile"
    # [[ $(md5 -q "$oldfile") == $(md5 -q "$newfile") ]] || echo "differs: $derivative"; # boolean
  done < src/my-app/config/upgrade/xfer.txt

  # chmod a+x "src/my-app/config/upgrade/test.sh"
  # ./src/my-app/config/upgrade/test.sh