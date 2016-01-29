class Team < ActiveRecord::Base
  belongs_to :tournament
  belongs_to :player1, class_name: 'User'
  belongs_to :player2, class_name: 'User'

  validates_presence_of :tournament, :name, :player1

  def self.create_teams(tournament, players)

    if tournament.teams_type == TOURNAMENT::TEAMS_TYPES::SINGLES

      players.each do |player|
        create!(
          tournament: tournament,
          player1: player,
          name: player.full_name
        )
      end

    else tournament.teams_type == TOURNAMENT::TEAMS_TYPES::DOUBLES

      count_pl = players.count
      fail 'Count players must be even!' if count_pl%2 != 0
      stat = User.players_statistic

      new_players = players.dup - (players.delete_if do |pl|
        if h = stat.find { |row| row[:player] == pl }
          h[:games] == 0
        else
          true
        end
      end)

      players.sort!{ |pl1,pl2| pl2.rating <=> pl1.rating }

      count_without_new = players.count
      new_players.each do |new_pl|
        from = (count_without_new*0.6).to_i
        to = (count_without_new*0.8).to_i
        p rand(from..to)
        p new_pl
        players.insert(rand(from..to), new_pl)
      end

      # Можно улучшить(увеличить кво частей) разбиение в зависимости от к-ва игроков
      middle = count_pl/2

      0.upto(middle-1) do |i|

        puts "Team #{i}"
        from = 0
        to = middle-1-i
        idx1 = rand(from..to)
        puts from
        puts to
        puts "res:#{idx1}"

        puts '-------------------'
        from =  middle-i
        to = players.count-1
        idx2 = rand(from..to)
        puts from
        puts to
        puts "res:#{idx2}"

        puts "COUNT: #{players.count}"
        player1 = players.delete_at(idx1);
        player2 = players.delete_at(idx2-1);
        puts player1
        puts player2

        create!(
          tournament: tournament,
          player1: player1,
          player2: player2,
          name: player1.full_name + ' + ' + player2.full_name
        )
      end

    end
  end
end
