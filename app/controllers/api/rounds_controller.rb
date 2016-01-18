class Api::RoundsController < ApplicationController
  def index
    respond_with :api, Round.where(tournament_id: params[:tournament_id])
  end

  def new
    # code
  end

  def show
    round = Round.find(params[:id])
    if round
      respond_with :api, round
    else
      render_error 'Round not found'
    end
  end

  def championship_table_data
    table = []
    round = Round.find(params[:id])
    games = round.games.select(&:completed)
    round.tournament.teams.each do |team|
      table << { team: team, games: 0, wins: 0, loses: 0, points: 0 }
    end

    calc_stat = proc do |stat_key, &block|
      games.group_by(&block)
        .map { |k, v| table.find{ |row| row[:team] == k }[stat_key] += v.length }
    end

    calc_stat.call(:wins, &:winner)
    calc_stat.call(:games, &:team1)
    calc_stat.call(:games, &:team2)
    calc_stat.call(:loses) { |game| game.winner == game.team1 ? game.team2 : game.team1 }

    table.map{ |row| row[:points] = 3*row[:wins] }
    table.sort_by!{ |row| row[:points] }.reverse!

    render json: table
  end
end
