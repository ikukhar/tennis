class Tournament < ActiveRecord::Base
  has_many :rounds, dependent: :destroy
  has_many :teams, dependent: :destroy

  def self.create_tournament(params)
    transaction do
      tournament = create!(
        name:        params[:tournament][:name],
        teams_type:  params[:tournament][:teams_type],
        rounds_type: params[:tournament][:rounds_type],
        status:      TOURNAMENT::STATUSES::NOT_STARTED
      )

      rounds = []
      params[:rounds].each do |params_round|
        rounds << tournament.rounds.create!(
          sets:   params_round[:sets],
          stage:  params_round[:stage][:value],
          status: ROUND::STATUSES::NOT_STARTED,
          order:  params_round[:order]
        )
      end

      teams = {}
      params[:teams].each do |params_team|
        team = tournament.teams.create!(
          player1_id: params_team[:player1][:id],
          player2_id: params_team[:player2] ? params_team[:player2][:id] : nil
        )
        teams[params_team] = team
      end

      params[:games].each do |params_game|
        puts '~~~~~~~~~~~~~~~~~~~~~~~~'
        puts params_game[:score].class
        rounds[0].games.create!(
          team1: teams[params_game[:team1]],
          team2: teams[params_game[:team2]],
          score: params_game[:score]
        )
      end
    end
  end
end
