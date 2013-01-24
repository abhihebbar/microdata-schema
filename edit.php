<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$form = Loader::helper('form');
?>
<script type="text/javascript">
	window.mdSchema = <?php echo $controller->getMDSchema(); ?>
</script>
<div class="clearfix">
	<label>Item Type</label>
	<div class="input">
		<?php echo $form->select('type',$controller->getTypes(),$type); ?><br /><br />
	</div>
</div>
<a href="#" title="Update Microdata" class="btn primary" onclick="updateMD();return false;">Update Microdata</a>
<a href="#" title="Remove Microdata" class="btn danger" onclick="removeMD();return false;">Remove Microdata</a><br /><br />

<?php
$this->inc('editor_init.php');
echo $form
	->textarea('content', $content, array('class'=>'ccm-advanced-editor'));
	?>

<div id="md-edit" style="display:none;">
	<div class="ccm-ui">
		<div class="clearfix" style="margin-bottom:18px;">
			<label>Type (Cannot edit)</label>
			<div class="input" style="margin-left:150px;">
				<input type="text" name="md-type" value="" disabled id="md-type">
			</div>
		</div>
		<div class="clearfix" style="margin-bottom:18px;">
			<label>Property</label>
			<div class="input" style="margin-left:150px;">
				<select name="property" id="md-property">
					<option value="0">-- Select --</option>
				</select>
			</div>
		</div>
		<div class="clearfix" style="margin-bottom:18px;">
			<label>Value</label>
			<div class="input" style="margin-left:150px;">
				<input type="text" name="md-value" placeholder="Value" id="md-value">
			</div>
		</div>
		<div style="position:absolute;bottom:10px;right:10px;">
			<a href="#" title="Cancel" class="btn cancel">Cancel</a>
			<a href="#" title="Save" class="btn primary save">Save</a>&nbsp;&nbsp;
		</div>
	</div>
	
</div>