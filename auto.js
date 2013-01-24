MicroDataSchema = function(node){
	this.node = node;

	this.value     = function(){}
	this.name      = function(){}
	this.type      = function(){}
	this.hirearchy = function(){}

	this.compute = function(){
		var scope = $(node).closest('.md-item');
	}

	this.compute();
}

function updateMD(){
	var type = $('select#type').val(),
		selection = tinyMCE.activeEditor.selection,
		node = $(selection.getNode());

	if(!node.hasClass('md-prop'))
		node = node.closest('.md-prop');

	if(type == 0){
		alert('Please select a type.');
		return;
	}
	var clone = $('#md-edit').clone().show(),
		propSel = clone.find('#md-property'),
		valIp = clone.find('#md-value');


	propSel.empty().append('<option value="0">-- Select --</option>');

	for(var i in mdSchema.types[type].properties)
		propSel.append('<option>' + mdSchema.types[type].properties[i] + '</option>');

	console.log(node[0]);

	if(node.length > 0){
		console.log(node.text());
		propSel.val(node.attr('itemprop'));
		valIp.val(node.text());
		selection.select(node[0]);
	}

	$.fn.dialog.open({
		element:clone,
		title: 'Update Meta Data',
		width: 400,
		height: 150
	})
}

function removeMD(){
	var selection = tinyMCE.activeEditor.selection;
	var node = $(selection.getNode()).closest('.md-prop');
	if(node.length > 0 && confirm('Are you sure you want to delete Micro Data information for ' + node.attr('title'))){
		node.removeAttr('itemprop').removeAttr('itemscope').removeAttr('itemtype').removeClass('md-prop md-item');
		node.find('*').removeAttr('itemprop').removeAttr('itemscope').removeAttr('itemtype').removeClass('md-prop md-item');
	}
}

MicroDataSchema.format = function(doc,parentTypes){
	if(typeof parentTypes != 'object' || ! (parentTypes instanceof Array))
		parentTypes = [];

	$.each(doc.children,function(i,el){
		if($(el).attr('itemscope')!=undefined){
			$(el).addClass('md-item');
			parentTypes[parentTypes.length] = $(el).attr('itemtype').replace(/http:\/\/schema\.org\//,'');
			el.title = parentTypes.join(' > ');
		}
		if($(el).attr('itemprop')){
			$(el).addClass('md-prop');
			if($(el).attr('itemscope')!=undefined){
				parentTypes[parentTypes.length - 1] = $(el).attr('itemprop');
				el.title = parentTypes.join(' > ');
			}else{
				el.title = parentTypes.join(' > ') + ' > ' + $(el).attr('itemprop');
			}
		}
		MicroDataSchema.format(el,parentTypes);
	});
}

