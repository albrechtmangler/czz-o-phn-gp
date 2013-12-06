<div style="
position: fixed;
top: 10px;
left: 830px;
background: rgba(0,0,0,0.4);
color: #fff;
text-shadow: 0px 0px 5px #000;
font-weight: bolder;
font-size: 12px;
font-family: courier, sans-serif;
padding: 10px 20px;
z-index: 1000;
border-radius: 5px;
border: 1px solid #999;
box-shadow: 0px 0px 10px #000;
">

<p>### DEBUG ###</p><br />
<?php

echo 'games list:';
echo '<ul>';
foreach ($gamesArray as $key=>$value) {
	echo "<li>".$key." - ".$value."</li>";
}
echo '</ul>';

echo '<p>games total : '.count($gamesArray).'</p>';

if (isset($_REQUEST['appIndex']) &&  $_REQUEST['appIndex'] >= 0) {
	echo '<p>current game: '.$gamesArray[$_REQUEST['appIndex']].'</p><br />';
}

if (count($_REQUEST) > 0) {
	echo "current parameters:";
	echo "<ul>";
	foreach ($_REQUEST as $key => $value) {
		echo "<li>".$key.": ".$value."</li>";
	}
	echo "</ul>";
} else {
	echo "no parameters<br />";
}

if (count($_SESSION) > 0) {
      echo "current session variables<br />";
      echo "<ul>";
      foreach ($_SESSION as $key => $value) {
              echo "<li>".$key.": ".$value."</li>";
      }
      echo "</ul>";
} else {
      echo "no session variables<br />";
  }

?>

<form class="clearSession" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
	<button name="clearSession" value="true">clear session and start from index</button>
</form>
<hr />

<form class="clearSession" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
            <button name="gameResult" value="win">WIN this game</button>
            <button name="gameResult" value="lose">LOSE this game</button>
</form>
<hr />

<strong>Jump to...</strong>
<form class="switchGame" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
    <select name="appIndex">
<?php 
foreach ($gamesArray as $key=>$value) {
    if($_SESSION['appIndex'] == $key) {
        $selected = "selected='selected'";
    } else {
        $selected = "";
    }
	echo "<option " . $selected . " value='" . $key . "'>" . $value . "</option>";
}
?>
    </select> and 
    <button type="submit">play!</button>
</form>
</div>