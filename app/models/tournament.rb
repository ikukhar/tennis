class Tournament < ActiveRecord::Base
  has_many :rounds, dependent: :destroy
  has_many :players, dependent: :destroy
  has_many :teams, dependent: :destroy

  def self.create_tournament(params)
    transaction do
      tournament = create!(
        name: params[:tournament][:name],
        mode: params[:tournament][:mode],
        status: params[:tournament][:status]
      )

      rounds = []
      params[:rounds].each do |params_round|
        rounds << tournament.rounds.create!(
          match_sets: params_round[:match_sets],
          mode: params_round[:mode]
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
        rounds[0].games.create!(
          team1: teams[params_game[:team1]],
          team2: teams[params_game[:team2]]
        )
      end
    end
  end
end
