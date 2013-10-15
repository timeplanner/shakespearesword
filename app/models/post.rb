class Post < ActiveRecord::Base
  attr_accessible :audio, :comment, :location, :latitude, :longitude ,:user_id, :video
  belongs_to :user
  validates :user_id, :location, presence: true
  validates :comment, presence: true, length: {maximum: 140}
  default_scope order: 'posts.created_at DESC'

  validates :latitude, :presence => {message: "Not a valid location on Google Maps, please check city field" }
  geocoded_by :location
  before_validation :geocode
  after_validation :geocode, :if => :location_changed?
end
