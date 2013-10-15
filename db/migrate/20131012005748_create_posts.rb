class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :location
      t.float :latitude
      t.float :longitude
      t.string :audio
      t.string :video
      t.string :comment
      t.integer :user_id

      t.timestamps
    end
  end
end
