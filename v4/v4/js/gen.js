function generator () {
	// document.write('<div class="gameover">Wasted</div>');
	for (i=0; i<20; i++) {
		for (j=0;j<7;j++) {
			document.write('<div class="field__wrapper"><div class="field"></div></div>');
		};
	};
}

function colorist () {
	$('.field').each(function () {
		colorChanger($(this));
	});
};

var counter = 10;
var colors = [ '#cccccc',
	'#ffff00',
	'#ffffff',
	'#ffab40',
	'#e51c23',
	'#ff5177',
	'#b2ff59',
	'#3f51b5',
	'#e040fb',
	'#000000'
]

function randomize () {
	return Math.floor(Math.random()*(10))
}
function colorChanger (fieldChoosed) {
	$(fieldChoosed).css({ "background-color": colors[randomize()]})
}


function clickCounter () {
	$('.field').click(function(){ 
		counter--;
		colorChanger($(this));
		search();
	});
}

function search () {
	var fieldQuantity = $('.field').length;
	if (fieldQuantity>42) {
		figures(42);
		console.log(fieldQuantity);
	} else if (fieldQuantity<7) {
		$('.field').each(function () {
			$(this).remove();
		});
	} else {
		lastRowLenght=(fieldQuantity+1)%7;
		rows=(fieldQuantity+1-lastRowLenght)/7;
		lastChecked=(rows-1)*7+lastRowLenght;
		figures(lastChecked-1);
	}
	gameover();	
	count();
}
function figures (border) {
	for (i=0;i<border;i++) {
		var source = $('.field').eq(i).css('background-color');
		var sourcePlusOne = $('.field').eq(i+1).css('background-color');
		var sourcePlusSeven = $('.field').eq(i+7).css('background-color');
		var sourcePlusSix = $('.field').eq(i+6).css('background-color');
		var sourcePlusEight = $('.field').eq(i+8).css('background-color');
		var hP = (i+1)%7;
		if ( source == sourcePlusOne && source == sourcePlusSeven && hP){
			$('.field').eq(i).addClass('marked');
			$('.field').eq(i+1).addClass('marked');
			$('.field').eq(i+7).addClass('marked');
			del();
			/*
			[s][1]
			[7]
			*/
		} else if ( source == sourcePlusOne && source == sourcePlusEight && hP){
			$('.field').eq(i).addClass('marked');
			$('.field').eq(i+1).addClass('marked');
			$('.field').eq(i+8).addClass('marked');
			del();
			/*
			[s][1]
			   [8]
			*/
		} else if ( source == sourcePlusSeven && source == sourcePlusEight && hP){
			$('.field').eq(i).addClass('marked');
			$('.field').eq(i+7).addClass('marked');
			$('.field').eq(i+8).addClass('marked');
			del();
			/*
			[s]
			[7][8]
			*/
		} else if ( source == sourcePlusSeven && source == sourcePlusSix && hP!=1){
			$('.field').eq(i).addClass('marked');
			$('.field').eq(i+7).addClass('marked');
			$('.field').eq(i+6).addClass('marked');
			del();
			/*
			[s]
		 [6][7]
			*/
		}
	}
}
function del() {
	$('.marked').parent().remove();
	counter+=4;
}
function count(){
	$('.score').html(''+counter+'');
}
function gameover() {
	if (counter) {
		$('.gameover').hide();
	} else {
		$('.gameover').show();
	}
}
