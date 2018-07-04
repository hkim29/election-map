//Assign candidate names and party color
var createPolitician = function(personName, partyColor)
{
  var politician = {};

  politician.name = personName;

  politician.electionResults = null;

  politician.totalVotes = 0; 

  politician.partyColor = partyColor;
  
  politician.tallyUpTotalVotes = function(){
    this.totalVotes = 0;
  
    for (var i = 0; i < this.electionResults.length; i++){
       this.totalVotes = this.totalVotes + this.electionResults[i];  
    }
  }
  
  politician.announcePolitician = function(){
  console.log(this.name + " got " + this.totalVotes + " total votes!");
  }
  
  
  return politician;
  
};

var person1 = createPolitician("Jenny Kim",[35,72,255]);
var person2 = createPolitician("Jared Amato",[255,193,234]);

//election results by state
person1.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

person2.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

//changing some state results that were initially misreported
person1.electionResults[9] = 1;
person2.electionResults[9] = 28;

person1.electionResults[4] = 17;
person2.electionResults[4] = 38;

person1.electionResults[43] = 11;
person2.electionResults[43] = 27;

//state results
var setStateResults = function(state){

  theStates[state].winner = null;
    
  if (person1.electionResults[state] > person2.electionResults[state]) {
    theStates[state].winner = person1;
  } else if (person1.electionResults[state] < person2.electionResults[state]) {
    theStates[state].winner = person2;  
  }  
    
  //Put state results in the table
  var bottomTable = document.getElementById('stateResults');
  var header = bottomTable.children[0];
  var body = bottomTable.children[1];

  var stateName = header.children[0].children[0];
  var stateAbbrev = header.children[0].children[1];
  var candidateName1 = body.children[0].children[0];
  var candidateName2 = body.children[1].children[0];
  var candidateResults1 = body.children[0].children[1];
  var candidateResults2 = body.children[1].children[1];
  var stateWinnerName = body.children[2].children[1];  

  stateName.innerText = theStates[state].nameFull;
  stateAbbrev.innerText = "(" + theStates[state].nameAbbrev + ")";

  candidateName1.innerText = person1.name;
  candidateName2.innerText = person2.name;

  candidateResults1.innerText = person1.electionResults[state];
  candidateResults2.innerText = person2.electionResults[state];

  var stateWinner = theStates[state].winner;

  if (stateWinner === null) {
    stateWinnerName.innerText = "DRAW";
  } else {
    stateWinnerName.innerText = stateWinner.name;
  }

  //set state with winner's color
  if(stateWinner !== null) {
      theStates[state].rgbColor = stateWinner.partyColor;
    } else { 
      theStates[state].rgbColor = [239, 107, 200];
    } 
};


person1.tallyUpTotalVotes();
person2.tallyUpTotalVotes();

/* comment out console
console.log(person1.totalVotes);
console.log(person2.totalVotes);
*/

person1.announcePolitician();
person2.announcePolitician();


//winner name for top table
var winnerName = "?";

if (person1.totalVotes > person2.totalVotes ) {
  winnerName = person1.name;
} else if (person1.totalVotes < person2.totalVotes) {
  winnerName = person2.name;
} else {
  winnerName = "DRAW";
};

/* comment out console
console.log("The winner is " + winnerName);

console.log( person1.name + "'s color is " + person1.partyColor);
console.log( person2.name + "'s color is " + person2.partyColor);
*/

//top country results table
var topTable = document.getElementById('countryResults');

topTable.children[0].children[0].children[0].innerText = person1.name;
topTable.children[0].children[0].children[1].innerText = person1.totalVotes;
topTable.children[0].children[0].children[2].innerText = person2.name;
topTable.children[0].children[0].children[3].innerText = person2.totalVotes;
topTable.children[0].children[0].children[5].innerText = winnerName;



