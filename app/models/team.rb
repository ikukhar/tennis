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
          name: player.fullName
        )
      end
    else tournament.teams_type == TOURNAMENT::TEAMS_TYPES::DOUBLES

      count_pl = players.count
      fail 'Count players must be even!' if count_pl%2 != 0
      stat = User.players_statistic
      new_players = players.delete_if{ |pl| pl.rating == 0 && stat[pl].games == 0 }
      puts 'New players:'
      puts new_players
      players.sort{ |pl1,pl2| pl2.rating <=> pl2.rating }

      new_players.each do |new_pl|
        from = (count_pl*0.6).to_i
        to = (count_pl*0.8).to_i
        players.insert(rand(from..to), new_pl)
      end
      puts 'Players'
      puts players
      # TODO: можно улучшить(увеличить кво частей) разбиение в зависимости от к-ва игроков
      middle = count_pl/2

      0.upto(middle-1) do |i|
        player1 = players.delete_at(rand(0..(middle-1-i)));
        player2 = players.delete_at(rand((middle-i)..(count_pl-i)));

        create!(
          tournament: tournament,
          player1: player1,
          player2: player2,
          name: player1.fullName + ' ' + player2.fullName
        )
      end


    end
  end
end
