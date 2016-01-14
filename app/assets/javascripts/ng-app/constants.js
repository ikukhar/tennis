(function() {
  'use strict';

  function TOURNAMENT() {
    return {
      MODES: {
        SINGLES: 'Singles',
        DOUBLES: 'Doubles'
      },
      STATUSES: {
        NOT_STARTED: "Not started",
        STARTED: "Started",
        FINISHED: "Finished"
      }
    }
  };

  function ROUND() {
    return {
      MODES: {
        CHAMPIONSHIP: 'Сhampionship',
        PLAY_OFF: 'Play off'
      },
      STAGES: {
        S_1x16: {
          value: '1x16',
          games: 16
        },
        S_1x8: {
          value: '1x8',
          games: 8
        },
        S_1x4: {
          value: '1x4',
          games: 4
        },
        S_1x2: {
          value: '1x2',
          games: 2
        },
        S_FOR_3_PLACE: {
          value: 'For 3 place',
          games: 1
        },
        S_FINAL: {
          value: 'Final',
          games: 1
        }
      }
    }
  };

  angular.module('app').constant('TOURNAMENT', TOURNAMENT());
  angular.module('app').constant('ROUND', ROUND());
})();
