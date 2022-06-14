class Store {
  constructor(user, score) {
    this.user = user;
    this.score = score;
  }
}
document.getElementById('submit-button').addEventListener('click', async (e) => {
  e.preventDefault();
  const uservalue = document.getElementById('userinput').value;
  const scorevalue = document.getElementById('score-input').value;

  document.getElementById('score-input').value = ' ';
  document.getElementById('userinput').value = ' ';

  const newScore = new Store(uservalue, scorevalue);

  const content = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BTEFhiuCoituyoiM55uY/scores/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newScore),
    },

  );
  const afterContent = await content.json();
  console.log(afterContent);
});

document.getElementById('refresh').addEventListener('click', async (e) => {
  e.preventDefault();
  document.querySelector('.score-spans').innerHTML = '';

  const request = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BTEFhiuCoituyoiM55uY/scores/',
  );

  const data = await request.json();
  const getContent = async (data) => {
    (data.result).forEach((board) => {
      document.querySelector('.score-spans').innerHTML += `
          <div class="each-score">
                          <span>${board.user} :</span><span>${board.score}</span>
      
                      </div>
          
          
          `;
    });
  };
  getContent(data);
});
