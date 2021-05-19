# ffmpeg command

```bash
ffmpeg -y -hide_banner -vsync passthrough -i /sources/audio/1.mp3 -stdin -map 0:a:0 -c:a libfdk_aac -b:a 320k -seg_duration 5 -use_timeline 0 -use_template 1 -hls_playlist 1 -single_file 1 -single_file_name stream.$ext$ -f dash /assets/audio/1/manifest.mpd
```
