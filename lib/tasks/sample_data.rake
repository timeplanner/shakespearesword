namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    admin = User.create!(name: "Hospital User",
                         email: "hospital@test.com",
                         password: "hospitaltest",
                         password_confirmation: "hospitaltest")
    admin.toggle!(:admin)
    admin = User.create!(name: "1",
                         email: "1@1.com",
                         password: "123123",
                         password_confirmation: "123123")
    admin.toggle!(:admin)
    1.times do |n|
      name  = Faker::Name.name
      email = "example-#{n+1}@railstutorial.org"
      password  = "password"
      User.create!(name: name,
                   email: email,
                   password: password,
                   password_confirmation: password)
    end
    users = User.all(limit: 3)
    1.times do
      comment = Faker::Lorem.sentence(5)
      location = "wpi"
      users.each {
          |user| user.posts.create!(comment: comment,
                                    location:location ) }
    end
  end
end


