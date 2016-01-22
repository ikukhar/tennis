class User < ActiveRecord::Base
  # attr_accessor :updating_password
  has_many :authorizations
  has_many :teams

  has_secure_password validations: false

  validates_presence_of :first_name, :last_name
  validates_uniqueness_of :email
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }

  # validates_presence_of :password, if: ->{ updating_password || new_record? }
  # validates_confirmation_of :password, if: ->{ updating_password || new_record? }

  before_save do
    full_name = '#{first_name} #{last_name}'
  end

  def self.players_statistic
    # TODO: Rating doubles / 2
    query = <<-SQL
    select
       vt.id
      ,vt.rating as rating
      ,sum(vt.wins_s) as wins_s
      ,sum(vt.loses_s) as loses_s
      ,sum(vt.wins_d) as wins_d
      ,sum(vt.loses_d) as loses_d
      ,sum(vt.wins_s) + sum(vt.loses_s) + sum(vt.wins_s)+ sum(vt.loses_d) as games
    from(
      select
         u.id as id
        ,u.full_name as name
        ,u.rating as rating
        ,case
          when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::SINGLES}' then 1
          else 0
         end as wins_s
        ,0 as loses_s
        ,case
          when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::DOUBLES}' then 1
          else 0
         end as wins_d
         ,0 as loses_d
      from
        tournaments as t
      left join
        rounds as r on r.tournament_id = t.id
      left join
        games as g on g.round_id = r.id
      inner join
        teams as tms on tms.id = g.winner_id
      left join
        users as u on u.id = tms.player1_id or u.id = tms.player2_id

      union all

      select
         u.id as id
        ,u.full_name as name
        ,u.rating as rating
        ,0 as wins_s
        ,case
          when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::SINGLES}' then 1
          else 0
         end as loses_s
        ,0 as wins_d
        ,case
          when t.teams_type = '#{TOURNAMENT::TEAMS_TYPES::DOUBLES}' then 1
          else 0
         end as loses_d
      from
        tournaments as t
      left join
        rounds as r on r.tournament_id = t.id
      left join
        games as g on g.round_id = r.id
      inner join
        teams as tms on tms.id = g.loser_id
      left join
        users as u on u.id = tms.player1_id or u.id = tms.player2_id
    ) as vt
    group by
      vt.id, vt.name, vt.rating
    order by
       vt.rating desc
      ,vt.wins_s desc
      ,vt.wins_d desc
      ,vt.loses_s desc
      ,vt.loses_d desc
      ,vt.name
    SQL

    result = connection.execute(query)
    result.map(&:deep_symbolize_keys!)
    puts result
    players = User.find(result.map{ |row| row[:id]})
    result.each do |row|
      row[:player] = players.select { |pl| pl[:id] == row[:id] }.first
    end

    result

  end
end
