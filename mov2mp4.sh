# Go through input files and convert all to mp4
# delete originals (be careful!)

# ffmpeg -i $1 -vcodec h264 $2

for f in "$@"
do
  if [[ $f == *.MOV ]]
  then
    of="${f%.MOV}.mp4"
    cmd="ffmpeg -y -i $f -vcodec h264 $of"
    echo cmd
    $cmd

    cmd="rm $f"
    rm $f
    echo cmd
    $cmd
  fi
done
