$(document).on("click", ".player-name", function () {
      var arrestYear = $(this).attr("data-arrest-year");
      var teamID = $(this).attr("data-team-ID");
      var playerName = $(this).text();
      console.log(arrestYear, teamID);
      // console.log(playerName);
      $.ajax({
          // url: "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl-ot1/players/9634e162-5ff5-4372-b72b-ee1b0cb73a0d/profile.json?api_key=hgzawgjxk849m49bx87ddwu6",
          url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl-ot1/seasontd/${arrestYear}/REG/teams/${teamID}/statistics.json?api_key=hgzawgjxk849m49bx87ddwu6`,
          method: "GET",

        })
        .then(function (response) {
          console.log(response,"This is where the stats are")
          var playerID;
          let playerStat;
          for (var i = 0; i < response.players.length; i++) {;
            if (response.players[i].name == playerName) {
              console.log(playerName);
              console.log(response.players[i].defense);
              playerID = response.players[i].id;
              $.ajax({
                  url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl-ot1/players/${playerID}/profile.json?api_key=hgzawgjxk849m49bx87ddwu6`,
                  method: "GET"
                })
                .then(function (player) {
                  renderStats(player);
                })
              return;
            }
          }
          playerID = response.players[0].id;
          $.ajax({
              url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl-ot1/players/${playerID}/profile.json?api_key=hgzawgjxk849m49bx87ddwu6`,
              method: "GET"
            })
            .then(function (player) {
              console.log(player,"2");
              renderStats(player);
            })
          return;

          //-------------------------
           


        })
    })