<?php
if ($_REQUEST["req"]==='ios') {
	header('content-type: application/zip');
	readfile('ios.zip');
}
else if ($_REQUEST["req"]==='android') {
	header('content-type: application/zip');
	readfile('android.zip');
}
else {
	readfile('version.json');
}