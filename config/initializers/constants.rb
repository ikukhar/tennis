module TOURNAMENT
  module TEAMS_TYPES
    SINGLES = 'Singles'
    DOUBLES = 'Doubles'
  end

  module ROUNDS_TYPES
    CHAMPIONSHIP = 'Сhampionship'
    PLAY_OFF = 'Play off'
    CHAMPIONSHIP_AND_PLAYOFF = 'Сhampionship & Play off'
  end

  module STATUSES
    NOT_STARTED = 'Not started'
    STARTED = 'Started'
    FINISHED = 'Finished'
  end
end

module ROUND
  STAGES = {
    CHAMPIONSHIP:         { value: 'Сhampionship',          win_coeff: 1, lose_coeff: 0 },
    PLAY_OFF_1x16:        { value: '1x16',        games: 16,win_coeff: 2, lose_coeff: 0 },
    PLAY_OFF_1x8:         { value: '1x8',         games: 8, win_coeff: 4, lose_coeff: 0 },
    PLAY_OFF_1x4:         { value: '1x4',         games: 4, win_coeff: 6, lose_coeff: 0 },
    PLAY_OFF_1x2:         { value: '1x2',         games: 2, win_coeff: 10,lose_coeff: 0 },
    PLAY_OFF_FOR_3_PLACE: { value: 'For 3 place', games: 1, win_coeff: 15,lose_coeff: 10 },
    PLAY_OFF_FINAL:       { value: 'Final',       games: 1, win_coeff: 30,lose_coeff: 15 }
  }

  module STATUSES
    NOT_STARTED = 'Not started'
    STARTED = 'Started'
    FINISHED = 'Finished'
  end
end
