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
    99.times do |n|
      name  = Faker::Name.name
      email = "example-#{n+1}@railstutorial.org"
      password  = "password"
      User.create!(name: name,
                   email: email,
                   password: password,
                   password_confirmation: password)
    end
  end
end