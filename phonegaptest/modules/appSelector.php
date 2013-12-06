<?php
// starts session for the first time
session_start();

// includes settings file
include "config.php";

// clear everything and redirect to index: relates to debugger action and eventual "restart" action for the user
if(isset($_POST['clearSession']) && $_POST['clearSession'] == true) {
	session_destroy();
	header('location: index.php');
}

// puts into session everything is in request
foreach ($_REQUEST as $key=>$value) {
    global $keyVariables;
    foreach($keyVariables as $keyVariable) {
        if($key == $keyVariable || $key == "gameResult") {
            $_SESSION[$key] = $value;
        }
    }
                
}



/* Function to manage current page loading */
function currentPage() {
	global $gamesArray;
        // just load the game (no completion, just load the game)
	if (isset($_SESSION['appIndex']) && !isset($_SESSION['gameResult'])) {
			echo '<div class="game">';
			include 'games/'.$gamesArray[$_SESSION['appIndex']].'.php';
			echo '</div>';
		} 
        /* if you just completed (successfully or not) a game,
         * load the related win / loose module
         */
	else if (isset($_SESSION['appIndex']) == true && isset($_SESSION['gameResult']) == true) {
			include 'modules/' . $_SESSION['gameResult'].'.php';
		} 
}

?>