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
		tmSel = tinyMCE.activeEditor.selection,
		node = $(tmSel.getNode());


	if(node.closest('.md-item').length > 0)
		type = node.closest('.md-item').attr('itemtype').replace(/http:\/\/schema\.org\//,'');

	if(!node.hasClass('md-prop'))
		node = node.closest('.md-prop');

	if(type == 0){
		alert('Please select a type.');
		return;
	}
	var clone = $('#md-edit').clone().show(),
		propSel = clone.find('#md-property'),
		valIp = clone.find('#md-value'),
		typeIp = clone.find('#md-type');

	typeIp.val(type);

	propSel.empty().append('<option value="0">-- Select --</option>');

	for(var i in mdSchema.types[type].properties)
		propSel.append('<option>' + mdSchema.types[type].properties[i] + '</option>');

	if(node.length > 0 && ! node.hasClass('md-item')){
		propSel.val(node.attr('itemprop'));
		valIp.val(node.text());
		tmSel.select(node[0]);
	}else{
		valIp.val($("<span>"+tmSel.getContent()+"</span>").text());
	}
	var bm = tmSel.getBookmark();
	clone.find('.cancel').click(function(e){
		$(this).closest('.ui-dialog-content').dialog('close');
		return false;
	})

	clone.find('.save').click(function(e){
		var prop = propSel.val(),
			propVal = valIp.val();
		var cont = $('<span>',{
			'text' :propVal,
			'itemprop':prop
		})
		if(mdSchema.properties[prop]){
			var propDesc = mdSchema.properties[prop];
			if(propDesc.domains.indexOf(type) >= 0){
				cont = $('<section>',{
					'itemscope': true,
					'itemtype' : propDesc.ranges[0],
					'itemprop' : prop,
					'text':propVal
				});
			}
		}

		tinyMCE.activeEditor.focus();
		tinyMCE.activeEditor.selection.moveToBookmark(bm);
		tinyMCE.activeEditor.selection.setContent(cont[0].outerHTML);
		MicroDataSchema.format(tinyMCE.activeEditor.getDoc().body);
		$(this).closest('.ui-dialog-content').dialog('close');
		return false;
	});

	$.fn.dialog.open({
		element:clone,
		title: 'Update Meta Data',
		width: 400,
		height: 150,
		modal: false
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

$('select#type').change(function(){
	if($(this).val() != 0){
		tinyMCE.activeEditor.setContent('<section class="md-item" itemscope itemtype="'+$(this).val()+'">Enter contents for '+$(this).val()+'</section>')
	}
})