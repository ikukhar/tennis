class Tournament < ActiveRecord::Base
  cattr_reader :types
  cattr_reader :statuses

  @@types = [ :singles, :couples ]
  @@statuses = [ :finished, :started , :not_started ]
end
