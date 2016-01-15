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
  module STAGES
    CHAMPIONSHIP = 'Сhampionship'
    PLAY_OFF_1x16 = '1x16'
    PLAY_OFF_1x8 = '1x8'
    PLAY_OFF_1x4 = '1x4'
    PLAY_OFF_1x2 = '1x2'
    PLAY_OFF_FOR_3_PLACE = 'For 3 place'
    PLAY_OFF_FINAL = 'Final'
  end

  module STATUSES
    NOT_STARTED = 'Not started'
    STARTED = 'Started'
    FINISHED = 'Finished'
  end
end
