class Tournament < ActiveRecord::Base
  has_many :rounds, dependent: :destroy
  has_many :teams, dependent: :destroy
  has_many :games
  belongs_to :winner, class_name: 'Team'

  validates_presence_of :name, :status, :teams_type, :rounds_type
  validates_inclusion_of :finished, in: [true, false]

  def self.calculate_players_rating!
    query = <<-SQL
    update users
    set rating =
      (select
         sum(vt.coeff)
      from(
        select
          case
            when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::SINGLES}' then
              case
                when r.name = '#{ROUND::STAGES[:CHAMPIONSHIP][:value]}' then #{ROUND::STAGES[:CHAMPIONSHIP][:win_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x16][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x16][:win_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x8][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x8][:win_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x4][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x4][:win_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x2][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x2][:win_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:win_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FINAL][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FINAL][:win_coeff]}
                else 0
              end
            when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::DOUBLES}' then
              case
                when r.name = '#{ROUND::STAGES[:CHAMPIONSHIP][:value]}' then #{ROUND::STAGES[:CHAMPIONSHIP][:win_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x16][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x16][:win_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x8][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x8][:win_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x4][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x4][:win_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x2][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x2][:win_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:win_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FINAL][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FINAL][:win_coeff]}/2
                else 0
              end
            else 0
           end as coeff
        from
          tournaments as t
        left join
          rounds as r on r.tournament_id = t.id
        left join
          games as g on g.round_id = r.id
        inner join
          teams as tms on tms.id = g.winner_id
        inner join
          users as u on u.id = tms.player1_id or u.id = tms.player2_id
        where
          t.finished = "t"
          and u.id = users.id

        union all

        select
          case
            when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::SINGLES}' then
              case
                when r.name = '#{ROUND::STAGES[:CHAMPIONSHIP][:value]}' then #{ROUND::STAGES[:CHAMPIONSHIP][:lose_coeff]}
                when r.name = '#{ROUND::STAGES[:CHAMPIONSHIP][:value]}' then #{ROUND::STAGES[:CHAMPIONSHIP][:lose_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x16][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x16][:lose_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x8][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x8][:lose_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x4][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x4][:lose_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x2][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x2][:lose_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:lose_coeff]}
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FINAL][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FINAL][:lose_coeff]}
                else 0
              end
            when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::DOUBLES}'  then
              case
                when r.name = '#{ROUND::STAGES[:CHAMPIONSHIP][:value]}' then #{ROUND::STAGES[:CHAMPIONSHIP][:lose_coeff]}/2
                when r.name = '#{ROUND::STAGES[:CHAMPIONSHIP][:value]}' then #{ROUND::STAGES[:CHAMPIONSHIP][:lose_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x16][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x16][:lose_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x8][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x8][:lose_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x4][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x4][:lose_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_1x2][:value]}' then #{ROUND::STAGES[:PLAY_OFF_1x2][:lose_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FOR_3_PLACE][:lose_coeff]}/2
                when r.name = '#{ROUND::STAGES[:PLAY_OFF_FINAL][:value]}' then #{ROUND::STAGES[:PLAY_OFF_FINAL][:lose_coeff]}/2
                else 0
               end
            else 0
           end as coeff
        from
          tournaments as t
        left join
          rounds as r on r.tournament_id = t.id
        left join
          games as g on g.round_id = r.id
        inner join
          teams as tms on tms.id = g.loser_id
        inner join
          users as u on u.id = tms.player1_id or u.id = tms.player2_id
        where
          t.finished = "t"
          and u.id = users.id

      ) as vt
    )
    SQL

    connection.execute(query)
  end

  def self.create_tournament(params)
    tournament = nil
    begin
      transaction do
        # Tournament
        tournament = create!(
          name:        params[:tournament][:name],
          teams_type:  params[:tournament][:teams_type],
          rounds_type: params[:tournament][:rounds_type],
          finished:    false,
          status:      TOURNAMENT::STATUSES::UPCOMING
        )

        # Rounds
        rounds = []
        params[:rounds].each do |params_round|
          rounds << tournament.rounds.create!(
            sets:   params_round[:sets],
            name:  params_round[:name],
            finished: false
          )
        end

        prev_round = nil
        rounds.each do |round|
          round.update_attributes(prev_round: prev_round)
          prev_round = round
        end

        next_round = nil
        rounds.reverse_each do |round|
          round.update_attributes(next_round: next_round)
          next_round = round
        end

        # Teams
        players = User.find(params[:players].map { |h| h[:id] })
        Team.create_teams(tournament, players)

        # Games

        rounds.each do |round|
          Game.create_games(round)
        end

        Game.set_teams_for_games(rounds[0])
      end
    rescue Exception => e
      puts "ERROR: #{e}"
      tournament = Tournament.new
      tournament.errors[:tournament] << e
    end

    tournament
  end
end
