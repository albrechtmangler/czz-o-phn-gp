        <script type="text/javascript" src="js/plugins.js"></script>
        <script type="text/javascript" src="js/game_controllers/memo.js"></script>
        <link type="text/css" rel="stylesheet" media="all" href="css/memo.css" />
        <script type="text/javascript">
        var options = { 
        		id : 'legion-widget',
    			vert: 4,
    			hor: 4, 
        		mode : "", 
				gutschein: "",
    			logo: "",
    			facebook : { picture: ""},
				serverurl: "$base.url$/aj/memory.ashx",		
        		pics : [
        			{img: "images/memo/01.png", link: ""},
        			{img: "images/memo/02.png", link: ""},
        			{img: "images/memo/03.png", link: ""},
        			{img: "images/memo/04.png", link: ""},
        			{img: "images/memo/05.png", link: ""},
        			{img: "images/memo/06.png", link: ""},
        			{img: "images/memo/07.png", link: ""},
        			{img: "images/memo/08.png", link: ""}],
        		header_text : "",
        		buttons_menu : [{label: "Spiel starten", action: "startGame()"}],
        		startmenu_text: "",
        };
        </script>
	    <div id="bdmemorygame">
            <div class="memory_text">
            </div>
	        <div class="memorycards">
	        </div>
            <div class="menu">
            </div>
            <form class="gameResultForm" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
                <input type="hidden" id="gameResult" name="gameResult" value="" />
                <input type="hidden" name="appIndex" value="<?php echo $_SESSION['appIndex']; ?>" />
            </form>
	    </div>