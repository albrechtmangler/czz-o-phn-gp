<?php 

    if(isset($_REQUEST['gameSucceeded'])) {
        header("location:share.php");
    } else {

?>

<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">
        <title>Weihnachtstab Boy Nobody</title>
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
	<body class="game">
            <div class="wrapper">
                <div class="header">
                    <h1 class="heading">BOY NOBODY</h1>
                    <h1 class="subhead">ICH BIN DEIN FREUND. ICH BIN DEIN MÖRDER</h1>

                </div>
                <div class="subHeader">
                    <h2 class="gewinnspiel">Decke die gleichen Bilder nacheinander auf. Mit etwas Glück kannst du eines von 20 Exemplaren »Boy Nobody« gewinnen.</h2>
                </div>
                <div class="content game">
                    <?php include 'games/memo.php'; ?>
                    
                </div>
            <a href="start.php" class="backBtn button">Zurück</a>
            </div>
            <form class="appNavigator" method="post" action="<?php echo $_SERVER['PHP_SELF'] ;?>" style="position: absolute">
                <input type="hidden" name="gameSucceeded" value="yes" />
            </form>
	</body>
</html>

<?php } ?>