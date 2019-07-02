String.prototype.replaceAt=function(index, l, character){
	return this.substr(0, index) + character + this.substr(index+l);
};

function getRandomArbitrary(min, max){
	return Math.floor(Math.random() * (max-min) + min);
}


String.prototype.replaceAllWithRand = function(keyword, wordList){
	var str = this;

	while(str.search(keyword)!=-1){
		str = str.replaceAt(str.indexOf(keyword), keyword.length, wordList[getRandomArbitrary(0, wordList.length)]);
	}

	return str;
};

var wordBoxes = document.getElementById('wordBoxes');
var rowNum = 0;
var cellNum = 0;
//var currentRow = wordBoxes.insertRow(rowNum);
//var currentCell = currentRow.insertCell(cellNum%3);
var currentRow;
var currentCell;

var wordTypeList = [];
var wordDict = {};

var wordType = function(keyword, title){
	this.title = title;
	this.keyword = keyword;
	this.edited = true;

	if(cellNum%3 == 0){
		//add Row and set current row
		currentRow = wordBoxes.insertRow(rowNum);
		rowNum++;
	}


	currentCell = currentRow.insertCell(cellNum%3);
	currentRow.class = 'wordBox';

	cellNum++;
	currentCell.innerHTML = "<center><h2 style='margin-bottom: 0px;'>" + this.title + "</h2></center>" + "<textarea type='text' rows='10' id='" + this.title + "'>" + "</textarea>" + "<center><p style='margin: 0px'>keyword="+this.keyword+"</p></center>";
	wordTypeList.push(this);
	wordDict[this.keyword] = this;
}

wordType.prototype.getWords = function(){
	var temp = document.getElementById(this.title).value;
	
	var wordArr = [];
	var wordTemp = '';

	for(let i=0; i<=temp.length; i++){
		if(/*temp.charAt(i) == ' ' ||*/ temp.charAt(i) == '\n'){
			wordArr.push(wordTemp);
			wordTemp = '';
		} else{
			wordTemp += temp.charAt(i);
		}
	}
	wordArr.push(wordTemp);

	return wordArr;
}

var nouns = new wordType('noun', "Nouns");
var verbs = new wordType('verb', 'Verbs');
var adjectives = new wordType('adj', "Adjectives");

var finalSentence = document.getElementById('finalSentence');

document.getElementById('enterSentence').addEventListener('click', function(){
	var sentence = document.getElementById('sentence').value;
	var wordTemp = '';


	for(let i=0; i<wordTypeList.length; i++){
		sentence = sentence.replaceAllWithRand(wordTypeList[i].keyword, wordTypeList[i].getWords());
	}

	finalSentence.innerHTML = sentence;
});

document.getElementById('newWord').addEventListener('click', function(){
	wordTypeList.push(new wordType(document.getElementById('keyword').value, document.getElementById('title').value));
});