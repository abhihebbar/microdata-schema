<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
	class MicrodataContentBlockController extends BlockController {
		
		protected $btTable = 'btMicrodataContent';
		protected $btWrapperClass = 'ccm-ui';
		protected $btInterfaceWidth = "600";
		protected $btInterfaceHeight = "465";
		protected $btCacheBlockRecord = true;
		protected $btCacheBlockOutput = true;
		protected $btCacheBlockOutputOnPost = true;
		protected $btCacheBlockOutputForRegisteredUsers = true;
		protected $btCacheBlockOutputLifetime = CACHE_LIFETIME;
		
		public function getBlockTypeDescription() {
			return t("HTML/WYSIWYG Editor along with Microdata support.");
		}
		
		public function getBlockTypeName() {
			return t("Microdata Content");
		}

		public function getMDSchema(){
			return file_get_contents(DIR_FILES_UPLOADED_STANDARD . '/schema.json');
		}

		public function getTypes(){
			$sch = json_decode($this->getMDSchema(),true);
			$types = $sch['types'];
			$retval = array('-- Select --');
			foreach ($types as $name => $type) {
				$retval[$name] = $type['label'];
			}
			return $retval;
		}
	}
	
?>
