class Game < ActiveRecord::Base
  belongs_to :tournament
  belongs_to :round
  belongs_to :team1, class_name: 'Team'
  belongs_to :team2, class_name: 'Team'
  belongs_to :winner, class_name: 'Team'
  belongs_to :loser, class_name: 'Team'

  serialize :score, JSON

  validates_presence_of :tournament, :round, :score
  validates_inclusion_of :finished, in: [true, false]

  after_update do
    transaction do

      all_games_finished = !Game.exists?(finished: false, round: round)
      round.update_attributes(finished: all_games_finished) if round.finished != all_games_finished

      if round.next_round
        if round.name == ROUND::STAGES[:CHAMPIONSHIP][:value]
          self.class.set_teams_for_games(round.next_round) if all_games_finished
        else round.name != ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:value]

          if round.next_round.name == ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:value]
            self.class.set_game_for_team(round.next_round, loser)
            self.class.set_game_for_team(round.next_round.next_round, winner) if round.next_round.next_round
          else
            self.class.set_game_for_team(round.next_round, winner)
          end

        end
      end

      if round.name == ROUND::STAGES[:PLAY_OFF_FINAL][:value]
        if tournament.finished != all_games_finished
          tournament.update_attributes(finished: all_games_finished)
          tournament.update_attributes(winner: winner)
        end
        Tournament.calculate_players_rating! if tournament.finished
      end

    end
  end

  def self.create_games(round)
    1.upto(count_games(round)) do |_i|
      create!(
        tournament: round.tournament,
        round: round,
        score: empty_score(round.sets),
        finished: false
      )
    end
  end

  def self.count_games(round)
    result = 0
    if round.name == ROUND::STAGES[:CHAMPIONSHIP][:value]
      teams = round.tournament.teams
      teams_count = teams.count
      0.upto(teams_count - 1) do |i|
        (i + 1).upto(teams_count - 1) { result += 1 }
      end
    else
      result = ROUND::STAGES.find { |_key, stage| stage[:value] == round.name }.last[:games]
    end
    result
  end

  def self.set_teams_for_games(round)

    if round.name == ROUND::STAGES[:CHAMPIONSHIP][:value]

      teams = round.tournament.teams
      games = Game.where(round: round).to_a
      teams_count = teams.count
      0.upto(teams_count - 1) do |i|
        team1 = teams[i]
        (i + 1).upto(teams_count - 1) do |j|
          team2 = teams[j]
          games.shift.update_attributes(
            team1: team1,
            team2: team2
          )
        end
      end

    else

      if round.name == ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:value]
        # Currenr round
        games = round.games.to_a
        count_games = count_games(round)
        losers = losers(round.prev_round, count_games).shuffle

        0.upto count_games - 1 do |i|
          games[i].update_attributes(
            team1: losers[i],
            team2: losers[i + count_games]
          )
        end
        # Next round
        games = round.next_round.games.to_a
        count_games = count_games(round.next_round)
        winners = winners(round.prev_round).shuffle

        0.upto count_games - 1 do |i|
          games[i].update_attributes(
            team1: winners[i],
            team2: winners[i + count_games]
          )
        end
      else
        games = round.games.to_a
        count_games = count_games(round)
        winners = winners(round.prev_round).shuffle

        0.upto count_games - 1 do |i|
          games[i].update_attributes(
            team1: winners[i],
            team2: winners[i + count_games]
          )
        end
      end
    end
  end

  def self.set_game_for_team(round, team)
    games = Game.where('round_id = ? AND (team1_id IS NULL OR team2_id IS NULL)', round.id)
    if games.size > 0
      game = games[rand(games.size - 1)]
      if game.team1.nil?
        game.team1 = team
      elsif game.team2.nil?
        game.team2 = team
      end
      game.save
    end
  end

  def self.empty_score(sets)
    result = []
    1.upto(sets) do
      result << { team1: 0, team2: 0 }
    end
    result
  end

  def self.winners(round)
    result =
      if round.name == ROUND::STAGES[:CHAMPIONSHIP][:value]
        round
        .championship_table_data
        .map { |h| h[:team] }
      else
        Game.includes(:winner)
            .where('winner_id > 0 and round_id = ?', round.id)
            .select(:winner_id)
            .map(&:winner)
      end
    result.first(count_games(round.next_round)*2)
  end

  def self.losers(round, count_games)
    result =
      if round.name == ROUND::STAGES[:CHAMPIONSHIP][:value]
        []
      else
        Game.includes(:loser)
            .where('loser_id > 0 and round_id = ?', round.id)
            .select(:loser_id)
      end
    result.first(count_games(round.next_round)*2).map(&:loser)
  end
end
