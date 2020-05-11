<?php
@system("clear");
date_default_timezone_set('Asia/Ho_Chi_Minh');
$b="\033[1;35m";
$red="\033[1;31m";
$green="\033[1;32m";
$puti="\033[1;37m";
print "
[35m---------------------------[32m
$b| Tool:[31mViral Channel$b |
[35m---------------------------[32m
CHANNEL    :[34mVQH Tổng Hợp
[32m
YOUTUBE   :[34mSUBSCRIBE TO MY CHANNEL
[32m
[32m
CREATOR:[31mVQH Tổng Hợp[32m
[32m
";



while (true){
$url = "https://viralchannel.sub4subnow.com/campaign.subOrView";
require("vqh.php");
$data = "$data";
$hk = curl_init();
curl_setopt_array($hk, array(
	CURLOPT_PORT => "443",
	CURLOPT_URL => "$url",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_SSL_VERIFYPEER => false,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_CUSTOMREQUEST => "POST",
	CURLOPT_POSTFIELDS => $data,
	
));



$hack = curl_exec($hk);
curl_close($hk);
$js = json_decode($hack,true);
echo "Coin: ".$js["point"]." | Success: ".$js["success"]."\n";
sleep(0);
}