<?php

include "modules/appSelector.php";	

?>

<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">
        <title>Weihnachtstab title</title>
        <meta name="description" content="description text" />
        <link rel="image_src" href="">
        <meta property="og:image" content=""/>
        <meta property="og:image:secure_url" content="">
        <meta property="og:image:type" content="image/jpg">
        <meta property="og:image:width" content="200">
        <meta property="og:image:height" content="200">
        <meta property="og:title" content="og title"/>
        <meta property="og:description" content="og description text" />
        <meta property="og:url" content=""/>
        <link rel="stylesheet" href="css/frameset.css">
        <script type="text/javascript" src="js/Libraries/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="js/Libraries/jquery-ui-1.10.3.min.js"></script>
        </head>	
	<body>

	<?php include 'modules/debug.php'; ?>
		</div>
	
		<div class="wrapper">
                    <div class="header">
                        <h1>Weihnachtstab title</h1>
                    </div>
                    <div class="content">
                        
                        <div class="mainpage_content" id="mainpage_content">
                            <h2>Aufklappen und gewinnen!</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor sem ut mi aliquam eleifend. Nullam a convallis lorem, placerat.</p>
                            <?php 
                                $_SESSION['appIndex'] = 0;
                                currentPage();
                            ?>
                            <div class="bookContainer">
                                <img class="bookCover" width="100" height="140" src="" />
                                <div class="bookDetails">
                                    <p class="bookAuthor">Author Name</p>
                                    <h3 class="bookTitle">Book Title</h3>
                                    <p class="bookAbstract">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod ipsum a tellus hendrerit tempus. Cras luctus hendrerit condimentum. Cras suscipit nibh sed risus faucibus mollis eu eu sapien. Phasellus congue ut sem nec consectetur. Mauris quam leo, viverra non egestas at, pharetra et est. Nullam ut auctor risus.</p>
                                    <p class="bookPrice">12,95&eur;<p>
                                    <a class="buyBookAction" href="#" target="_blank">Kaufen</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
		</div>
	</body>
</html>