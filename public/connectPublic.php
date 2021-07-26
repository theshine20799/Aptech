<?php
	$serverName = "localhost\\SQLEXPRESS01"; //serverName\instanceName
	$connectionInfo = array( "Database"=>"ImportExcel", "UID"=>"sa", "PWD"=>"huuthang20799","ConnectionPooling"=>0,"CharacterSet"=>"UTF-8");
	$conn = sqlsrv_connect( $serverName, $connectionInfo);

	if( $conn ) {
    	echo "...";
	}else{
    	echo "Connection could not be established.<br />";
    	die( print_r( sqlsrv_errors(), true));
	}	
	
	require('Classes/PHPExcel.php');

	if(isset($_POST['btnSend'])){
		$file = $_FILES['file']['tmp_name'];

		$objReader= PHPExcel_IOFactory::createReaderForFile($file);
		$objReader->setLoadSheetsOnly('sd');

		$objExcel= $objReader->load($file);
		$sheetData= $objExcel->getActiveSheet()->toArray('null',true,true,true);
		//kiem tra dong lon nhat
		$rowMax=$objExcel->setActiveSheetIndex()->getHighestRow();
		for($row=9;$row<=16;$row++){
			$RollNumber= $sheetData[$row]['B'];
			$PortalID= $sheetData[$row]['C'];
			$HoTen= $sheetData[$row]['D'];
			$T1= $sheetData[$row]['E'];
			$T2= $sheetData[$row]['F'];
			$T3= $sheetData[$row]['G'];
			$T4= $sheetData[$row]['H'];
			$T5= $sheetData[$row]['I'];
			$T6= $sheetData[$row]['J'];
			$Remarks= $sheetData[$row]['K'];
			$TotalPresent= 'X';

			$ArrayCourse= explode(':',$sheetData[4]['A']);
			$Course=$ArrayCourse[1].' | '.$ArrayCourse[2];

			$ArrayCurriculum= explode(':', $sheetData[6]['A']);
			$Curriculum=$ArrayCurriculum[1];

			$ArrayBatch= explode(':', $sheetData[2]['A']);
			$Batch=$ArrayBatch[1];

			$ArrayCenterName= explode(':', $sheetData[1]['A']);
			$CenterName=$ArrayCenterName[1];

			$ArrayTime= explode(':', $sheetData[3]['A']);
			$Time=$ArrayTime[1].$ArrayTime[2].$ArrayTime[3];

			$ArrayStartDate= explode(':', $sheetData[5]['A']);
			$StartDate=$ArrayStartDate[1];

			$sqlString="INSERT INTO attend(			
				RollNumber,PortalID,HoTen,T1,T2,T3,T4,T5,T6,Remarks,TotalPresent,Course,Curriculum,Batch,
					CenterName,FrameTime,StartDate) 
							VALUES ('$RollNumber','$PortalID','$HoTen','$T1','$T2','$T3','$T4','$T5','$T6',
									'$Remarks','$TotalPresent','$Course','$Curriculum','$Batch',
									'$CenterName','$Time','$StartDate') ";

			$params = array();
    		$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    		$stmt = sqlsrv_query( $conn, $sqlString , $params, $options );
			
		}
		print_r($sheetData);
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Insert table from Excel</title>
</head>
<body>
	<form method="POST"  enctype="multipart/form-data">
		<input type="file" name="file">
		<br>
		<button type="submit" name="btnSend">Import File</button>
	</form>
    
</body>
</html>