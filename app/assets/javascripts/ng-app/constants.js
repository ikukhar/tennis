(function() {
  'use strict';

  function CONSTANTS() {
    return {
      TOURNAMENT: {
        TEAMS_TYPES: {
          SINGLES: 'Singles',
          DOUBLES: 'Doubles'
        },
        ROUNDS_TYPES: {
          CHAMPIONSHIP: 'Сhampionship',
          PLAY_OFF: 'Play off',
          CHAMPIONSHIP_AND_PLAYOFF: 'Сhampionship & Play off'
        },
        STATUSES: {
          UPCOMING: 'Upcoming',
          STARTED: "Started",
          FINISHED: "Finished"
        }
      },
      ROUND: {
        STATUSES: {
          UPCOMING: 'Upcoming',
          STARTED: "Started",
          FINISHED: "Finished"
        },
        STAGES: {
          CHAMPIONSHIP: {
            value: 'Сhampionship'
          },
          PLAY_OFF_1x16: {
            value: '1x16',
            games: 16
          },
          PLAY_OFF_1x8: {
            value: '1x8',
            games: 8
          },
          PLAY_OFF_1x4: {
            value: '1x4',
            games: 4
          },
          PLAY_OFF_1x2: {
            value: '1x2',
            games: 2
          },
          PLAY_OFF_FOR_3_PLACE: {
            value: 'For 3 place',
            games: 1
          },
          PLAY_OFF_FINAL: {
            value: 'Final',
            games: 1
          }
        }
      },
      GAME: {
        STATUSES: {
          UPCOMING: 'Upcoming',
          FINISHED: 'Finished',
        }
      }
    }
  };


  angular.module('app').constant('CONSTANTS', CONSTANTS());
})();
