const boards = [
  {
    name: 'Name',
    score: 100,
  },
  {
    name: 'Name',
    score: 340,
  },
  {
    name: 'Name',
    score: 60,
  },
  {
    name: 'Name',
    score: 80,
  },
  {
    name: 'Name',
    score: 10,
  },
];

boards.forEach((board) => {
  document.querySelector('.score-spans').innerHTML += `
        <div class="each-score">
                        <span>${board.name} :</span><span>${board.score}</span>
    
                    </div>
        
        
        `;
});

localStorage.setItem('Names and scores', JSON.stringify(boards));