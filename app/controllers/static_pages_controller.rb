class StaticPagesController < ApplicationController
  def home
    @post = current_user.posts.build if signed_in?
    @city = request.location.city


    @posts = Post.all
    postPoints={}
    @posts.each do |post|
      # transfer location to ll
      target = Geocoder.search(post.location)

      if (target[0].latitude > 0 )
        northSouth = "N"
      else
        northSouth = "S"
      end

      if (target[0].longitude > 0 )
        eastWest = "E"
      else
        eastWest = "W"
      end
      ll = target[0].latitude.to_s() + " " + northSouth + " " + target[0].longitude.to_s()  + " " + eastWest
      # parse video:check if not empty, then add https:
      youtubeVideo=""
      if post.video.empty?
      else
        youtubeVideo = "\<embed width='200' height='200' src='https:#{post.video}?autoplay=1' hidden='false' autoplay='ture'></embed>"
      end
      # parse audio
      audio=""
      if post.audio.empty?
      else
        audio = "\<audio controls='' autoplay='' style='display:none'><source src='#{post.audio}' type='audio/mpeg'></audio>"
      end
      postPoints["#{post.location}"]={"ll"=> ll ,
                                      "country"=> "" ,
                                      "audio"=> audio ,
                                      "name"=> post.user.name ,
                                      "video"=> youtubeVideo ,
                                      "comment"=> post.comment,
                                      "like"=> "" ,
                                      "dislike"=> ""  }


    end

    gon.postPoints = postPoints

  end

  def help
  end

  def about
  end

  def about
  end


end
