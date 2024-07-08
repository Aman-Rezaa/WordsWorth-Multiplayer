


  
  function viewLeaderboard() {
    const gameId = getGameIdFromUrl();
    window.location.href = `/leaderboard.html?gameId=${gameId}`;
  }
  function getGameIdFromUrl() {
    const url = window.location.href;
    console.log(url);
    const gameId = url.substring(url.lastIndexOf('=')+1 , url.lastIndexOf('/'));
    return gameId;
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    let raju = window.location.href;
    const appear = raju.substring(raju.lastIndexOf('/')+1);
  document.getElementById('word').textContent = `THE WORD WAS: ${appear}`;
      
  });