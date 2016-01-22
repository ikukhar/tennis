class Round < ActiveRecord::Base
  belongs_to :tournament
  has_many :games, dependent: :destroy
  belongs_to :prev_round, class_name: 'Round'
  belongs_to :next_round, class_name: 'Round'

  validates_presence_of :tournament, :name, :sets
  validates_inclusion_of :finished, in: [true, false]

  def championship_table_data
    table = []
    games = self.games.select(&:finished)
    tournament.teams.each do |team|
      table << { team: team, games: 0, wins: 0, loses: 0, points: 0 }
    end

    calc_stat = proc do |stat_key, &block|
      games.group_by(&block)
      .map { |k, v| table.find { |row| row[:team] == k }[stat_key] += v.length }
    end

    calc_stat.call(:wins, &:winner)
    calc_stat.call(:games, &:team1)
    calc_stat.call(:games, &:team2)
    calc_stat.call(:loses) { |game| game.winner == game.team1 ? game.team2 : game.team1 }

    table.map { |row| row[:points] = 3 * row[:wins] }
    table.sort_by! { |row| row[:points] - row[:games] }.reverse!.sort_by! { |row| row[:team][:name] }
    table
  end
end
