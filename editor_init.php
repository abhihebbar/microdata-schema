<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>

<?php  
global $c;
$th = $c->getCollectionThemeObject(); 
?>
<?php  $this->inc('editor_config.php', array('theme' => $th)); ?> 
<?php  Loader::element('editor_controls'); ?>