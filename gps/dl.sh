#!/bin/bash -e

IFS=":" read hh mm < <(date +%:z)
move=$(($hh*3600+$mm*60))
date=$(date +%Y-%m-%d)

if [ ! -e /dev/rfcomm0 ]; then
	sudo rfcomm bind 0 00:0D:B5:38:BA:C6
	sudo chmod 666 /dev/rfcomm0
fi

while true
do
	echo "gpsbabel: download"
	if gpsbabel -i dg-100 -f /dev/rfcomm0 -x track,move=+$move -o gpx -F ${date}.gpx; then
		if [ $(cat ${date}.gpx | wc -c) -gt 1024 ]; then
			break
		fi
	fi
	sleep 5
done
while true
do
	echo "gpsbabel: delete"
	if gpsbabel -i dg-100,erase=1 -f /dev/rfcomm0 -o gpx -F deleted.gpx; then
		rm deleted.gpx
		break
	fi
	sleep 5
done
#gpsbabel -i gpx -f $(date +%Y-%m-%d).gpx -o kml,units=m -F $(date +%Y-%m-%d).kml
sudo rfcomm release 0

git add ${date}.gpx
echo -n "What is the track name? "
read name
git commit -m "gps: ${date} (${name})"
