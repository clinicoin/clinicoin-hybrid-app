<?php
if ($_REQUEST["req"]==='ios') {
	readfile('ios.zip');
}
else if ($_REQUEST["req"]==='android') {
	readfile('android.zip');
}
else {
	readfile('version.json');
}