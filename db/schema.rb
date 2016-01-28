# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160126104721) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authorizations", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "authorizations", ["user_id"], name: "index_authorizations_on_user_id", using: :btree

  create_table "games", force: :cascade do |t|
    t.integer  "round_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "team1_id"
    t.integer  "team2_id"
    t.string   "score"
    t.integer  "winner_id"
    t.boolean  "finished"
    t.integer  "tournament_id"
    t.integer  "loser_id"
  end

  add_index "games", ["round_id"], name: "index_games_on_round_id", using: :btree
  add_index "games", ["team1_id"], name: "index_games_on_team1_id", using: :btree
  add_index "games", ["team2_id"], name: "index_games_on_team2_id", using: :btree

  create_table "rounds", force: :cascade do |t|
    t.integer  "tournament_id"
    t.string   "name"
    t.integer  "sets"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "order"
    t.boolean  "finished"
    t.integer  "prev_round_id"
    t.integer  "next_round_id"
  end

  add_index "rounds", ["tournament_id"], name: "index_rounds_on_tournament_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.integer  "tournament_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "player1_id"
    t.integer  "player2_id"
    t.string   "name"
  end

  add_index "teams", ["player1_id"], name: "index_teams_on_player1_id", using: :btree
  add_index "teams", ["player2_id"], name: "index_teams_on_player2_id", using: :btree
  add_index "teams", ["tournament_id"], name: "index_teams_on_tournament_id", using: :btree

  create_table "tournaments", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "teams_type"
    t.string   "status"
    t.string   "rounds_type"
    t.boolean  "finished"
    t.integer  "winner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "full_name"
    t.integer  "rating"
    t.boolean  "admin"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "games", "rounds"
end
